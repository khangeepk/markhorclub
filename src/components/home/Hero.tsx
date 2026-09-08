'use client'

import React, { useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play, MapPin, Compass } from 'lucide-react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import ConceptDisclaimer from '../ui/ConceptDisclaimer'
import ScrollIndicator from '../ui/ScrollIndicator'
import LuxuryButton from '../ui/LuxuryButton'
import { useCinematicIntro } from '../common/CinematicIntro'

export default function Hero() {
  const { introComplete, replayIntro } = useCinematicIntro()
  const [showHero, setShowHero] = React.useState(introComplete)
  const containerRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headlineLine1Ref = useRef<HTMLSpanElement>(null)
  const headlineLine2Ref = useRef<HTMLSpanElement>(null)
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const ctaGroupRef = useRef<HTMLDivElement>(null)
  const metaStackRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  const hasAnimatedRef = useRef(false)

  React.useEffect(() => {
    if (introComplete) {
      setShowHero(true)
    } else {
      const timer = setTimeout(() => setShowHero(true), 4000)
      return () => clearTimeout(timer)
    }
  }, [introComplete])

  useLayoutEffect(() => {
    if (!introComplete || hasAnimatedRef.current) return
    hasAnimatedRef.current = true

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(
        [
          eyebrowRef.current,
          headlineLine1Ref.current,
          headlineLine2Ref.current,
          paragraphRef.current,
          ctaGroupRef.current,
          metaStackRef.current,
          footerRef.current,
        ],
        { clearProps: 'all' }
      )
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // 1. Entrance Reveal Animation
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        backdropRef.current,
        { scale: 1.08, opacity: 0.8 },
        { scale: 1.0, opacity: 1, duration: 1.6, ease: 'power2.out' }
      )

      tl.fromTo(
        eyebrowRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=1.2'
      )

      tl.fromTo(
        [headlineLine1Ref.current, headlineLine2Ref.current],
        { y: 45, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.16, ease: 'power4.out' },
        '-=0.6'
      )

      tl.fromTo(
        paragraphRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )

      tl.fromTo(
        ctaGroupRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.4'
      )

      tl.fromTo(
        metaStackRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.6'
      )

      tl.fromTo(
        footerRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      )

      // 2. Scroll Exit Parallax Animation (Hero -> Section 02 continuous handoff)
      if (containerRef.current) {
        gsap.to(backdropRef.current, {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })

        gsap.to([eyebrowRef.current, headlineLine1Ref.current, headlineLine2Ref.current, paragraphRef.current, ctaGroupRef.current], {
          yPercent: -20,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '80% top',
            scrub: true,
          },
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [introComplete])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-[100svh] min-h-[720px] max-h-[1100px] flex flex-col justify-between overflow-hidden bg-[#071116] text-[#F4F0E8] select-none"
      style={{ visibility: showHero || introComplete ? 'visible' : 'hidden' }}
    >
      {/* Background Destination Media Layer with Multi-Layered Vignette */}
      <div ref={backdropRef} className="absolute inset-0 z-0 pointer-events-none origin-center">
        <Image
          src="/assets/images/Dam View.png"
          alt="Markhor Club Khanpur Dam Panorama"
          fill
          sizes="100vw"
          priority
          quality={90}
          className="object-cover object-center scale-[1.02]"
        />

        {/* Directional Luxury Gradient Overlay: Left Architectural Depth & Right Water Vista Visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071116]/95 via-[#071116]/65 to-transparent w-full lg:w-4/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071116] via-transparent to-[#071116]/65" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#164E63]/15 rounded-full blur-[140px]" />
      </div>

      {/* Top Header Handoff Spacer */}
      <div className="h-24 md:h-28 w-full shrink-0 z-10" aria-hidden="true" />

      {/* Main Asymmetric Editorial Content Grid */}
      <div className="relative z-10 my-auto w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headline, Paragraph, Actions */}
          <div className="lg:col-span-8 flex flex-col text-left">
            {/* Chapter Eyebrow */}
            <div ref={eyebrowRef} className="flex items-center gap-3 mb-4">
              <span className="w-8 h-[1px] bg-[#C7A15A]" aria-hidden="true" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.26em] font-semibold text-[#D6B978] font-sans">
                01 &bull; SIGNATURE DESTINATION &bull; KHANPUR DAM
              </span>
            </div>

            {/* Editorial Line-by-Line Headline */}
            <h1 className="text-display-xl font-serif text-[#F4F0E8] font-normal leading-[1.04] tracking-tight mb-6">
              <span className="block overflow-hidden py-1">
                <span ref={headlineLine1Ref} className="block">
                  A HIGHER STANDARD
                </span>
              </span>
              <span className="block overflow-hidden py-1 text-gold-gradient italic font-light">
                <span ref={headlineLine2Ref} className="block">
                  OF BELONGING.
                </span>
              </span>
            </h1>

            {/* Editorial Paragraph with Left Champagne Hairline Accent */}
            <div ref={paragraphRef} className="mb-8 max-w-xl">
              <p className="font-serif text-lg sm:text-xl text-[#D9E4EB] border-l border-[#C7A15A]/40 pl-5 py-1 leading-relaxed font-light">
                A 500-Kanal destination where extraordinary days meet the landscape of Khanpur Dam — shaped by nature, leisure, wellness and adventure.
              </p>
            </div>

            {/* Action Buttons */}
            <div
              ref={ctaGroupRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <LuxuryButton href="#membership" variant="primary">
                EXPLORE MEMBERSHIP
              </LuxuryButton>

              <button
                type="button"
                onClick={() => replayIntro()}
                className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-none sm:rounded-sm border border-[#D6B978]/50 text-[#F4F0E8] bg-transparent hover:bg-[#D6B978]/10 hover:border-[#D6B978] hover:text-[#D6B978] transition-all duration-300 min-h-[48px] font-sans font-semibold text-xs tracking-[0.16em] uppercase"
              >
                <Play className="w-3.5 h-3.5 text-[#D6B978] fill-[#D6B978]/20 transition-transform group-hover:scale-110" />
                <span>WATCH BRAND FILM</span>
              </button>
            </div>
          </div>

          {/* Right Column: Floating Architectural Metadata Stack (Desktop Only) */}
          <div ref={metaStackRef} className="hidden lg:block lg:col-span-4">
            <div className="glass-panel p-6 border border-[#C7A15A]/20 bg-[#0B1C26]/80 backdrop-blur-md space-y-5 rounded-none sm:rounded-sm shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#C7A15A]/20 pb-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D6B978]">
                  ESTATE SPECS
                </span>
                <Compass className="w-4 h-4 text-[#D6B978]" />
              </div>

              <div className="space-y-4">
                <div>
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.22em] text-[#C7A15A]">
                    ESTATE SCALE
                  </span>
                  <span className="font-serif text-2xl font-light text-[#F4F0E8]">
                    500 Kanal Master Plan
                  </span>
                </div>

                <div className="border-t border-[#F4F0E8]/10 pt-3">
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.22em] text-[#C7A15A]">
                    GEOGRAPHIC ORIENTATION
                  </span>
                  <span className="font-serif text-base font-light text-[#D9E4EB]">
                    Khanpur Dam View Facing
                  </span>
                </div>

                <div className="border-t border-[#F4F0E8]/10 pt-3">
                  <span className="block text-[9px] font-semibold uppercase tracking-[0.22em] text-[#C7A15A]">
                    CONNECTIVITY & ACCESS
                  </span>
                  <span className="text-xs text-[#9A9389] font-sans font-light block mt-0.5">
                    Approx. 2 KM from Alexander Road, KPK
                  </span>
                </div>
              </div>

              <div className="border-t border-[#C7A15A]/20 pt-4 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#D6B978]">
                <MapPin className="w-3.5 h-3.5 text-[#D6B978]" />
                <span>33.8078° N, 72.9348° E</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Bottom Footer Row */}
      <div
        ref={footerRef}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 pb-6 pt-3 flex items-end justify-between border-t border-[#F4F0E8]/10"
      >
        <ConceptDisclaimer label="Artist's Impression" />

        {/* Continuous Scroll Indicator */}
        <div className="mx-auto flex flex-col items-center">
          <ScrollIndicator />
        </div>

        <div className="hidden lg:block text-right text-[10px] uppercase tracking-[0.26em] text-[#9A9389] font-sans">
          Markhor Group Pvt. Ltd.
        </div>
      </div>
    </section>
  )
}
