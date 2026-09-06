import { db } from '../db'

export interface NotifyInquiryInput {
  reference: string
  fullName: string
  email: string
  phone: string
  preferredContact: string
  interestCategory: string
  message?: string
}

export async function sendInquiryNotifications(input: NotifyInquiryInput) {
  const adminEmail = process.env.ADMIN_ALERT_EMAIL || 'info@markhourgroup.com'
  const adminWhatsApp = process.env.ADMIN_ALERT_WHATSAPP_E164 || '+923305230888'
  const emailFrom = process.env.EMAIL_FROM || 'info@markhourgroup.com'
  const resendApiKey = process.env.RESEND_API_KEY

  const emailSubject = `New Markhor Club Membership Inquiry — ${input.reference}`
  const emailBody = `
New Markhor Club Membership Inquiry Received!

Reference: ${input.reference}
Date/Time: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Karachi' })} (PKT)

Applicant Details:
- Name: ${input.fullName}
- Phone: ${input.phone}
- Email: ${input.email}
- Preferred Contact: ${input.preferredContact}
- Interest: ${input.interestCategory}
- Message: ${input.message || 'None provided'}

Admin Portal Link: http://localhost:3000/admin/inquiries
`

  // 1. Log Email Notification Intent
  let emailStatus = 'queued'
  let emailFailureReason: string | null = null

  if (resendApiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: emailFrom,
          to: adminEmail,
          subject: emailSubject,
          text: emailBody,
        }),
      })
      if (res.ok) {
        emailStatus = 'sent'
      } else {
        const errJson = await res.json()
        emailStatus = 'failed'
        emailFailureReason = errJson?.message || `HTTP ${res.status}`
      }
    } catch (err: any) {
      emailStatus = 'failed'
      emailFailureReason = err?.message || 'Email delivery failed'
    }
  } else {
    emailStatus = 'queued'
    emailFailureReason = 'RESEND_API_KEY is not configured in .env.local'
  }

  await db.notificationLog.create({
    data: {
      recipientEmail: adminEmail,
      channel: 'email',
      templateName: 'New Inquiry Admin Alert',
      messageContent: emailBody,
      status: emailStatus,
      failureReason: emailFailureReason,
      sentAt: emailStatus === 'sent' ? new Date() : null,
    },
  }).catch(() => {})

  // 2. Log WhatsApp Notification Intent
  // GuaranteedCRM WhatsApp requires paid provider activation. If inactive, set status to PENDING_EXTERNAL_ACTIVATION
  await db.notificationLog.create({
    data: {
      recipientPhone: adminWhatsApp,
      channel: 'whatsapp',
      templateName: 'New Inquiry WhatsApp Alert',
      messageContent: `Markhor Alert: New inquiry ${input.reference} from ${input.fullName} (${input.phone}).`,
      status: 'pending_external_activation',
      failureReason: 'WhatsApp provider requires manual activation in GuaranteedCRM',
    },
  }).catch(() => {})

  return {
    emailStatus,
    whatsAppStatus: 'PENDING_EXTERNAL_ACTIVATION',
  }
}
