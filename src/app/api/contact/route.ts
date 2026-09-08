import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { crmClient } from '@/lib/crm/client'
import { generateReference } from '@/lib/utils/reference-generator'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, email, phone, subject, message } = body

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Please provide full name, email, and phone number.' },
        { status: 400 }
      )
    }

    const referenceNumber = generateReference('CNT')

    // 1. Save locally
    const inquiry = await db.membershipInquiry.create({
      data: {
        referenceNumber,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: String(phone).trim(),
        preferredContactMethod: 'Email',
        membershipCategory: 'General Contact',
        message: `[Subject: ${subject || 'General Inquiry'}] ${message || ''}`.trim(),
        status: 'new',
        crmSyncStatus: 'pending',
      },
    })

    // 2. Sync CRM
    if (crmClient.isConfigured()) {
      try {
        const nameParts = fullName.trim().split(' ')
        const res = await crmClient.upsertContact({
          firstName: nameParts[0] || fullName,
          lastName: nameParts.slice(1).join(' ') || '',
          email: email.trim(),
          phone: String(phone).trim(),
          tags: ['markhor-general-contact'],
        })

        await db.membershipInquiry.update({
          where: { id: inquiry.id },
          data: { crmContactId: res.contactId, crmSyncStatus: 'synced' },
        })
      } catch (crmErr: any) {
        console.warn('CRM Contact sync warning:', crmErr?.message)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out. We have received your message and will respond promptly.',
      referenceNumber,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to submit contact form.' },
      { status: 500 }
    )
  }
}
