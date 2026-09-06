"use client"

import React, { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useCinematicIntro } from './CinematicIntro'

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const { introActive } = useCinematicIntro()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)

    const ticker = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(ticker)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(ticker)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  useEffect(() => {
    const lenis = lenisRef.current
    if (!lenis) return

    if (introActive) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [introActive])

  return <>{children}</>
}
