import { VoiceProvider, SynthesizeOptions, SynthesizeResult } from './types'
import { CONCIERGE_AUDIO_MANIFEST } from './concierge-audio'
import crypto from 'crypto'

// In-memory audio cache for normalized text hashes
const inMemoryAudioCache = new Map<string, { audioUrl: string; timestamp: number }>()

export class FallbackVoiceProvider implements VoiceProvider {
  readonly name = 'local_cache'

  isConfigured(): boolean {
    return true
  }

  static getCacheKey(text: string, lang: string): string {
    const normalized = text.trim().toLowerCase().replace(/\s+/g, ' ')
    return crypto.createHash('md5').update(`${lang}:${normalized}`).digest('hex')
  }

  async synthesize(options: SynthesizeOptions): Promise<SynthesizeResult> {
    const language = options.language || 'en'
    const text = options.text.trim()
    const cleanLower = text.toLowerCase()

    // 1. Check Pre-generated Audio Mapping from CONCIERGE_AUDIO_MANIFEST
    let targetKey: string | null = null

    if (cleanLower.includes('welcome') || cleanLower.includes('خوش آمدید')) {
      targetKey = 'welcome'
    } else if (cleanLower.includes('500,000') || cleanLower.includes('fee') || cleanLower.includes('price') || cleanLower.includes('فیس')) {
      targetKey = 'fee'
    } else if (cleanLower.includes('alexander road') || cleanLower.includes('location') || cleanLower.includes('khanpur') || cleanLower.includes('واقع')) {
      targetKey = 'location'
    } else if (cleanLower.includes('amenities') || cleanLower.includes('restaurants') || cleanLower.includes('jacuzzi') || cleanLower.includes('سہولیات')) {
      targetKey = 'amenities'
    } else if (cleanLower.includes('visit') || cleanLower.includes('tour') || cleanLower.includes('وزٹ')) {
      targetKey = 'book_visit'
    } else if (cleanLower.includes('human') || cleanLower.includes('csr') || cleanLower.includes('representative') || cleanLower.includes('نمائندے')) {
      targetKey = 'human_support'
    } else if (cleanLower.includes('offline') || cleanLower.includes('leave a message') || cleanLower.includes('کال بیک')) {
      targetKey = 'csr_offline'
    }

    let audioUrl: string | undefined = undefined

    if (targetKey) {
      const item = CONCIERGE_AUDIO_MANIFEST.find(
        (a) => a.key === targetKey && a.language === language
      )
      if (item) {
        audioUrl = item.path
      }
    }

    // 2. Check In-Memory Audio Hash Cache
    const cacheKey = FallbackVoiceProvider.getCacheKey(text, language)
    const cachedEntry = inMemoryAudioCache.get(cacheKey)

    if (cachedEntry) {
      return {
        success: true,
        audioUrl: cachedEntry.audioUrl,
        cached: true,
        provider: 'local_cache',
        language,
      }
    }

    if (audioUrl) {
      inMemoryAudioCache.set(cacheKey, { audioUrl, timestamp: Date.now() })
      return {
        success: true,
        audioUrl,
        cached: true,
        provider: 'local_cache',
        language,
      }
    }

    // 3. Fallback to Web Speech API signal for browser-side speech synthesis
    return {
      success: true,
      cached: false,
      provider: 'web_speech',
      language,
    }
  }
}

