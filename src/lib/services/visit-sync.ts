import { db } from '../db'
import { crmClient } from '../crm/client'
import { getStageIdForStatus } from '../crm/pipelines'

export const MARKHOR_VISIT_CALENDAR_ID = process.env.GUARANTEEDCRM_VISIT_CALENDAR_ID || 'LvM2wUmbJmu7yJ3FQ96g'

export async function syncVisitBookingToCrm(visitBookingId: string): Promise<{
  success: boolean
  contactId?: string
  opportunityId?: string
  appointmentId?: string
  error?: string
}> {
  try {
    const booking = await db.visitBooking.findUnique({ where: { id: visitBookingId } })
    if (!booking) return { success: false, error: 'Visit booking record not found' }

    await db.visitBooking.update({
      where: { id: visitBookingId },
      data: { crmSyncStatus: 'processing' },
    })

    if (!crmClient.isConfigured()) {
      await db.visitBooking.update({
        where: { id: visitBookingId },
        data: { crmSyncStatus: 'pending', crmSyncError: 'CRM credentials unconfigured' },
      })
      return { success: false, error: 'CRM credentials unconfigured' }
    }

    // 1. Contact Upsert
    const nameParts = booking.fullName.trim().split(' ')
    const firstName = nameParts[0] || booking.fullName
    const lastName = nameParts.slice(1).join(' ') || ''

    const contactResult = await crmClient.upsertContact({
      firstName,
      lastName,
      name: booking.fullName,
      email: booking.email,
      phone: booking.phone,
      tags: ['markhor-visit-booking', 'vip-tour-request'],
    })

    const contactId = contactResult.contactId

    // 2. Opportunity Upsert in '04 Visit Scheduled' Stage
    let opportunityId: string | undefined = undefined
    try {
      const stageConfig = await getStageIdForStatus('04 Visit Scheduled')
      if (stageConfig) {
        const opResult = await crmClient.upsertOpportunity({
          pipelineId: stageConfig.pipelineId,
          stageId: stageConfig.stageId,
          name: `VIP Site Visit — ${booking.fullName} (${booking.referenceNumber})`,
          contactId: contactId,
          monetaryValue: 500000,
          status: 'open',
        })
        opportunityId = opResult.opportunityId
      }
    } catch (opErr: any) {
      console.warn('CRM Opportunity creation warning for visit:', opErr?.message)
    }

    // 3. Calendar Appointment Creation
    let appointmentId: string | undefined = undefined
    try {
      const apptResult = await crmClient.createAppointment({
        calendarId: MARKHOR_VISIT_CALENDAR_ID,
        contactId,
        title: `Markhor VIP Tour — ${booking.fullName}`,
        notes: `Date: ${booking.preferredDate || 'Flexible'} | Time: ${booking.preferredTime || 'Anytime'} | Guests: ${booking.numberOfGuests} | Requests: ${booking.specialRequests || 'None'}`,
      })
      if (apptResult.success) {
        appointmentId = apptResult.appointmentId
      }
    } catch (apptErr: any) {
      console.warn('CRM Calendar Appointment creation warning:', apptErr?.message)
    }

    const finalStatus = appointmentId ? 'SCHEDULED' : 'PENDING_CONFIRMATION'

    await db.visitBooking.update({
      where: { id: visitBookingId },
      data: {
        crmContactId: contactId,
        crmOpportunityId: opportunityId || null,
        crmAppointmentId: appointmentId || null,
        status: finalStatus,
        crmSyncStatus: 'synced',
        crmSyncError: null,
      },
    })

    await db.auditLog.create({
      data: {
        actorUsername: 'system',
        action: 'visit_booking_crm_sync',
        entityType: 'VisitBooking',
        entityId: visitBookingId,
        details: JSON.stringify({ contactId, opportunityId, appointmentId, finalStatus }),
      },
    })

    return { success: true, contactId, opportunityId, appointmentId }
  } catch (err: any) {
    const errorMessage = err?.message || 'Visit CRM sync failed'
    console.error(`CRM Visit Sync error for ${visitBookingId}:`, errorMessage)

    await db.visitBooking.update({
      where: { id: visitBookingId },
      data: {
        crmSyncStatus: 'failed',
        crmSyncError: errorMessage,
      },
    }).catch(() => {})

    return { success: false, error: errorMessage }
  }
}
