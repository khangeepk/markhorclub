import { IPaymentProvider } from './types'
import { ManualTransferProvider } from './manual-transfer'
import { SafepayProvider } from './safepay'
import { JazzCashProvider } from './jazzcash'
import { EasyPaisaProvider } from './easypaisa'

export class PaymentProviderRegistry {
  private providers = new Map<string, IPaymentProvider>()

  constructor() {
    this.register(new ManualTransferProvider())
    this.register(new SafepayProvider())
    this.register(new JazzCashProvider())
    this.register(new EasyPaisaProvider())
  }

  register(provider: IPaymentProvider) {
    this.providers.set(provider.id, provider)
  }

  getProvider(id: string): IPaymentProvider {
    return this.providers.get(id) || this.providers.get('manual_transfer')!
  }

  getAllProviders(): Array<{ id: string; name: string; isConfigured: boolean }> {
    return Array.from(this.providers.values()).map((p) => ({
      id: p.id,
      name: p.name,
      isConfigured: p.isConfigured,
    }))
  }
}

export const paymentRegistry = new PaymentProviderRegistry()
