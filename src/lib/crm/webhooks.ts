import { createHmac, timingSafeEqual } from 'node:crypto'

export interface WebhookVerificationResult {
  valid: boolean
  reason?: 'missing-secret' | 'missing-signature' | 'invalid-signature'
}

/**
 * Verification boundary for a future inbound GuaranteedCRM webhook route.
 * The raw body must be verified before JSON parsing or business logic.
 */
export function verifyGuaranteedCrmWebhook(rawBody: string, signature: string | null, secret: string | undefined): WebhookVerificationResult {
  if (!secret) return { valid: false, reason: 'missing-secret' }
  if (!signature) return { valid: false, reason: 'missing-signature' }

  const digest = createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex')
  const expected = `sha256=${digest}`
  const received = signature.startsWith('sha256=') ? signature : `sha256=${signature}`
  const expectedBuffer = Buffer.from(expected)
  const receivedBuffer = Buffer.from(received)

  if (expectedBuffer.length !== receivedBuffer.length || !timingSafeEqual(expectedBuffer, receivedBuffer)) {
    return { valid: false, reason: 'invalid-signature' }
  }

  return { valid: true }
}
