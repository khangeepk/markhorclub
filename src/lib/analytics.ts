/**
 * Markhor Club Privacy-Conscious Analytics Adapter
 * PII-Scrubbed Event Logging & Provider Dispatch
 */

export interface AnalyticsEvent {
  name:
    | 'membership_inquiry_submitted'
    | 'book_visit_submitted'
    | 'whatsapp_clicked'
    | 'chat_opened'
    | 'live_csr_requested'
    | 'membership_cta_clicked'
    | string
  properties?: Record<string, any>
}

// Keys to automatically scrub from event payloads
const PII_KEYS = [
  'cnic',
  'nic',
  'email',
  'phone',
  'mobile',
  'name',
  'fullName',
  'address',
  'password',
  'token',
]

function sanitizeProperties(props?: Record<string, any>): Record<string, any> {
  if (!props) return {}

  const cleanProps: Record<string, any> = {}

  for (const [key, value] of Object.entries(props)) {
    if (PII_KEYS.some((piiKey) => key.toLowerCase().includes(piiKey))) {
      cleanProps[key] = '[REDACTED_PII]'
    } else if (typeof value === 'object' && value !== null) {
      cleanProps[key] = sanitizeProperties(value)
    } else {
      cleanProps[key] = value
    }
  }

  return cleanProps
}

export function trackEvent(name: AnalyticsEvent['name'], properties?: Record<string, any>) {
  const sanitizedProps = sanitizeProperties(properties)
  const timestamp = new Date().toISOString()

  // Development/Logging Output
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Analytics] Tracked: ${name}`, {
      timestamp,
      properties: sanitizedProps,
    })
  }

  // Integrations point for Google Analytics, PostHog, or Segment if configured
  if (typeof window !== 'undefined' && (window as any).gtag) {
    ;(window as any).gtag('event', name, sanitizedProps)
  }
}
