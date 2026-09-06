export const CRM_PROVIDER = 'guaranteedcrm' as const

export type CrmProviderName = typeof CRM_PROVIDER

export type CrmSyncStatus = 'pending' | 'synced' | 'failed' | 'retrying'

export type CrmEventType =
  | 'membership.inquiry.submitted'
  | 'contact.inquiry.submitted'
  | 'visit.requested'
  | 'membership.converted'
  | 'membership.payment.recorded'
  | 'member.balance.changed'
  | 'member.status.changed'
  | 'live-chat.requested'
  | 'admin.notification.requested'

export interface CrmExternalIdFields {
  crm_provider: CrmProviderName | null
  crm_contact_id: string | null
  crm_opportunity_id: string | null
  crm_last_synced_at: string | null
  crm_sync_status: CrmSyncStatus
  crm_sync_error: string | null
}

export interface CrmContactInput {
  idempotencyKey: string
  fullName: string
  email?: string
  phone?: string
  preferredContact?: string
  source: string
  tags?: string[]
  customFields?: Record<string, string | number | boolean | null>
}

export interface CrmLeadInput {
  idempotencyKey: string
  contactId?: string
  name: string
  source: string
  stage?: string
  value?: number
  customFields?: Record<string, string | number | boolean | null>
}

export interface CrmWorkflowEventInput {
  idempotencyKey: string
  eventType: CrmEventType
  contactId?: string
  payload: Record<string, unknown>
}

export interface CrmOperationResult {
  provider: CrmProviderName
  accepted: boolean
  contactId?: string
  opportunityId?: string
  status: CrmSyncStatus
}

export interface CrmWebhookInput {
  eventId: string
  eventType: string
  occurredAt: string
  payload: Record<string, unknown>
}

export interface CrmWebhookResult {
  accepted: boolean
  eventId: string
  reason?: string
}

export interface CrmProvider {
  readonly name: CrmProviderName
  upsertContact(input: CrmContactInput): Promise<CrmOperationResult>
  createOpportunityOrLead(input: CrmLeadInput): Promise<CrmOperationResult>
  updateLeadStage(opportunityId: string, stage: string, idempotencyKey: string): Promise<CrmOperationResult>
  addTag(contactId: string, tag: string, idempotencyKey: string): Promise<CrmOperationResult>
  removeTag(contactId: string, tag: string, idempotencyKey: string): Promise<CrmOperationResult>
  sendWorkflowEvent(input: CrmWorkflowEventInput): Promise<CrmOperationResult>
  recordExternalId(recordId: string, ids: Pick<CrmExternalIdFields, 'crm_contact_id' | 'crm_opportunity_id'>): Promise<void>
  getContact(contactId: string): Promise<unknown | null>
  handleWebhook(input: CrmWebhookInput): Promise<CrmWebhookResult>
}

export interface CrmEventEnvelope {
  eventId: string
  eventType: CrmEventType
  occurredAt: string
  sourceRecordId: string
  idempotencyKey: string
  payload: Record<string, unknown>
}

export interface CrmSyncJob {
  id: string
  event: CrmEventEnvelope
  status: CrmSyncStatus
  attempts: number
  nextAttemptAt: string | null
  lastError: string | null
}
