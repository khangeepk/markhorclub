import { db } from '../db'
import { crmClient } from '../crm/client'

export async function syncInquiryToCrm(inquiryId: string): Promise<{ success: boolean; contactId?: string; opportunityId?: string; error?: string }> {
  try {
    const inquiry = await db.membershipInquiry.findUnique({ where: { id: inquiryId } })
    if (!inquiry) return { success: false, error: 'Inquiry record not found' }

    // Mark processing
    await db.membershipInquiry.update({
      where: { id: inquiryId },
      data: { crmSyncStatus: 'processing' },
    })

    if (!crmClient.isConfigured()) {
      await db.membershipInquiry.update({
        where: { id: inquiryId },
        data: { crmSyncStatus: 'pending', crmSyncError: 'CRM credentials unconfigured' },
      })
      return { success: false, error: 'CRM credentials unconfigured' }
    }

    // 1. Contact Deduplication & Upsert
    const nameParts = inquiry.fullName.split(' ')
    const firstName = nameParts[0] || inquiry.fullName
    const lastName = nameParts.slice(1).join(' ') || ''

    const contactResult = await crmClient.upsertContact({
      firstName,
      lastName,
      name: inquiry.fullName,
      email: inquiry.email,
      phone: inquiry.phone,
      tags: ['markhor-membership-inquiry'],
    })

    const contactId = contactResult.contactId

    // 2. Opportunity Creation in MARKHOR MEMBERSHIP pipeline
    let opportunityId: string | undefined = undefined
    try {
      const pipelines = await crmClient.getPipelines()
      const markhorPipeline = pipelines.find((p: any) =>
        p.name?.toLowerCase().includes('markhor') || p.name?.toLowerCase().includes('membership')
      ) || pipelines[0]

      if (markhorPipeline) {
        const stage = markhorPipeline.stages?.find((s: any) =>
          s.name?.toLowerCase().includes('inquiry') || s.name?.toLowerCase().includes('01')
        ) || markhorPipeline.stages?.[0]

        if (stage) {
          const opResult = await crmClient.upsertOpportunity({
            pipelineId: markhorPipeline.id,
            stageId: stage.id,
            name: `Membership Inquiry — ${inquiry.fullName} (${inquiry.referenceNumber})`,
            contactId: contactId,
            monetaryValue: inquiry.membershipFeeSnapshotPkr || 500000,
            status: 'open',
          })
          opportunityId = opResult.opportunityId
        }
      }
    } catch (opErr: any) {
      console.warn('CRM Opportunity creation warning (contact saved):', opErr?.message)
    }

    // Update local database record
    await db.membershipInquiry.update({
      where: { id: inquiryId },
      data: {
        crmContactId: contactId,
        crmOpportunityId: opportunityId || null,
        crmSyncStatus: 'synced',
        crmSyncError: null,
      },
    })

    // Record audit log
    await db.auditLog.create({
      data: {
        actorUsername: 'system',
        action: 'crm_sync_success',
        entityType: 'MembershipInquiry',
        entityId: inquiryId,
        details: JSON.stringify({ contactId, opportunityId }),
      },
    })

    return { success: true, contactId, opportunityId }
  } catch (err: any) {
    const errorMessage = err?.message || 'CRM sync failed'
    console.error(`CRM Sync error for inquiry ${inquiryId}:`, errorMessage)

    await db.membershipInquiry.update({
      where: { id: inquiryId },
      data: {
        crmSyncStatus: 'failed',
        crmSyncError: errorMessage,
      },
    }).catch(() => {})

    // Create sync job for automatic background retries
    await db.crmSyncJob.create({
      data: {
        entityType: 'inquiry',
        entityId: inquiryId,
        eventName: 'membership_inquiry_submitted',
        payload: JSON.stringify({ inquiryId }),
        status: 'failed',
        lastError: errorMessage,
        retryCount: 0,
      },
    }).catch(() => {})

    return { success: false, error: errorMessage }
  }
}
