import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const user = await verifyAdminSession()

    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { testType, recipientPhone, recipientEmail } = await request.json()

    if (!testType) {
      return NextResponse.json({ success: false, error: 'Test type is required.' }, { status: 400 })
    }

    const targetPhone = recipientPhone || '+923000000000'
    const targetEmail = recipientEmail || 'info@markhourgroup.com'

    let templateName = 'ADMIN_ALERT'
    let content = 'Test alert'

    if (testType === 'whatsapp_inbound') {
      templateName = 'WHATSAPP_INBOUND_ALERT'
      content = `[WhatsApp Test Alert] Inbound WhatsApp message received from ${targetPhone}: "Inquiry regarding VIP Villa membership."`
    } else if (testType === 'chat_inbound') {
      templateName = 'WEBCHAT_INBOUND_ALERT'
      content = `[Web Chat Test Alert] Live CSR chat request initiated from website visitor: "Requesting site visit availability."`
    } else if (testType === 'membership_inquiry') {
      templateName = 'INQUIRY_ALERT'
      content = `[Inquiry Alert] New membership inquiry submitted by Test Applicant (${targetEmail}). Reference: INQ-2026-TEST.`
    } else if (testType === 'payment_submission') {
      templateName = 'PAYMENT_SUBMISSION_ALERT'
      content = `[Payment Submission Alert] Payment proof submitted by Applicant (${targetPhone}). TID: TID-8849102. Amount: PKR 500,000.`
    } else if (testType === 'payment_verified') {
      templateName = 'PAYMENT_VERIFIED_CONFIRMATION'
      content = `[Payment Confirmation] Payment verified by ${user.username}. Receipt: RCP-2026-TEST. Verified Amount: PKR 500,000.`
    }

    // Log notification record
    const log = await db.notificationLog.create({
      data: {
        recipientPhone: targetPhone,
        recipientEmail: targetEmail,
        channel: testType.includes('whatsapp') ? 'whatsapp' : 'email',
        templateName,
        messageContent: content,
        status: testType.includes('whatsapp') ? 'pending_external_activation' : 'sent',
        sentAt: new Date(),
      },
    })

    // Audit action
    await db.auditLog.create({
      data: {
        actorUsername: user.username,
        action: 'notification_test_executed',
        entityType: 'NotificationLog',
        entityId: log.id,
        details: JSON.stringify({ testType, targetPhone, targetEmail }),
      },
    })

    return NextResponse.json({
      success: true,
      message: `Test notification (${testType}) executed successfully.`,
      logId: log.id,
      status: log.status,
    })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Server error' }, { status: 500 })
  }
}
