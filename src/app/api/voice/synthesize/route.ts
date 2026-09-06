import { NextResponse } from 'next/server'
import { voiceService } from '@/lib/voice/provider'

// Rate limiting map (10 requests per 10 mins per IP to protect voice credits)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1'
    const now = Date.now()
    const rateLimit = rateLimitMap.get(ip)

    if (rateLimit && now < rateLimit.resetAt) {
      if (rateLimit.count >= 10) {
        return NextResponse.json(
          { success: false, error: 'Voice credit rate limit exceeded. Please try again shortly.' },
          { status: 429 }
        )
      }
      rateLimit.count += 1
    } else {
      rateLimitMap.set(ip, { count: 1, resetAt: now + 10 * 60 * 1000 })
    }

    const body = await request.json()
    const { text, language, voice, speed } = body

    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ success: false, error: 'Text prompt is required for synthesis.' }, { status: 400 })
    }

    // Input length limit safeguard to prevent arbitrary long generation
    const sanitizedText = text.trim().substring(0, 500)
    const lang = language === 'ur' ? 'ur' : 'en'

    const result = await voiceService.synthesize({
      text: sanitizedText,
      language: lang,
      voice,
      speed: typeof speed === 'number' ? speed : 1.0,
    })

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Synthesis failed' },
        { status: 500 }
      )
    }

    if (result.audioBuffer) {
      return new NextResponse(new Uint8Array(result.audioBuffer), {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'public, max-age=86400, immutable',
        },
      })
    }

    return NextResponse.json({
      success: true,
      audioUrl: result.audioUrl || null,
      provider: result.provider,
      cached: result.cached,
      language: result.language,
      mode: voiceService.getIntegrationMode(),
    })
  } catch (error: any) {
    console.error('Voice synthesis API error:', error)
    return NextResponse.json(
      { success: false, error: 'Voice synthesis temporary failure' },
      { status: 500 }
    )
  }
}
