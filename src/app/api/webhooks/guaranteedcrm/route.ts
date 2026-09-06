import { NextResponse } from 'next/server'
import crypto from 'crypto'
import { db } from '@/lib/db'
import { mapStatusToStageName } from '@/lib/crm/pipelines'

export async function POST(request: Request) {
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('x-gohighlevel-signature') || request.headers.get('x-crm-signature')
    const secret = process.env.GUARANTEEDCRM_WEBHOOK_SECRET

    // 1. Signature Verification if secret is configured
    if (secret && signature) {
      const computedHmac = crypto.createHmac('sha256', secret).update(rawBody).digest('hex')
      if (computedHmac !== signature) {
        return NextResponse.json({ success: false, error: 'Invalid webhook signature' }, { status: 401 })
      }
    }

    let payload: any = {}
    try {
      payload = JSON.parse(rawBody)
    } catch {
      return NextResponse.json({ success: false, error: 'Invalid JSON payload' }, { status: 400 })
    }

    const type = payload.type || payload.event || payload.eventType || 'unknown'

    // 2. Handle Opportunity Stage Updates from CRM
    if (type.includes('Opportunity') || type.includes('opportunity')) {
      const opportunityId = payload.id || payload.opportunityId || payload.opportunity?.id
      const stageName = payload.stageName || payload.pipelineStageName || payload.opportunity?.stageName

      if (opportunityId && stageName) {
        // Find matching inquiry or member by crmOpportunityId
        const inquiry = await db.membershipInquiry.findFirst({ where: { crmOpportunityId: opportunityId } })
        if (inquiry) {
          let newLocalStatus = inquiry.status
          const norm = stageName.toLowerCase()
          if (norm.includes('01') || norm.includes('inquiry')) newLocalStatus = 'new'
          else if (norm.includes('02') || norm.includes('contacted')) newLocalStatus = 'contacted'
          else if (norm.includes('03') || norm.includes('qualified')) newLocalStatus = 'qualified'
          else if (norm.includes('04') || norm.includes('visit')) newLocalStatus = 'visit_scheduled'
          else if (norm.includes('05') || norm.includes('application')) newLocalStatus = 'application_submitted'
          else if (norm.includes('06') || norm.includes('payment')) newLocalStatus = 'payment_pending'
          else if (norm.includes('07') || norm.includes('member')) newLocalStatus = 'converted'
          else if (norm.includes('08') || norm.includes('closed') || norm.includes('lost')) newLocalStatus = 'closed'

          await db.membershipInquiry.update({
            where: { id: inquiry.id },
            data: { status: newLocalStatus },
          })
        }
      }
    }

    // 3. Log Audit Record
    await db.auditLog.create({
      data: {
        actorUsername: 'guaranteedcrm_webhook',
        action: `webhook_${type}`,
        entityType: 'WebhookPayload',
        details: JSON.stringify({ type, id: payload.id || payload.contactId || payload.opportunityId }),
      },
    }).catch(() => {})

    return NextResponse.json({ success: true, received: true, type })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Webhook error' }, { status: 500 })
  }
}
