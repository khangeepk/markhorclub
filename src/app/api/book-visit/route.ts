import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { syncVisitBookingToCrm } from '@/lib/services/visit-sync'
import { sendInquiryNotifications } from '@/lib/services/notifications'
import { generateReference } from '@/lib/utils/reference-generator'

// In-memory rate limiting map (5 requests per 10 mins per IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1'
    const now = Date.now()
    const rateLimit = rateLimitMap.get(ip)

    if (rateLimit && now < rateLimit.resetAt) {
      if (rateLimit.count >= 5) {
        return NextResponse.json(
          { success: false, error: 'Too many booking requests. Please try again shortly.' },
          { status: 429 }
        )
      }
      rateLimit.count += 1
    } else {
      rateLimitMap.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 })
    }

    const body = await request.json()
    const { fullName, email, phone, preferredDate, preferredTime, numberOfGuests, specialRequests } = body

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid full name.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    const cleanPhone = phone ? String(phone).replace(/[^0-9+]/g, '') : ''
    if (!cleanPhone || cleanPhone.length < 7) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid contact phone number.' },
        { status: 400 }
      )
    }

    const sanitizedName = fullName.trim().substring(0, 100)
    const sanitizedEmail = email.trim().toLowerCase().substring(0, 100)
    const referenceNumber = generateReference('VST')

    // 1. Save locally in Database
    let localVisit
    try {
      localVisit = await db.visitBooking.create({
        data: {
          referenceNumber,
          fullName: sanitizedName,
          email: sanitizedEmail,
          phone: cleanPhone,
          preferredDate: preferredDate || null,
          preferredTime: preferredTime || null,
          numberOfGuests: typeof numberOfGuests === 'number' ? numberOfGuests : 1,
          specialRequests: specialRequests ? String(specialRequests).trim().substring(0, 500) : null,
          status: 'REQUESTED',
          crmSyncStatus: 'pending',
        },
      })
    } catch (dbErr: any) {
      console.error('Failed to save visit booking locally:', dbErr)
      return NextResponse.json(
        { success: false, error: 'Unable to save your site visit booking. Please try again or call us directly.' },
        { status: 500 }
      )
    }

    // 2. GuaranteedCRM Sync (Non-blocking: upsert contact, opp in '04 Visit Scheduled', appt in calendar)
    const crmResult = await syncVisitBookingToCrm(localVisit.id).catch((err) => ({
      success: false,
      error: err?.message,
    }))

    // 3. Admin Alert Notifications
    await sendInquiryNotifications({
      reference: referenceNumber,
      fullName: sanitizedName,
      email: sanitizedEmail,
      phone: cleanPhone,
      preferredContact: 'Phone',
      interestCategory: 'VIP Site Visit Request',
      message: `Preferred Date: ${preferredDate || 'Flexible'} | Time: ${preferredTime || 'Anytime'} | Guests: ${numberOfGuests || 1} | Notes: ${specialRequests || 'None'}`,
    }).catch(() => {})

    return NextResponse.json({
      success: true,
      referenceNumber,
      message: 'Your VIP site visit request has been received. Our concierge team will contact you to confirm details.',
      crmSync: crmResult.success ? 'synced' : 'pending',
      appointmentId: 'appointmentId' in crmResult ? crmResult.appointmentId || null : null,
    })
  } catch (error: any) {
    console.error('Book visit API error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to process visit request. Please contact us directly at UAN 0995-111-222-333.' },
      { status: 500 }
    )
  }
}
