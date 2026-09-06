export type VoiceLanguage = 'en' | 'ur'

export interface SynthesizeOptions {
  text: string
  voice?: string
  language?: VoiceLanguage
  speed?: number
  format?: 'mp3' | 'wav' | 'ogg'
}

export interface SynthesizeResult {
  success: boolean
  audioUrl?: string
  audioBuffer?: Buffer
  cached: boolean
  provider: 'vocogen' | 'local_cache' | 'web_speech'
  language: VoiceLanguage
  error?: string
}

export interface VoiceProvider {
  name: string
  isConfigured(): boolean
  synthesize(options: SynthesizeOptions): Promise<SynthesizeResult>
}
