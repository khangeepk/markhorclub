/**
 * Payment Gateway & Proof Verification Abstraction Types
 * Supports Manual Proof Verification, Safepay, JazzCash, and EasyPaisa
 */

export type PaymentVerificationStatus =
  | 'PENDING_VERIFICATION'
  | 'AUTO_VERIFIED'
  | 'MANUALLY_VERIFIED'
  | 'NEEDS_INFORMATION'
  | 'REJECTED'
  | 'DUPLICATE'

export type PaymentMethodType =
  | 'bank_transfer'
  | 'jazzcash'
  | 'easypaisa'
  | 'card'
  | 'online'

export interface PaymentSubmissionPayload {
  fullName: string
  phone: string
  email: string
  membershipNumber?: string
  inquiryReference?: string
  amount: number
  currency?: string
  paymentMethod: PaymentMethodType
  providerName?: string
  paymentDate?: Date
  transactionReference: string // TID / Ref Number
  proofStorageKey?: string
  remarks?: string
}

export interface PaymentVerificationResult {
  success: boolean
  submissionReference: string
  status: PaymentVerificationStatus
  verifiedAmount?: number
  providerTransactionId?: string
  providerStatus?: string
  verificationMethod: 'manual' | 'webhook' | 'provider_api'
  message: string
}

export interface IPaymentProvider {
  id: string
  name: string
  isConfigured: boolean
  initiatePayment?: (payload: any) => Promise<{ checkoutUrl?: string; reference: string }>
  verifyTransaction: (transactionRef: string, amount: number) => Promise<PaymentVerificationResult>
  processWebhook?: (rawBody: string, headers: Record<string, string>) => Promise<PaymentVerificationResult>
}
