import { VoiceProvider, SynthesizeOptions, SynthesizeResult } from './types'

export class VocoGenVoiceProvider implements VoiceProvider {
  readonly name = 'vocogen'
  private apiKey: string
  private baseUrl: string
  private defaultVoiceId: string

  constructor() {
    this.apiKey = process.env.VOCOGEN_API_KEY || ''
    this.baseUrl = process.env.VOCOGEN_BASE_URL || 'https://api.vocogen.ai/v1'
    this.defaultVoiceId = process.env.VOCOGEN_VOICE_ID || 'markhor-concierge-en'
  }

  isConfigured(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim() !== '')
  }

  async synthesize(options: SynthesizeOptions): Promise<SynthesizeResult> {
    const language = options.language || 'en'

    if (!this.isConfigured()) {
      return {
        success: false,
        cached: false,
        provider: 'vocogen',
        language,
        error: 'VOCOGEN_API_KEY is not configured in server environment.',
      }
    }

    // Input length limit safeguard to protect voice credits
    const sanitizedText = options.text.trim().substring(0, 500)

    try {
      const voiceId = options.voice || this.defaultVoiceId
      const url = `${this.baseUrl}/text-to-speech`

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg',
        },
        body: JSON.stringify({
          text: sanitizedText,
          voice_id: voiceId,
          language: language === 'ur' ? 'ur-PK' : 'en-US',
          speed: options.speed || 1.0,
          output_format: options.format || 'mp3',
        }),
      })

      if (!res.ok) {
        const errorText = await res.text().catch(() => `HTTP ${res.status}`)
        return {
          success: false,
          cached: false,
          provider: 'vocogen',
          language,
          error: `VocoGen API Error (${res.status}): ${errorText}`,
        }
      }

      const arrayBuffer = await res.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      return {
        success: true,
        audioBuffer: buffer,
        cached: false,
        provider: 'vocogen',
        language,
      }
    } catch (err: any) {
      return {
        success: false,
        cached: false,
        provider: 'vocogen',
        language,
        error: err?.message || 'Network request to VocoGen API failed',
      }
    }
  }
}
