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
const INTRO_POSTER_PRIMARY = '/assets/images/Dam View.png'

export type IntroStatus = 'loading' | 'playing' | 'exiting' | 'complete'

type CinematicIntroContextValue = {
  introComplete: boolean
  introActive: boolean
  status: IntroStatus
  replayIntro: () => void
}

const CinematicIntroContext = createContext<CinematicIntroContextValue>({
  introComplete: true,
  introActive: false,
  status: 'complete',
  replayIntro: () => {},
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
  const brandRef = useRef<HTMLDivElement>(null)

  const statusRef = useRef<IntroStatus>('loading')
  const isExitingRef = useRef<boolean>(false)
  const originalBodyOverflowRef = useRef<string | null>(null)
  const originalHtmlOverflowRef = useRef<string | null>(null)
  const originalTouchActionRef = useRef<string | null>(null)
  const originalOverscrollRef = useRef<string | null>(null)
  const fallbackTimerRef = useRef<number | null>(null)
  const gsapTweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    statusRef.current = status
  }, [status])

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

  const completeIntro = useCallback(
    (immediate = false) => {
      if (statusRef.current === 'complete' || isExitingRef.current) return
      isExitingRef.current = true

      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current)
        fallbackTimerRef.current = null
      }

      if (typeof window !== 'undefined') {
        try {
          sessionStorage.setItem('markhor_intro_seen', 'true')
        } catch {
          // Ignore storage quota errors
        }
      }

      unlockScroll()
      setIntroComplete(true)

      const video = videoRef.current
      const overlay = overlayRef.current

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

      // Smooth luxury cross-dissolve (1.0s duration)
      overlay.style.pointerEvents = 'none'
      statusRef.current = 'exiting'
      setStatus('exiting')

      gsapTweenRef.current = gsap.to(overlay, {
        opacity: 0,
        scale: 1.04,
        duration: 1.1,
        ease: 'power2.inOut',
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

  useEffect(() => {
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

    statusRef.current = 'playing'
    setStatus('playing')
    lockScroll()

    const safetyTimer = window.setTimeout(() => {
      completeIntro(false)
    }, 22000)
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

  useEffect(() => {
    if (status !== 'playing') return

    const video = videoRef.current
    if (!video) return

    video.muted = isMuted
    const playPromise = video.play()
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true
        setIsMuted(true)
        video.play().catch(() => completeIntro(false))
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
    const video = videoRef.current
    if (video && video.muted) {
      video.muted = false
      setIsMuted(false)
    }
  }

  const handleLoadedMetadata = () => {
    const video = videoRef.current
    if (video && video.duration) {
      if (fallbackTimerRef.current !== null) {
        window.clearTimeout(fallbackTimerRef.current)
      }
      const durationMs = Math.ceil((video.duration + 2) * 1000)
      fallbackTimerRef.current = window.setTimeout(() => {
        completeIntro(false)
      }, durationMs)
    }
  }

  const replayIntro = useCallback(() => {
    isExitingRef.current = false
    setIntroComplete(false)
    setStatus('playing')
    statusRef.current = 'playing'
    setIsMuted(false)
    lockScroll()

    if (videoRef.current) {
      videoRef.current.currentTime = 0
      videoRef.current.muted = false
      videoRef.current.play().catch(() => {
        if (videoRef.current) {
          videoRef.current.muted = true
          setIsMuted(true)
          videoRef.current.play().catch(() => completeIntro(false))
        }
      })
    }
  }, [lockScroll, completeIntro])

  const contextValue = {
    introComplete,
    introActive: status === 'playing' || status === 'loading' || status === 'exiting',
    status,
    replayIntro,
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
          className={`markhor-intro fixed inset-0 z-[2000] overflow-hidden bg-[#04090C] text-[#F4F0E8] select-none cursor-pointer ${
            status === 'exiting' ? 'pointer-events-none' : ''
          }`}
          style={{ position: 'fixed', inset: 0, zIndex: 2000, overflow: 'hidden' }}
          data-intro-status={status}
          data-intro-complete={introComplete ? 'true' : 'false'}
          aria-label="Markhor Club cinematic introduction"
        >
          <video
            ref={videoRef}
            className="markhor-intro-video absolute inset-0 h-full w-full object-cover object-center scale-[1.02]"
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
            onError={() => completeIntro(false)}
          >
            <source src={INTRO_VIDEO_PRIMARY} type="video/mp4" />
          </video>

          {/* Deep Cinematic Black Levels & Directional Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#04090C] via-[#071116]/40 to-[#04090C]/60 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,#04090C_100%)] pointer-events-none" />

          {/* Bottom Left Luxury Brand Watermark */}
          <div
            ref={brandRef}
            className="absolute bottom-20 left-6 sm:bottom-24 sm:left-12 lg:left-16 flex flex-col gap-2 z-10"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/assets/logos/markhor-logo-gold.png"
                alt="Markhor Club Logo"
                width={120}
                height={120}
                priority
                className="h-16 w-auto object-contain drop-shadow-[0_0_25px_rgba(199,161,90,0.4)] sm:h-20"
                aria-hidden="true"
              />
              <div className="h-10 w-[1px] bg-[#C7A15A]/40" />
              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-[0.32em] text-[#F4F0E8]">
                  MARKHOR CLUB
                </span>
                <span className="block text-[9px] uppercase tracking-[0.26em] text-[#D6B978] font-sans">
                  KHANPUR DAM &bull; KPK &bull; PAKISTAN
                </span>
              </div>
            </div>
          </div>

          {/* Center Sound Prompt Pill when muted */}
          {isMuted && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
              <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-[#04090C]/85 border border-[#D6B978]/60 shadow-[0_0_35px_rgba(214,185,120,0.25)] backdrop-blur-md animate-pulse">
                <Volume2 className="w-4 h-4 text-[#D6B978]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#F4F0E8]">
                  TAP ANYWHERE FOR FULL AUDIO EXPERIENCE
                </span>
              </div>
            </div>
          )}

          {/* Top Right Controls: Sound & Skip */}
          <div className="absolute right-6 top-6 sm:right-12 sm:top-10 flex items-center gap-4 z-20">
            <button
              type="button"
              onClick={toggleSound}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#04090C]/80 border border-[#D6B978]/40 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F4F0E8] hover:border-[#D6B978] hover:text-[#D6B978] transition-all backdrop-blur-md"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-amber-400" /> : <Volume2 className="w-3.5 h-3.5 text-[#D6B978] animate-pulse" />}
              <span>{isMuted ? 'Muted' : 'Sound On'}</span>
            </button>

            <button
              type="button"
              onPointerDown={() => completeIntro(false)}
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                completeIntro(false)
              }}
              className="group inline-flex items-center gap-2 border-b border-[#D6B978]/60 pb-1 text-[10px] font-semibold uppercase tracking-[0.26em] text-[#F4F0E8] transition-all duration-300 hover:border-[#D6B978] hover:text-[#D6B978]"
              aria-label="Skip Markhor Club intro film"
            >
              <span>Skip Film</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </button>
          </div>

          {/* Bottom Progress Bar */}
          <div className="absolute bottom-6 left-6 right-6 sm:left-12 sm:right-12 lg:left-16 lg:right-16 flex items-center gap-4 z-10">
            <div className="h-[1px] flex-1 overflow-hidden bg-[#F4F0E8]/15" aria-hidden="true">
              <div
                className="h-full origin-left bg-[#D6B978] transition-[width] duration-150 ease-linear"
                style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
              />
            </div>
            <span className="text-[9px] uppercase tracking-[0.26em] text-[#9A9389] font-sans">
              FILM CHAPTER 01
            </span>
          </div>
        </div>
      )}
    </CinematicIntroContext.Provider>
  )
}
