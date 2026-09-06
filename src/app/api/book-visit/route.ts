import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { crmClient } from '@/lib/crm/client'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, email, phone, visitDate, preferredTime, numberOfGuests, notes } = body

    if (!fullName || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Please provide name, email, and contact number.' },
        { status: 400 }
      )
    }

    const referenceNumber = `VST-2026-${Math.floor(1000 + Math.random() * 9000)}`
    const visitDetails = `Requested Visit Date: ${visitDate || 'TBD'}, Time: ${preferredTime || 'Morning'}, Guests: ${numberOfGuests || 1}. Notes: ${notes || 'None'}`

    // 1. Save locally
    const inquiry = await db.membershipInquiry.create({
      data: {
        referenceNumber,
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: String(phone).trim(),
        preferredContactMethod: 'Phone',
        membershipCategory: 'Estate Visit Booking',
        message: visitDetails,
        status: 'visit_scheduled',
        crmSyncStatus: 'pending',
      },
    })

    // 2. GuaranteedCRM Sync & Stage update
    let crmContactId: string | null = null
    let crmOpportunityId: string | null = null

    if (crmClient.isConfigured()) {
      try {
        const nameParts = fullName.trim().split(' ')
        const contactRes = await crmClient.upsertContact({
          firstName: nameParts[0] || fullName,
          lastName: nameParts.slice(1).join(' ') || '',
          email: email.trim(),
          phone: String(phone).trim(),
          tags: ['markhor-visit-booking', 'markhor-qualified-lead'],
        })
        crmContactId = contactRes.contactId

        // Opportunity in Visit Scheduled stage
        const pipelines = await crmClient.getPipelines()
        const markhorPipeline = pipelines.find((p: any) =>
          p.name?.toLowerCase().includes('markhor') || p.name?.toLowerCase().includes('membership')
        ) || pipelines[0]

        if (markhorPipeline) {
          const visitStage = markhorPipeline.stages?.find((s: any) =>
            s.name?.toLowerCase().includes('visit') || s.name?.toLowerCase().includes('04')
          ) || markhorPipeline.stages?.[0]

          if (visitStage) {
            const opRes = await crmClient.upsertOpportunity({
              pipelineId: markhorPipeline.id,
              stageId: visitStage.id,
              name: `Visit Booking — ${fullName.trim()} (${referenceNumber})`,
              contactId: crmContactId,
              monetaryValue: 500000,
              status: 'open',
            })
            crmOpportunityId = opRes.opportunityId
          }
        }

        await db.membershipInquiry.update({
          where: { id: inquiry.id },
          data: { crmContactId, crmOpportunityId, crmSyncStatus: 'synced' },
        })
      } catch (crmErr: any) {
        console.warn('Book A Visit CRM sync warning:', crmErr?.message)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your site visit request has been received. Our team will contact you to confirm your schedule.',
      referenceNumber,
      crmSync: crmContactId ? 'synced' : 'pending',
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to submit visit request.' },
      { status: 500 }
    )
  }
}
