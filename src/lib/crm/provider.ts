import { createGuaranteedCrmProvider } from './guaranteedcrm/provider'
import type { CrmProvider } from './types'

/** Server-only factory. No provider call is made by importing this module. */
export function getCrmProvider(): CrmProvider {
  return createGuaranteedCrmProvider({
    baseUrl: process.env.GUARANTEEDCRM_BASE_URL,
    apiKey: process.env.GUARANTEEDCRM_API_KEY,
    locationId: process.env.GUARANTEEDCRM_LOCATION_ID,
    webhookSecret: process.env.GUARANTEEDCRM_WEBHOOK_SECRET,
  })
}
