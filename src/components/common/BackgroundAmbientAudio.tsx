'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { Volume2, VolumeX, SlidersHorizontal } from 'lucide-react'
import { useCinematicIntro } from './CinematicIntro'

const AUDIO_SRC = '/assets/audio/background/markhor-ambient.mp3'
const DEFAULT_TARGET_VOLUME = 0.07
const DUCKED_VOLUME = 0.01

export function BackgroundAmbientAudio() {
  const pathname = usePathname()
  const isAdmin = pathname?.startsWith('/admin')
  const { introComplete } = useCinematicIntro()

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true)
  const [volume, setVolume] = useState<number>(DEFAULT_TARGET_VOLUME)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [isDucked, setIsDucked] = useState<boolean>(false)
  const [showSlider, setShowSlider] = useState<boolean>(false)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fadeAnimRef = useRef<number | null>(null)
  const isUnlockedRef = useRef<boolean>(false)
  const targetVolumeRef = useRef<number>(DEFAULT_TARGET_VOLUME)

  // Sync targetVolumeRef
  useEffect(() => {
    targetVolumeRef.current = volume
  }, [volume])

  // Initialize sound preference from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return
    const savedPref = localStorage.getItem('markhorAmbientSound')
    if (savedPref === 'off') {
      setSoundEnabled(false)
    } else {
      setSoundEnabled(true)
    }
  }, [])

  // Smooth Volume Ramping (requestAnimationFrame)
  const rampVolumeTo = useCallback((targetVol: number, durationMs: number = 2000, onComplete?: () => void) => {
    const audio = audioRef.current
    if (!audio) return

    if (fadeAnimRef.current !== null) {
      cancelAnimationFrame(fadeAnimRef.current)
      fadeAnimRef.current = null
    }

    const startVol = audio.volume
    const startTime = performance.now()

    const step = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(1, elapsed / durationMs)
      
      // Ease in-out quadratic
      const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2
      const currentVol = startVol + (targetVol - startVol) * eased

      audio.volume = Math.max(0, Math.min(1, currentVol))

      if (progress < 1) {
        fadeAnimRef.current = requestAnimationFrame(step)
      } else {
        fadeAnimRef.current = null
        if (onComplete) onComplete()
      }
    }

    fadeAnimRef.current = requestAnimationFrame(step)
  }, [])

  // Attempt to play audio with smooth fade-in
  const attemptPlay = useCallback(async () => {
    const audio = audioRef.current
    if (!audio || isAdmin) return

    if (audio.paused) {
      audio.volume = 0
      try {
        await audio.play()
        setIsPlaying(true)
        isUnlockedRef.current = true
        // Smooth fade-in from 0 to target volume over 2.5 seconds
        const finalVol = isDucked ? DUCKED_VOLUME : targetVolumeRef.current
        rampVolumeTo(finalVol, 2500)
      } catch (err) {
        // Autoplay blocked by browser policy — wait for first interaction
        setIsPlaying(false)
        console.log('[Markhor Ambient Audio] Autoplay restricted. Awaiting first visitor interaction.')
      }
    }
  }, [isAdmin, isDucked, rampVolumeTo])

  // First Interaction Autoplay Unlock Listener
  useEffect(() => {
    if (isAdmin || !introComplete || !soundEnabled || isUnlockedRef.current) return

    const handleFirstInteraction = () => {
      if (!isUnlockedRef.current) {
        attemptPlay()
      }
    }

    window.addEventListener('click', handleFirstInteraction, { once: true })
    window.addEventListener('touchstart', handleFirstInteraction, { once: true })
    window.addEventListener('keydown', handleFirstInteraction, { once: true })
    window.addEventListener('scroll', handleFirstInteraction, { once: true })

    return () => {
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
      window.removeEventListener('scroll', handleFirstInteraction)
    }
  }, [isAdmin, introComplete, soundEnabled, attemptPlay])

  // Playback trigger when intro completes or preference changes
  useEffect(() => {
    if (isAdmin) return

    if (introComplete && soundEnabled) {
      attemptPlay()
    } else if (!soundEnabled && audioRef.current && !audioRef.current.paused) {
      // Fade out smoothly before pausing
      rampVolumeTo(0, 1000, () => {
        audioRef.current?.pause()
        setIsPlaying(false)
      })
    }
  }, [introComplete, soundEnabled, isAdmin, attemptPlay, rampVolumeTo])

  // Global Event Listeners for Voice Ducking & External Controls
  useEffect(() => {
    if (isAdmin) return

    const handleDuck = () => {
      setIsDucked(true)
      if (audioRef.current && !audioRef.current.paused && soundEnabled) {
        rampVolumeTo(DUCKED_VOLUME, 600)
      }
    }

    const handleRestore = () => {
      setIsDucked(false)
      if (audioRef.current && !audioRef.current.paused && soundEnabled) {
        rampVolumeTo(targetVolumeRef.current, 1200)
      }
    }

    const handlePause = () => {
      if (audioRef.current && !audioRef.current.paused) {
        rampVolumeTo(0, 500, () => {
          audioRef.current?.pause()
          setIsPlaying(false)
        })
      }
    }

    const handleResume = () => {
      if (soundEnabled && introComplete) {
        attemptPlay()
      }
    }

    window.addEventListener('markhor:duck-ambient', handleDuck)
    window.addEventListener('markhor:restore-ambient', handleRestore)
    window.addEventListener('markhor:pause-ambient', handlePause)
    window.addEventListener('markhor:resume-ambient', handleResume)

    return () => {
      window.removeEventListener('markhor:duck-ambient', handleDuck)
      window.removeEventListener('markhor:restore-ambient', handleRestore)
      window.removeEventListener('markhor:pause-ambient', handlePause)
      window.removeEventListener('markhor:resume-ambient', handleResume)
    }
  }, [isAdmin, soundEnabled, introComplete, rampVolumeTo, attemptPlay])

  // Page Visibility Handler
  useEffect(() => {
    if (isAdmin) return

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (audioRef.current && !audioRef.current.paused) {
          audioRef.current.pause()
          setIsPlaying(false)
        }
      } else if (document.visibilityState === 'visible' && soundEnabled && introComplete) {
        attemptPlay()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [isAdmin, soundEnabled, introComplete, attemptPlay])

  // Toggle Sound ON / OFF
  const toggleSound = () => {
    const nextState = !soundEnabled
    setSoundEnabled(nextState)
    if (typeof window !== 'undefined') {
      localStorage.setItem('markhorAmbientSound', nextState ? 'on' : 'off')
    }
  }

  // Volume Slider Handler
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value)
    setVolume(val)
    if (audioRef.current && soundEnabled && !audioRef.current.paused) {
      audioRef.current.volume = isDucked ? DUCKED_VOLUME : val
    }
  }

  // Do not render anything on Admin routes
  if (isAdmin) {
    return null
  }

  return (
    <>
      {/* HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={AUDIO_SRC}
        preload="metadata"
        loop
        style={{ display: 'none' }}
      />

      {/* Floating Discreet Ambient Sound Control (Fixed at bottom-right next to WhatsApp / Header) */}
      <div className="fixed top-24 right-6 z-40 flex items-center gap-2">
        <div
          onMouseEnter={() => setShowSlider(true)}
          onMouseLeave={() => setShowSlider(false)}
          className="relative flex items-center bg-[#071116]/90 border border-[#C7A15A]/30 rounded-full px-3 py-2 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-[#C7A15A] group"
        >
          {/* Sound Toggle Button */}
          <button
            type="button"
            onClick={toggleSound}
            aria-label={soundEnabled ? 'Mute ambient background music' : 'Unmute ambient background music'}
            className="flex items-center gap-2 text-xs font-serif tracking-wide text-[#F4F0E8] focus:outline-none"
          >
            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-[#C7A15A]/20 text-[#C7A15A] group-hover:bg-[#C7A15A] group-hover:text-[#071116] transition-colors duration-300">
              {soundEnabled ? (
                <Volume2 className={`w-3.5 h-3.5 ${isPlaying && !isDucked ? 'animate-pulse' : ''}`} />
              ) : (
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
              )}
            </div>
            <span className="hidden md:inline text-[10px] uppercase tracking-widest text-[#D6B978]">
              {soundEnabled ? (isDucked ? 'Sound Ducked' : 'Ambient On') : 'Sound Muted'}
            </span>
          </button>

          {/* Mini Volume Slider on Hover */}
          {showSlider && soundEnabled && (
            <div className="ml-2 flex items-center gap-2 px-2 py-1 bg-[#0B1C26] border border-[#C7A15A]/30 rounded-full animate-in fade-in duration-200">
              <input
                type="range"
                min="0"
                max="0.12"
                step="0.005"
                value={volume}
                onChange={handleVolumeChange}
                aria-label="Ambient volume slider"
                className="w-16 h-1 accent-[#C7A15A] bg-[#071116] rounded-lg cursor-pointer"
              />
              <span className="text-[9px] font-mono text-[#C7A15A]">
                {Math.round((volume / 0.12) * 100)}%
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
