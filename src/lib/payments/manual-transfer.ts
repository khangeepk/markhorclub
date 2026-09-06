import { IPaymentProvider, PaymentVerificationResult } from './types'

export class ManualTransferProvider implements IPaymentProvider {
  id = 'manual_transfer'
  name = 'Manual Bank / Slip Transfer'
  isConfigured = true

  async verifyTransaction(transactionRef: string, amount: number): Promise<PaymentVerificationResult> {
    // Manual proof transfers require admin verification action
    return {
      success: false,
      submissionReference: transactionRef,
      status: 'PENDING_VERIFICATION',
      verificationMethod: 'manual',
      message: 'Payment proof submitted. Pending administrative verification against merchant bank statement.',
    }
  }
}
