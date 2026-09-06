import { CRM_PROVIDER } from './types'
import type { CrmExternalIdFields } from './types'

export interface MembershipEnquiryInput {
  fullName: string
  email: string
  phone: string
  preferredContact: string
  interestCategory: string
  message: string
  membershipPhaseSnapshot: string
  membershipFeeSnapshotPkr: number
}

export interface LocalMembershipEnquiry extends CrmExternalIdFields {
  id: string
  full_name: string
  email: string
  phone: string
  preferred_contact: string
  interest_category: string
  message: string
  membership_phase_snapshot: string
  membership_fee_snapshot_pkr: number
  created_at: string
}

/**
 * Database-neutral local record shape. The project currently has no database
 * or persistence adapter, so GCRM-01 must bind this shape to the chosen
 * Markhor repository before production CRM delivery is enabled.
 */
export function buildLocalMembershipEnquiry(input: MembershipEnquiryInput, now = new Date()): LocalMembershipEnquiry {
  const createdAt = now.toISOString()
  const id = `ME-${now.getTime()}-${crypto.randomUUID().slice(0, 8)}`

  return {
    id,
    full_name: input.fullName,
    email: input.email,
    phone: input.phone,
    preferred_contact: input.preferredContact,
    interest_category: input.interestCategory,
    message: input.message,
    membership_phase_snapshot: input.membershipPhaseSnapshot,
    membership_fee_snapshot_pkr: input.membershipFeeSnapshotPkr,
    created_at: createdAt,
    crm_provider: CRM_PROVIDER,
    crm_contact_id: null,
    crm_opportunity_id: null,
    crm_last_synced_at: null,
    crm_sync_status: 'pending',
    crm_sync_error: null,
  }
}

export interface LocalRecordRepository<T> {
  create(record: T): Promise<T>
  updateCrmMetadata(recordId: string, metadata: Partial<CrmExternalIdFields>): Promise<void>
}
