import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { MEMBERSHIP_CONFIG } from '@/config/membership'
import { syncInquiryToCrm } from '@/lib/services/crm-sync'
import { sendInquiryNotifications } from '@/lib/services/notifications'

// In-memory rate limiting map for basic protection (5 requests per 10 mins per IP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

export async function POST(request: Request) {
  try {
    // Basic Rate Limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1'
    const now = Date.now()
    const rateLimit = rateLimitMap.get(ip)

    if (rateLimit && now < rateLimit.resetAt) {
      if (rateLimit.count >= 5) {
        return NextResponse.json(
          { success: false, error: 'Too many requests. Please try again in a few minutes.' },
          { status: 429 }
        )
      }
      rateLimit.count += 1
    } else {
      rateLimitMap.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 })
    }

    const body = await request.json()
    const { fullName, email, phone, preferredContact, interestCategory, message, consent, honeypot } = body

    // 1. Honeypot anti-spam check
    if (honeypot) {
      return NextResponse.json(
        { success: false, error: 'Bot submission detected.' },
        { status: 400 }
      )
    }

    // 2. Server-side Validation & Sanitization
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

    if (!consent) {
      return NextResponse.json(
        { success: false, error: 'Consent is required to submit a membership enquiry.' },
        { status: 400 }
      )
    }

    const sanitizedName = fullName.trim().substring(0, 100)
    const sanitizedEmail = email.trim().toLowerCase().substring(0, 100)
    const sanitizedMessage = message ? String(message).trim().substring(0, 1000) : ''
    const sanitizedCategory = interestCategory ? String(interestCategory).substring(0, 80) : 'Individual Membership'

    // 3. Save locally FIRST in Database
    const referenceNumber = `INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`

    let localRecord
    try {
      localRecord = await db.membershipInquiry.create({
        data: {
          referenceNumber,
          fullName: sanitizedName,
          email: sanitizedEmail,
          phone: cleanPhone,
          preferredContactMethod: preferredContact || 'Phone',
          membershipCategory: sanitizedCategory,
          message: sanitizedMessage,
          status: 'new',
          membershipFeeSnapshotPkr: MEMBERSHIP_CONFIG.feePkr,
          crmSyncStatus: 'pending',
        },
      })
    } catch (dbErr) {
      console.error('Failed to write inquiry to local DB:', dbErr)
      return NextResponse.json(
        {
          success: false,
          error: 'Unable to save your enquiry to our system database. Please try again or call us at ' + MEMBERSHIP_CONFIG.uanPhone,
        },
        { status: 500 }
      )
    }

    // 4. GuaranteedCRM Sync (Non-blocking: failure will never lose local inquiry)
    const crmResult = await syncInquiryToCrm(localRecord.id).catch((err) => ({
      success: false,
      error: err?.message,
    }))

    // 5. Admin Alert Notifications
    await sendInquiryNotifications({
      reference: referenceNumber,
      fullName: sanitizedName,
      email: sanitizedEmail,
      phone: cleanPhone,
      preferredContact: preferredContact || 'Phone',
      interestCategory: sanitizedCategory,
      message: sanitizedMessage,
    }).catch(() => {})

    return NextResponse.json({
      success: true,
      message: 'Thank you for your interest. Your membership application inquiry has been received.',
      referenceNumber: referenceNumber,
      crmSync: crmResult.success ? 'synced' : 'pending',
    })
  } catch (error: any) {
    console.error('Membership enquiry API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'We could not submit your enquiry right now. Please contact us directly at ' + MEMBERSHIP_CONFIG.uanPhone,
      },
      { status: 500 }
    )
  }
}
