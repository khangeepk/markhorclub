/**
 * GuaranteedCRM API v2 Client
 * Standardized adapter for private integration tokens & location access.
 * Location ID: XiafrvXc2uTJ0WzOAJFu
 */

export interface GuaranteedCrmResponse<T = any> {
  success: boolean
  status: number
  data?: T
  error?: string
  raw?: any
}

export class GuaranteedCrmClient {
  private baseUrl: string
  private token: string
  private locationId: string

  constructor() {
    this.baseUrl = process.env.GUARANTEEDCRM_BASE_URL || 'https://services.leadconnectorhq.com'
    this.token = process.env.GUARANTEEDCRM_PRIVATE_TOKEN || ''
    this.locationId = process.env.GUARANTEEDCRM_LOCATION_ID || 'XiafrvXc2uTJ0WzOAJFu'
  }

  private get headers(): Record<string, string> {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Version': '2021-07-28',
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    }
  }

  public get configuredLocationId(): string {
    return this.locationId
  }

  public isConfigured(): boolean {
    return Boolean(this.token && this.token.trim() !== '')
  }

  private async request<T = any>(
    path: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
      body?: any
      query?: Record<string, string | number | undefined>
    } = {}
  ): Promise<GuaranteedCrmResponse<T>> {
    if (!this.isConfigured()) {
      return {
        success: false,
        status: 401,
        error: 'GUARANTEEDCRM_PRIVATE_TOKEN is not configured',
      }
    }

    try {
      const url = new URL(path.startsWith('http') ? path : `${this.baseUrl}${path.startsWith('/') ? '' : '/'}${path}`)
      if (options.query) {
        Object.entries(options.query).forEach(([k, v]) => {
          if (v !== undefined && v !== null) {
            url.searchParams.append(k, String(v))
          }
        })
      }

      const res = await fetch(url.toString(), {
        method: options.method || 'GET',
        headers: this.headers,
        body: options.body ? JSON.stringify(options.body) : undefined,
        cache: 'no-store',
      })

      const contentType = res.headers.get('content-type') || ''
      let data: any = null
      if (contentType.includes('application/json')) {
        data = await res.json()
      } else {
        const text = await res.text()
        data = { text }
      }

      if (!res.ok) {
        return {
          success: false,
          status: res.status,
          error: data?.message || data?.error || res.statusText || `HTTP ${res.status}`,
          raw: data,
        }
      }

      return {
        success: true,
        status: res.status,
        data: data as T,
        raw: data,
      }
    } catch (err: any) {
      return {
        success: false,
        status: 500,
        error: err?.message || 'Network request failed',
      }
    }
  }

  // ==================== READ-ONLY AUDIT & TEST ====================

  /**
   * Safe read-only test of CRM API permissions.
   * Returns sanitized statuses without revealing customer personal data.
   */
  async testReadPermissions() {
    const results: Record<string, { success: boolean; status: string; detail?: string }> = {}

    // 1. Location details test
    const locationRes = await this.request(`/locations/${this.locationId}`)
    results.locationAccess = {
      success: locationRes.success,
      status: locationRes.success ? 'SUCCESS' : `FAILED (${locationRes.error})`,
    }

    // 2. Contacts search test
    const contactsRes = await this.request('/contacts/', {
      query: { locationId: this.locationId, limit: 1 },
    })
    results.contactsApi = {
      success: contactsRes.success,
      status: contactsRes.success ? 'SUCCESS' : `FAILED (${contactsRes.error})`,
    }

    // 3. Pipelines test
    const pipelinesRes = await this.request('/opportunities/pipelines', {
      query: { locationId: this.locationId },
    })
    results.opportunitiesApi = {
      success: pipelinesRes.success,
      status: pipelinesRes.success ? 'SUCCESS' : `FAILED (${pipelinesRes.error})`,
    }

    // 4. Conversations test
    const conversationsRes = await this.request('/conversations/search', {
      query: { locationId: this.locationId, limit: 1 },
    })
    results.conversationsApi = {
      success: conversationsRes.success,
      status: conversationsRes.success ? 'SUCCESS' : `FAILED (${conversationsRes.error})`,
    }

    // 5. Calendars test
    const calendarsRes = await this.request('/calendars/', {
      query: { locationId: this.locationId },
    })
    results.calendarsApi = {
      success: calendarsRes.success,
      status: calendarsRes.success ? 'SUCCESS' : `FAILED (${calendarsRes.error})`,
    }

    // 6. Custom fields test
    const customFieldsRes = await this.request(`/locations/${this.locationId}/customFields`)
    results.customFieldsApi = {
      success: customFieldsRes.success,
      status: customFieldsRes.success ? 'SUCCESS' : `FAILED (${customFieldsRes.error})`,
    }

    const authSuccess = Object.values(results).some((r) => r.success)

    return {
      authentication: authSuccess ? 'SUCCESS' : 'FAILED',
      configuredLocationId: this.locationId,
      tests: results,
      rawPipelines: pipelinesRes.data?.pipelines || [],
    }
  }

  // ==================== CONTACTS API ====================

  async searchContact(query: { email?: string; phone?: string }): Promise<any | null> {
    if (!query.email && !query.phone) return null

    // Search by email or phone
    const res = await this.request('/contacts/', {
      query: {
        locationId: this.locationId,
        query: query.phone || query.email,
        limit: 5,
      },
    })

    if (res.success && res.data?.contacts?.length > 0) {
      const contacts = res.data.contacts
      // Find matching contact
      const match = contacts.find((c: any) => {
        if (query.email && c.email?.toLowerCase() === query.email.toLowerCase()) return true
        if (query.phone) {
          const clean1 = c.phone?.replace(/\D/g, '')
          const clean2 = query.phone?.replace(/\D/g, '')
          if (clean1 && clean2 && (clean1.endsWith(clean2) || clean2.endsWith(clean1))) return true
        }
        return false
      })
      return match || contacts[0]
    }
    return null
  }

  async upsertContact(data: {
    firstName: string
    lastName?: string
    name?: string
    email?: string
    phone?: string
    tags?: string[]
    customFields?: Array<{ id?: string; key?: string; field_value: string }>
  }): Promise<{ contactId: string; created: boolean }> {
    // 1. Check existing contact to deduplicate
    const existing = await this.searchContact({ email: data.email, phone: data.phone })

    const payload: any = {
      locationId: this.locationId,
      name: data.name || `${data.firstName} ${data.lastName || ''}`.trim(),
      firstName: data.firstName,
      lastName: data.lastName || '',
      email: data.email,
      phone: data.phone,
      tags: data.tags || [],
    }

    if (existing?.id) {
      // Update existing contact
      const updateRes = await this.request(`/contacts/${existing.id}`, {
        method: 'PUT',
        body: payload,
      })
      return {
        contactId: existing.id,
        created: false,
      }
    }

    // Create new contact
    const createRes = await this.request('/contacts/', {
      method: 'POST',
      body: payload,
    })

    if (createRes.success && (createRes.data?.contact?.id || createRes.data?.id)) {
      return {
        contactId: createRes.data?.contact?.id || createRes.data?.id,
        created: true,
      }
    }

    throw new Error(`Failed to upsert contact in GuaranteedCRM: ${createRes.error}`)
  }

  // ==================== PIPELINES & OPPORTUNITIES API ====================

  async getPipelines(): Promise<any[]> {
    const res = await this.request('/opportunities/pipelines', {
      query: { locationId: this.locationId },
    })
    return res.data?.pipelines || []
  }

  async createPipeline(name: string, stages: Array<{ name: string }>): Promise<any> {
    const res = await this.request('/opportunities/pipelines', {
      method: 'POST',
      body: {
        locationId: this.locationId,
        name,
        stages: stages.map((s, idx) => ({ name: s.name, position: idx })),
      },
    })
    return res.data
  }

  async upsertOpportunity(data: {
    pipelineId: string
    stageId: string
    name: string
    contactId: string
    monetaryValue?: number
    status?: 'open' | 'won' | 'lost' | 'abandoned'
  }): Promise<{ opportunityId: string }> {
    // Search existing opportunities for contact in pipeline
    const searchRes = await this.request('/opportunities/search', {
      query: {
        locationId: this.locationId,
        pipeline_id: data.pipelineId,
        contact_id: data.contactId,
      },
    })

    const existingOps = searchRes.data?.opportunities || []
    if (existingOps.length > 0) {
      const existingOp = existingOps[0]
      // Update stage
      const updateRes = await this.request(`/opportunities/${existingOp.id}`, {
        method: 'PUT',
        body: {
          pipelineId: data.pipelineId,
          pipelineStageId: data.stageId,
          name: data.name,
          monetaryValue: data.monetaryValue,
          status: data.status || 'open',
        },
      })
      return { opportunityId: existingOp.id }
    }

    // Create new opportunity
    const createRes = await this.request('/opportunities/', {
      method: 'POST',
      body: {
        locationId: this.locationId,
        pipelineId: data.pipelineId,
        pipelineStageId: data.stageId,
        name: data.name,
        contactId: data.contactId,
        monetaryValue: data.monetaryValue || 500000,
        status: data.status || 'open',
      },
    })

    if (createRes.success && (createRes.data?.opportunity?.id || createRes.data?.id)) {
      return { opportunityId: createRes.data?.opportunity?.id || createRes.data?.id }
    }

    throw new Error(`Failed to create opportunity in GuaranteedCRM: ${createRes.error}`)
  }

  async updateLeadStage(opportunityId: string, stageId: string, _idempotencyKey?: string): Promise<{ success: boolean; error?: string }> {
    const res = await this.request(`/opportunities/${opportunityId}/status`, {
      method: 'PUT',
      body: { pipelineStageId: stageId },
    })
    if (!res.success) {
      const fallbackRes = await this.request(`/opportunities/${opportunityId}`, {
        method: 'PUT',
        body: { pipelineStageId: stageId },
      })
      return { success: fallbackRes.success, error: fallbackRes.error }
    }
    return { success: res.success, error: res.error }
  }

  // ==================== TAGS API ====================

  async addTag(contactId: string, tags: string[]): Promise<boolean> {
    const res = await this.request(`/contacts/${contactId}/tags`, {
      method: 'POST',
      body: { tags },
    })
    return res.success
  }

  // ==================== CONVERSATIONS API ====================

  async getConversations(limit = 10): Promise<any[]> {
    const res = await this.request('/conversations/search', {
      query: { locationId: this.locationId, limit },
    })
    return res.data?.conversations || []
  }

  // ==================== CALENDARS API ====================

  async getCalendars(): Promise<any[]> {
    const res = await this.request('/calendars/', {
      query: { locationId: this.locationId },
    })
    return res.data?.calendars || []
  }

  async createAppointment(data: {
    calendarId: string
    contactId: string
    startTime?: string
    title?: string
    notes?: string
  }): Promise<{ appointmentId?: string; success: boolean; error?: string }> {
    const payload = {
      calendarId: data.calendarId,
      locationId: this.locationId,
      contactId: data.contactId,
      startTime: data.startTime || new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      title: data.title || 'Markhor Club VIP Visit',
      appointmentStatus: 'confirmed',
      notes: data.notes || 'Site visit request submitted via Markhor Club portal',
    }

    const res = await this.request('/calendars/events/appointments', {
      method: 'POST',
      body: payload,
    })

    if (res.success && (res.data?.id || res.data?.appointment?.id || res.data?.event?.id)) {
      return {
        success: true,
        appointmentId: res.data?.id || res.data?.appointment?.id || res.data?.event?.id,
      }
    }

    return {
      success: false,
      error: res.error || 'Failed to create appointment',
    }
  }
}

export const crmClient = new GuaranteedCrmClient()
