import type {
  CrmContactInput,
  CrmExternalIdFields,
  CrmLeadInput,
  CrmOperationResult,
  CrmProvider,
  CrmWebhookInput,
  CrmWebhookResult,
  CrmWorkflowEventInput,
} from '../types'

export interface GuaranteedCrmConfig {
  baseUrl?: string
  apiKey?: string
  locationId?: string
  webhookSecret?: string
}

export class GuaranteedCrmNotImplementedError extends Error {
  constructor(operation: string) {
    super(`GuaranteedCRM operation "${operation}" is not enabled in GCRM-00.`)
    this.name = 'GuaranteedCrmNotImplementedError'
  }
}

/**
 * Provider adapter skeleton. It deliberately performs no HTTP requests until
 * the GuaranteedCRM API/authentication contract is confirmed in GCRM-01.
 */
export class GuaranteedCrmProvider implements CrmProvider {
  readonly name = 'guaranteedcrm' as const

  constructor(readonly config: GuaranteedCrmConfig = {}) {}

  private notImplemented(operation: string): never {
    throw new GuaranteedCrmNotImplementedError(operation)
  }

  async upsertContact(_input: CrmContactInput): Promise<CrmOperationResult> {
    return this.notImplemented('upsertContact')
  }

  async createOpportunityOrLead(_input: CrmLeadInput): Promise<CrmOperationResult> {
    return this.notImplemented('createOpportunityOrLead')
  }

  async updateLeadStage(_opportunityId: string, _stage: string, _idempotencyKey: string): Promise<CrmOperationResult> {
    return this.notImplemented('updateLeadStage')
  }

  async addTag(_contactId: string, _tag: string, _idempotencyKey: string): Promise<CrmOperationResult> {
    return this.notImplemented('addTag')
  }

  async removeTag(_contactId: string, _tag: string, _idempotencyKey: string): Promise<CrmOperationResult> {
    return this.notImplemented('removeTag')
  }

  async sendWorkflowEvent(_input: CrmWorkflowEventInput): Promise<CrmOperationResult> {
    return this.notImplemented('sendWorkflowEvent')
  }

  async recordExternalId(_recordId: string, _ids: Pick<CrmExternalIdFields, 'crm_contact_id' | 'crm_opportunity_id'>): Promise<void> {
    return this.notImplemented('recordExternalId')
  }

  async getContact(_contactId: string): Promise<unknown | null> {
    return this.notImplemented('getContact')
  }

  async handleWebhook(_input: CrmWebhookInput): Promise<CrmWebhookResult> {
    return this.notImplemented('handleWebhook')
  }
}

export function createGuaranteedCrmProvider(config: GuaranteedCrmConfig = {}): GuaranteedCrmProvider {
  return new GuaranteedCrmProvider(config)
}
