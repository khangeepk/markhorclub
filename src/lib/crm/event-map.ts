import type { CrmEventType } from './types'

export interface CrmEventDefinition {
  event: CrmEventType
  source: string
  payload: string[]
  destination: string
  syncDirection: 'Markhor database → GuaranteedCRM' | 'GuaranteedCRM → Markhor database' | 'Internal'
  failureBehavior: string
  idempotencyRequirement: string
}

/**
 * Integration contract only. This catalog deliberately contains no provider
 * calls and is the handoff contract for GCRM-01.
 */
export const CRM_EVENT_MAP: readonly CrmEventDefinition[] = [
  {
    event: 'membership.inquiry.submitted',
    source: 'POST /api/membership-enquiry',
    payload: ['local enquiry id', 'full name', 'email', 'phone', 'preferred contact', 'category', 'message', 'fee snapshot'],
    destination: 'GuaranteedCRM contact + lead/opportunity',
    syncDirection: 'Markhor database → GuaranteedCRM',
    failureBehavior: 'Accept after local save; queue pending job; retry without blocking the visitor.',
    idempotencyRequirement: 'Stable local enquiry id must be reused for contact and lead upserts.',
  },
  {
    event: 'contact.inquiry.submitted',
    source: 'Future general-contact submission boundary',
    payload: ['local inquiry id', 'name', 'email', 'phone', 'message', 'source page'],
    destination: 'GuaranteedCRM contact + lead/opportunity',
    syncDirection: 'Markhor database → GuaranteedCRM',
    failureBehavior: 'Keep local inquiry and mark CRM sync pending/failed for retry.',
    idempotencyRequirement: 'Use the local inquiry id as the provider idempotency key.',
  },
  {
    event: 'visit.requested',
    source: 'Future book-a-visit submission boundary',
    payload: ['local visit request id', 'contact details', 'preferred date/time', 'notes'],
    destination: 'GuaranteedCRM contact + appointment/workflow',
    syncDirection: 'Markhor database → GuaranteedCRM',
    failureBehavior: 'Never lose the local request; surface a retryable sync failure to staff.',
    idempotencyRequirement: 'One provider appointment/workflow event per local visit request id.',
  },
  {
    event: 'membership.converted',
    source: 'Markhor admin/member conversion workflow',
    payload: ['member id', 'local contact id', 'membership category', 'status'],
    destination: 'GuaranteedCRM contact + pipeline stage/tag',
    syncDirection: 'Markhor database → GuaranteedCRM',
    failureBehavior: 'Complete local conversion; enqueue CRM stage update for retry.',
    idempotencyRequirement: 'Conversion event id must be unique and replay-safe.',
  },
  {
    event: 'membership.payment.recorded',
    source: 'Markhor payment ledger',
    payload: ['payment id', 'member id', 'amount', 'currency', 'recorded at', 'payment status'],
    destination: 'GuaranteedCRM contact/workflow context only; not the primary ledger',
    syncDirection: 'Markhor database → GuaranteedCRM',
    failureBehavior: 'Payment remains committed locally; CRM notification retries independently.',
    idempotencyRequirement: 'Payment id must be the deduplication key.',
  },
  {
    event: 'member.balance.changed',
    source: 'Markhor financial ledger',
    payload: ['member id', 'balance snapshot', 'currency', 'changed at'],
    destination: 'GuaranteedCRM custom fields/workflow context only',
    syncDirection: 'Markhor database → GuaranteedCRM',
    failureBehavior: 'Local balance remains authoritative; CRM can be stale until retry succeeds.',
    idempotencyRequirement: 'Use a balance version or ledger event id; never use CRM as the ledger.',
  },
  {
    event: 'member.status.changed',
    source: 'Markhor member record/admin workflow',
    payload: ['member id', 'status', 'effective at', 'reason code'],
    destination: 'GuaranteedCRM contact tag/pipeline stage',
    syncDirection: 'Markhor database → GuaranteedCRM',
    failureBehavior: 'Local status change wins; retry the CRM update.',
    idempotencyRequirement: 'Use member id + status version for replay-safe updates.',
  },
  {
    event: 'live-chat.requested',
    source: 'Future live-chat provider boundary',
    payload: ['conversation id', 'contact details', 'conversation metadata'],
    destination: 'GuaranteedCRM conversation inbox/workflow',
    syncDirection: 'GuaranteedCRM → Markhor database',
    failureBehavior: 'Retain the local conversation reference and retry inbound processing.',
    idempotencyRequirement: 'Provider conversation/event id must be unique.',
  },
  {
    event: 'admin.notification.requested',
    source: 'Markhor application/admin event bus',
    payload: ['notification id', 'event type', 'recipient group', 'safe summary'],
    destination: 'Internal notification service and optional CRM workflow',
    syncDirection: 'Internal',
    failureBehavior: 'Persist notification intent and retry delivery; never log credentials or sensitive data.',
    idempotencyRequirement: 'Notification id must be used for deduplication.',
  },
]
