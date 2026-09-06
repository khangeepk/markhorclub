import { VoiceProvider, SynthesizeOptions, SynthesizeResult } from './types'
import { VocoGenVoiceProvider } from './vocogen'
import { FallbackVoiceProvider } from './fallback'

export class VoiceService {
  private vocogen: VocoGenVoiceProvider
  private fallback: FallbackVoiceProvider

  constructor() {
    this.vocogen = new VocoGenVoiceProvider()
    this.fallback = new FallbackVoiceProvider()
  }

  /**
   * Returns current active mode based on official VocoGen credentials
   */
  getIntegrationMode(): 'MODE_A_REALTIME' | 'MODE_B_ASYNC_TTS' | 'MODE_C_MANUAL_CACHE' {
    if (this.vocogen.isConfigured()) {
      return 'MODE_B_ASYNC_TTS'
    }
    return 'MODE_C_MANUAL_CACHE'
  }

  async synthesize(options: SynthesizeOptions): Promise<SynthesizeResult> {
    // 1. If VocoGen API key is configured, use official VocoGen provider
    if (this.vocogen.isConfigured()) {
      const result = await this.vocogen.synthesize(options)
      if (result.success) {
        return result
      }
      console.warn('VocoGen synthesis failed, falling back to cached provider:', result.error)
    }

    // 2. Otherwise use local cache / pre-generated audio / web speech fallback
    return this.fallback.synthesize(options)
  }
}

export const voiceService = new VoiceService()
