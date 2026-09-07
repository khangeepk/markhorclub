'use client'

import Image from 'next/image'
import { ArrowRight, Volume2, VolumeX } from 'lucide-react'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import gsap from 'gsap'

const INTRO_VIDEO_PRIMARY = '/assets/video/markhor-intro.mp4'
const INTRO_VIDEO_ALT = '/assets/video/markhor-intro.mp4'
const INTRO_POSTER_PRIMARY = '/assets/video/markhor-intro-poster.jpg'
const INTRO_POSTER_ALT = '/assets/video/markhor-intro-poster.jpg'

export type IntroStatus = 'loading' | 'playing' | 'exiting' | 'complete'

type CinematicIntroContextValue = {
  introComplete: boolean
  introActive: boolean
  status: IntroStatus
}

const CinematicIntroContext = createContext<CinematicIntroContextValue>({
  introComplete: true,
  introActive: false,
  status: 'complete',
})

export function useCinematicIntro() {
  return useContext(CinematicIntroContext)
}

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function IntroSearchParamsListener({
  onForceReplay,
}: {
  onForceReplay: (force: boolean) => void
}) {
  const searchParams = useSearchParams()
  useEffect(() => {
    if (searchParams?.get('intro') === 'true' || searchParams?.get('replay') === '1') {
      onForceReplay(true)
    }
  }, [searchParams, onForceReplay])
  return null
}

export default function CinematicIntroProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [forceReplay, setForceReplay] = useState(false)

  const handleForceReplay = useCallback((force: boolean) => {
    setForceReplay(force)
  }, [])

  const [status, setStatus] = useState<IntroStatus>('loading')
  const [introComplete, setIntroComplete] = useState<boolean>(false)
  const [progress, setProgress] = useState(0)
  const [isMuted, setIsMuted] = useState(true)

  const overlayRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)

  const statusRef = useRef<IntroStatus>('loading')
  const isExitingRef = useRef<boolean>(false)
  const originalBodyOverflowRef = useRef<string | null>(null)
  const originalHtmlOverflowRef = useRef<string | null>(null)
  const originalTouchActionRef = useRef<string | null>(null)
  const originalOverscrollRef = useRef<string | null>(null)
  const fallbackTimerRef = useRef<number | null>(null)
  const gsapTweenRef = useRef<gsap.core.Tween | null>(null)

  // Keep statusRef in sync
  useEffect(() => {
    statusRef.current = status
  }, [status])

  // Restore scroll helper
  const unlockScroll = useCallback(() => {
    if (typeof document === 'undefined') return
    document.documentElement.classList.remove('markhor-intro-active')

    if (originalBodyOverflowRef.current !== null) {
      document.body.style.overflow = originalBodyOverflowRef.current
      originalBodyOverflowRef.current = null
    } else {
      document.body.style.overflow = ''
    }

    if (originalHtmlOverflowRef.current !== null) {
      document.documentElement.style.overflow = originalHtmlOverflowRef.current
      originalHtmlOverflowRef.current = null
    } else {
      document.documentElement.style.overflow = ''
    }

    if (originalTouchActionRef.current !== null) {
      document.documentElement.style.touchAction = originalTouchActionRef.current
      originalTouchActionRef.current = null
    } else {
      document.documentElement.style.touchAction = ''
    }

    if (originalOverscrollRef.current !== null) {
      document.documentElement.style.overscrollBehavior = originalOverscrollRef.current
      originalOverscrollRef.current = null
    } else {
      document.documentElement.style.overscrollBehavior = ''
    }
  }, [])

  // Lock scroll helper
  const lockScroll = useCallback(() => {
    if (typeof document === 'undefined') return
    if (originalBodyOverflowRef.current === null) {
      originalBodyOverflowRef.current = document.body.style.overflow
    }
    if (originalHtmlOverflowRef.current === null) {
      originalHtmlOverflowRef.current = document.documentElement.style.overflow
    }
    if (originalTouchActionRef.current === null) {
      originalTouchActionRef.current = document.documentElement.style.touchAction
    }
    if (originalOverscrollRef.current === null) {
      originalOverscrollRef.current = document.documentElement.style.overscrollBehavior
    }

    document.documentElement.classList.add('markhor-intro-active')
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.documentElement.style.touchAction = 'none'
    document.documentElement.style.overscrollBehavior = 'none'
  }, [])

  // Deterministic exit transition
  const completeIntro = useCallback(
    (immediate = false) => {
      if (statusRef.current === 'complete' || isExitingRef.current) return
      isExitingRef.current = true

      // Clear fail-safe timer
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current)
        fallbackTimerRef.current = null
      }

      // Mark seen in sessionStorage (client-side only)
      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem('markhor_intro_seen', 'true')
        } catch {
          // Ignore quota / privacy mode errors
        }
      }

      // Immediately restore body scrolling & announce intro complete to page
      unlockScroll()
      setIntroComplete(true)

      const video = videoRef.current
      const overlay = overlayRef.current

      // Stop video audio immediately so ambient music can transition cleanly
      if (video) {
        video.muted = true
      }

      if (immediate || !overlay) {
        if (gsapTweenRef.current) {
          gsapTweenRef.current.kill()
        }
        video?.pause()
        statusRef.current = 'complete'
        setStatus('complete')
        return
      }

      // Smooth exit transition: set pointer-events none & fade opacity 1 -> 0 over 800ms
      overlay.style.pointerEvents = 'none'
      statusRef.current = 'exiting'
      setStatus('exiting')

      gsapTweenRef.current = gsap.to(overlay, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
          video?.pause()
          statusRef.current = 'complete'
          setStatus('complete')
          gsapTweenRef.current = null
        },
      })
    },
    [unlockScroll]
  )

  // Primary lifecycle initialization
  useEffect(() => {
    // Non-home routes, reduced motion, or previously seen session -> skip immediately unless forced
    let hasSeenSession = false
    if (typeof window !== 'undefined') {
      try {
        hasSeenSession = sessionStorage.getItem('markhor_intro_seen') === 'true'
      } catch {
        hasSeenSession = false
      }
    }

    if (!isHome || prefersReducedMotion() || (hasSeenSession && !forceReplay)) {
      statusRef.current = 'complete'
      setStatus('complete')
      setIntroComplete(true)
      unlockScroll()
      return
    }

    // Home page fresh session: lock scroll and start playing
    statusRef.current = 'playing'
    setStatus('playing')
    lockScroll()

    // Safety fallback: 25 seconds max (video is ~15-20s max, allows for network buffer)
    const safetyTimer = window.setTimeout(() => {
      completeIntro(false)
    }, 25000)
    fallbackTimerRef.current = safetyTimer

    return () => {
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current)
      }
      if (gsapTweenRef.current) {
        gsapTweenRef.current.kill()
      }
      unlockScroll()
    }
  }, [isHome, forceReplay, lockScroll, unlockScroll, completeIntro])

  // Play video with auto-start guarantee (muted first)
  useEffect(() => {
    if (status !== 'playing') return

    const video = videoRef.current
    if (!video) return

    video.muted = isMuted
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('[Markhor Intro] Autoplay rejected, enforcing muted autoplay:', err)
        video.muted = true
        setIsMuted(true)
        video.play().catch((mutedErr) => {
          console.error('[Markhor Intro] All video play attempts failed:', mutedErr)
          completeIntro(false)
        })
      })
    }
  }, [status, isMuted, completeIntro])

  const toggleSound = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    const video = videoRef.current
    if (!video) return
    const nextMuted = !isMuted
    video.muted = nextMuted
    setIsMuted(nextMuted)
  }

  const handleOverlayClick = () => {
    // Visitor click gesture: unmute video if currently muted
    const video = videoRef.current
    if (video && video.muted) {
      video.muted = false
      setIsMuted(false)
    }
  }

  const handleLoadedMetadata = () => {
    const video = videoRef.current
    if (video && video.duration) {
      // Dynamic safety timer based on actual video duration + 3 seconds buffer
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current)
      }
      const durationMs = Math.ceil((video.duration + 3) * 1000)
      fallbackTimerRef.current = window.setTimeout(() => {
        completeIntro(false)
      }, durationMs)
    }
  }

  const contextValue = {
    introComplete,
    introActive: status === 'playing' || status === 'loading' || status === 'exiting',
    status,
  }

  return (
    <CinematicIntroContext.Provider value={contextValue}>
      <React.Suspense fallback={null}>
        <IntroSearchParamsListener onForceReplay={handleForceReplay} />
      </React.Suspense>
      {children}

      {isHome && status !== 'complete' && (
        <div
          ref={overlayRef}
          onClick={handleOverlayClick}
          className={`markhor-intro fixed inset-0 z-[2000] overflow-hidden bg-[#071116] text-[#F4F0E8] select-none cursor-pointer ${
            status === 'exiting' ? 'pointer-events-none' : ''
          }`}
          style={{ position: 'fixed', inset: 0, zIndex: 2000, overflow: 'hidden' }}
          data-intro-status={status}
          data-intro-complete={introComplete ? 'true' : 'false'}
          aria-label="Markhor Club cinematic introduction"
        >
          <video
            ref={videoRef}
            className="markhor-intro-video absolute inset-0 h-full w-full object-cover"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none', objectFit: 'cover' }}
            poster={INTRO_POSTER_PRIMARY}
            autoPlay
            muted={isMuted}
            playsInline
            preload="auto"
            aria-hidden="true"
            onLoadedMetadata={handleLoadedMetadata}
            onTimeUpdate={(event) => {
              const currentVideo = event.currentTarget
              if (currentVideo.duration) {
                setProgress(currentVideo.currentTime / currentVideo.duration)
              }
            }}
            onEnded={() => completeIntro(false)}
            onError={() => {
              console.warn('[Markhor Intro] Primary video failed, trying alternate source or completing gracefully.')
              completeIntro(false)
            }}
          >
            <source src={INTRO_VIDEO_PRIMARY} type="video/mp4" />
            <source src={INTRO_VIDEO_ALT} type="video/mp4" />
          </video>

          <div className="markhor-intro-gradient absolute inset-0 bg-gradient-to-t from-[#071116]/80 via-transparent to-[#071116]/35" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
          <div ref={veilRef} className="markhor-intro-veil absolute inset-0 bg-[#071116] opacity-0" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

          <div
            ref={brandRef}
            className="markhor-intro-brand absolute bottom-24 left-6 flex translate-y-2 flex-col gap-2 opacity-80 sm:left-10 lg:left-16"
            style={{ position: 'absolute', left: '1.5rem', bottom: '6rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <Image
              src="/assets/logos/markhor-logo-gold.png"
              alt=""
              width={112}
              height={112}
              priority
              className="h-20 w-20 object-contain object-left drop-shadow-[0_0_20px_rgba(199,161,90,0.35)] sm:h-24 sm:w-24"
              aria-hidden="true"
            />
            <span className="text-[10px] uppercase tracking-[0.32em] text-[#F4F0E8]/85 font-sans">
              MARKHOR CLUB
            </span>
            <span className="text-[9px] uppercase tracking-[0.28em] text-[#D6B978] font-sans">
              KHANPUR DAM • KPK
            </span>
          </div>

          {/* Action Buttons Top Right: Sound & Skip */}
          <div className="absolute right-5 top-5 flex items-center gap-3 sm:right-10 sm:top-8 z-10">
            <button
              type="button"
              onClick={toggleSound}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#071116]/80 border border-[#D6B978]/50 text-[10px] font-medium uppercase tracking-widest text-[#F4F0E8] hover:border-[#D6B978] transition-all"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-amber-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#D6B978] animate-pulse" />}
              <span>{isMuted ? 'Tap for Sound' : 'Sound On'}</span>
            </button>

            <button
              type="button"
              onPointerDown={() => completeIntro(false)}
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                completeIntro(false)
              }}
              className="markhor-intro-skip inline-flex items-center gap-2 border-b border-[#D6B978]/65 px-1 pb-1.5 text-[10px] font-medium uppercase tracking-[0.26em] text-[#F4F0E8] transition-colors duration-300 hover:border-[#D6B978] hover:text-[#D6B978]"
              aria-label="Skip Markhor Club cinematic introduction"
            >
              <span>Skip intro</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>

          <div className="markhor-intro-progress absolute bottom-6 left-6 right-6 flex items-center gap-4 sm:left-10 sm:right-10 lg:left-16 lg:right-16" style={{ position: 'absolute', right: '1.5rem', bottom: '1.5rem', left: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div className="markhor-intro-progress-track h-px flex-1 overflow-hidden bg-[#F4F0E8]/20" aria-hidden="true">
              <div
                className="h-full origin-left bg-[#D6B978] transition-[width] duration-150 ease-linear"
                style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
              />
            </div>
            <span className="text-[9px] uppercase tracking-[0.24em] text-[#F4F0E8]/55 font-sans">
              INTRODUCTION
            </span>
          </div>
        </div>
      )}
    </CinematicIntroContext.Provider>
  )
}

