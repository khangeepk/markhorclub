'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'

const INTRO_VIDEO_PATH = '/assets/video/markhor-intro.mp4'
const INTRO_POSTER_PATH = '/assets/video/markhor-intro-poster.jpg'

type IntroStatus = 'pending' | 'active' | 'exiting' | 'complete'

type CinematicIntroContextValue = {
  introComplete: boolean
  introActive: boolean
}

const CinematicIntroContext = createContext<CinematicIntroContextValue>({
  introComplete: true,
  introActive: false,
})

export function useCinematicIntro() {
  return useContext(CinematicIntroContext)
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export default function CinematicIntroProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [status, setStatus] = useState<IntroStatus>(isHome ? 'pending' : 'complete')
  const [introComplete, setIntroComplete] = useState(!isHome)
  const [progress, setProgress] = useState(0)
  const overlayRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const veilRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef(status)
  const originalBodyOverflowRef = useRef<string | null>(null)
  const fallbackTimerRef = useRef<number | null>(null)
  const playAttemptedRef = useRef(false)

  const useClientLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

  useClientLayoutEffect(() => {
    statusRef.current = status
  }, [status])

  const lockScroll = useCallback(() => {
    if (typeof document === 'undefined') return

    if (originalBodyOverflowRef.current === null) {
      originalBodyOverflowRef.current = document.body.style.overflow
    }

    document.documentElement.classList.add('markhor-intro-active')
    document.body.style.overflow = 'hidden'
  }, [])

  const unlockScroll = useCallback(() => {
    if (typeof document === 'undefined') return

    document.documentElement.classList.remove('markhor-intro-active')
    document.body.style.overflow = originalBodyOverflowRef.current ?? ''
    originalBodyOverflowRef.current = null
  }, [])

  const completeIntro = useCallback((immediate = false) => {
    if (statusRef.current === 'complete' || statusRef.current === 'exiting') return

    if (fallbackTimerRef.current !== null) {
      window.clearTimeout(fallbackTimerRef.current)
      fallbackTimerRef.current = null
    }

    statusRef.current = 'exiting'
    setStatus('exiting')
    setIntroComplete(true)

    const video = videoRef.current
    const overlay = overlayRef.current
    const veil = veilRef.current
    const brand = brandRef.current

    if (immediate) {
      gsap.killTweensOf([video, overlay, veil, brand].filter(Boolean))
      video?.pause()
      statusRef.current = 'complete'
      setStatus('complete')
      setIntroComplete(true)
      unlockScroll()
      return
    }

    if (!overlay || !veil || !brand) {
      statusRef.current = 'complete'
      setStatus('complete')
      unlockScroll()
      return
    }

    const timeline = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => {
        video?.pause()
        statusRef.current = 'complete'
        setStatus('complete')
        unlockScroll()
      },
    })

    if (video) {
      timeline.to(video, { scale: 1.02, opacity: 0.42, duration: 0.92 }, 0)
    }

    timeline
      .to(veil, { opacity: 0.34, duration: 0.82 }, 0.08)
      .to(brand, { opacity: 1, y: 0, duration: 0.5 }, 0.22)
      .to(overlay, { opacity: 0, duration: 0.72, ease: 'power2.inOut' }, 0.52)
  }, [unlockScroll])

  useClientLayoutEffect(() => {
    if (!isHome) {
      setStatus('complete')
      setIntroComplete(true)
      unlockScroll()
      return
    }

    if (prefersReducedMotion()) {
      setStatus('complete')
      setIntroComplete(true)
      return
    }

    statusRef.current = 'active'
    setStatus('active')
    lockScroll()

    return unlockScroll
  }, [isHome, lockScroll, unlockScroll])

  useEffect(() => {
    if (status !== 'active') return

    const video = videoRef.current
    if (!video) return

    playAttemptedRef.current = false
    let retryTimer: number | null = null

    const attemptPlayback = () => {
      if (video.readyState < 1 || playAttemptedRef.current || video.ended) return

      // Keep autoplay policy-compatible even if a browser drops the HTML
      // attributes while hydrating the media element.
      video.muted = true
      video.defaultMuted = true
      video.playsInline = true
      playAttemptedRef.current = true
      void video.play().catch(() => {
        // Retry once the browser has finished resolving the muted media
        // request instead of leaving the intro frozen at its poster frame.
        playAttemptedRef.current = false
        retryTimer = window.setTimeout(attemptPlayback, 250)
      })
    }

    const timeout = window.setTimeout(completeIntro, 7000)
    fallbackTimerRef.current = timeout
    video.addEventListener('loadedmetadata', attemptPlayback)
    video.addEventListener('canplay', attemptPlayback)
    video.addEventListener('loadeddata', attemptPlayback)
    attemptPlayback()

    return () => {
      window.clearTimeout(timeout)
      if (retryTimer !== null) window.clearTimeout(retryTimer)
      fallbackTimerRef.current = null
      video.removeEventListener('loadedmetadata', attemptPlayback)
      video.removeEventListener('canplay', attemptPlayback)
      video.removeEventListener('loadeddata', attemptPlayback)
    }
  }, [status, completeIntro])

  useEffect(() => {
    return () => unlockScroll()
  }, [unlockScroll])

  const contextValue = {
    introComplete,
    introActive: status === 'active' || status === 'exiting',
  }

  return (
    <CinematicIntroContext.Provider value={contextValue}>
      {children}

      {isHome && status !== 'complete' && (
        <div
          ref={overlayRef}
          className="markhor-intro fixed inset-0 z-[2000] overflow-hidden bg-[#071116] text-[#F4F0E8] select-none"
          style={{ position: 'fixed', inset: 0, zIndex: 2000, overflow: 'hidden' }}
          data-intro-status={status}
          data-intro-complete={introComplete ? 'true' : 'false'}
          aria-label="Markhor Club cinematic introduction"
        >
          <video
            ref={videoRef}
            className="markhor-intro-video absolute inset-0 h-full w-full object-cover"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', maxWidth: 'none', objectFit: 'cover' }}
            src={INTRO_VIDEO_PATH}
            poster={INTRO_POSTER_PATH}
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onTimeUpdate={(event) => {
              const currentVideo = event.currentTarget
              if (currentVideo.duration) {
                setProgress(currentVideo.currentTime / currentVideo.duration)
              }
            }}
            onEnded={() => completeIntro()}
            onError={() => completeIntro(true)}
          />

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

          <button
            type="button"
            onPointerDown={() => completeIntro(true)}
            onClick={(event) => {
              event.preventDefault()
              completeIntro(true)
            }}
            className="markhor-intro-skip absolute right-5 top-5 inline-flex min-h-11 items-center gap-2 border-b border-[#D6B978]/65 px-1 pb-2 text-[10px] font-medium uppercase tracking-[0.26em] text-[#F4F0E8] transition-colors duration-300 hover:border-[#D6B978] hover:text-[#D6B978] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B978] focus-visible:ring-offset-4 focus-visible:ring-offset-[#071116] sm:right-10 sm:top-8"
            style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', minHeight: '2.75rem' }}
            aria-label="Skip Markhor Club cinematic introduction"
          >
            <span>Skip intro</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>

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
