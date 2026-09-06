import { VoiceProvider, SynthesizeOptions, SynthesizeResult } from './types'
import crypto from 'crypto'

// Pre-generated static audio asset mapping for core Markhor FAQs
const PREGENERATED_AUDIO_MAP: Record<string, string> = {
  fee: '/assets/audio/concierge/membership-fee.mp3',
  location: '/assets/audio/concierge/location-khanpur.mp3',
  amenities: '/assets/audio/concierge/amenities-overview.mp3',
  aqua: '/assets/audio/concierge/aqua-theme-park.mp3',
  visit: '/assets/audio/concierge/book-a-visit.mp3',
}

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

    // 1. Check Pre-generated Audio Mapping
    let audioUrl: string | undefined = undefined

    if (cleanLower.includes('500,000') || cleanLower.includes('fee') || cleanLower.includes('price')) {
      audioUrl = PREGENERATED_AUDIO_MAP.fee
    } else if (cleanLower.includes('alexander road') || cleanLower.includes('location') || cleanLower.includes('khanpur')) {
      audioUrl = PREGENERATED_AUDIO_MAP.location
    } else if (cleanLower.includes('amenities') || cleanLower.includes('restaurants') || cleanLower.includes('jacuzzi')) {
      audioUrl = PREGENERATED_AUDIO_MAP.amenities
    } else if (cleanLower.includes('aqua') || cleanLower.includes('slides')) {
      audioUrl = PREGENERATED_AUDIO_MAP.aqua
    } else if (cleanLower.includes('visit') || cleanLower.includes('tour')) {
      audioUrl = PREGENERATED_AUDIO_MAP.visit
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
