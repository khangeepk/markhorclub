import type { CrmEventEnvelope, CrmSyncJob } from './types'
import type { LocalMembershipEnquiry } from './local-records'

export function buildMembershipEnquiryEvent(record: LocalMembershipEnquiry): CrmEventEnvelope {
  return {
    eventId: `evt-${record.id}`,
    eventType: 'membership.inquiry.submitted',
    occurredAt: record.created_at,
    sourceRecordId: record.id,
    idempotencyKey: `membership-inquiry:${record.id}`,
    payload: {
      localRecordId: record.id,
      fullName: record.full_name,
      email: record.email,
      phone: record.phone,
      preferredContact: record.preferred_contact,
      interestCategory: record.interest_category,
      message: record.message,
      membershipPhaseSnapshot: record.membership_phase_snapshot,
      membershipFeeSnapshotPkr: record.membership_fee_snapshot_pkr,
    },
  }
}

export function createPendingSyncJob(event: CrmEventEnvelope, now = new Date()): CrmSyncJob {
  return {
    id: `sync-${event.eventId}`,
    event,
    status: 'pending',
    attempts: 0,
    nextAttemptAt: now.toISOString(),
    lastError: null,
  }
}

/**
 * Queue/retry orchestration is intentionally pure in GCRM-00. A durable queue
 * worker and provider call belong to GCRM-01 after the GuaranteedCRM contract
 * and the Markhor database have been confirmed.
 */
export function getRetryStatus(attempts: number, maxAttempts = 5): 'retrying' | 'failed' {
  return attempts >= maxAttempts ? 'failed' : 'retrying'
}
