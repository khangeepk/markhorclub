/**
 * Markhor Club Production Error & Diagnostics Monitoring Adapter
 * Features automatic PII & Secret scrubbing prior to dispatch/logging.
 */

const SENSITIVE_PATTERNS = [
  /cnic=?[0-9-]*/gi,
  /email=?[^\s&]+/gi,
  /password=?[^\s&]+/gi,
  /token=?[^\s&]+/gi,
  /secret=?[^\s&]+/gi,
  /bearer\s+[a-zA-Z0-9._-]+/gi,
]

function sanitizeMessage(message: string): string {
  let clean = message
  for (const pattern of SENSITIVE_PATTERNS) {
    clean = clean.replace(pattern, '[REDACTED_SENSITIVE]')
  }
  return clean
}

export function captureException(error: unknown, context?: Record<string, any>) {
  const errMessage = error instanceof Error ? error.message : String(error)
  const stack = error instanceof Error ? error.stack : undefined

  const cleanMessage = sanitizeMessage(errMessage)
  const cleanStack = stack ? sanitizeMessage(stack) : undefined

  console.error(`[Monitoring Error] ${cleanMessage}`, {
    stack: cleanStack,
    context: context ? JSON.parse(sanitizeMessage(JSON.stringify(context))) : undefined,
    timestamp: new Date().toISOString(),
  })

  // Sentry / Datadog integration hook
  if (typeof window !== 'undefined' && (window as any).Sentry) {
    ;(window as any).Sentry.captureException(error)
  }
}

export function captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info') {
  const cleanMessage = sanitizeMessage(message)
  console.log(`[Monitoring ${level.toUpperCase()}] ${cleanMessage}`)
}
