'use client'

import React, { useLayoutEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, FileText } from 'lucide-react'
import gsap from 'gsap'
import ConceptDisclaimer from '../ui/ConceptDisclaimer'
import ScrollIndicator from '../ui/ScrollIndicator'
import { useCinematicIntro } from '../common/CinematicIntro'

export default function Hero() {
  const { introComplete } = useCinematicIntro()
  const containerRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headlineLine1Ref = useRef<HTMLSpanElement>(null)
  const headlineLine2Ref = useRef<HTMLSpanElement>(null)
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const ctaGroupRef = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  const hasAnimatedRef = useRef(false)

  useLayoutEffect(() => {
    if (!introComplete || hasAnimatedRef.current) return

    hasAnimatedRef.current = true
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(
        [eyebrowRef.current, headlineLine1Ref.current, headlineLine2Ref.current, paragraphRef.current, ctaGroupRef.current, locationRef.current, footerRef.current],
        { clearProps: 'all' }
      )
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(
        eyebrowRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.2 }
      )

      tl.fromTo(
        [headlineLine1Ref.current, headlineLine2Ref.current],
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, stagger: 0.18, ease: 'power4.out' },
        '-=0.4'
      )

      tl.fromTo(
        paragraphRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.5'
      )

      tl.fromTo(
        ctaGroupRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        '-=0.4'
      )

      tl.fromTo(
        locationRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.3'
      )

      tl.fromTo(
        footerRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.2'
      )
    }, containerRef)

    return () => ctx.revert()
  }, [introComplete])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-[100svh] min-h-[650px] flex flex-col justify-between overflow-hidden bg-[#071116] text-[#F4F0E8] select-none"
      style={{ visibility: introComplete ? 'visible' : 'hidden' }}
    >
      {/* Background Destination Media Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* High-res Khanpur Dam Mountain Lake Image Backdrop */}
        <Image
          src="/assets/images/Dam View.png"
          alt="Markhor Club Khanpur Dam Panorama"
          fill
          sizes="100vw"
          priority
          quality={95}
          className="object-cover object-center scale-[1.02]"
        />

        {/* Directional Luxury Gradient Overlay: Rich Left Contrast for Text Legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#071116]/95 via-[#071116]/70 to-transparent w-full md:w-4/5 lg:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071116] via-transparent to-[#071116]/60" />
      </div>

      {/* Top Space for Header Handoff */}
      <div className="h-24 md:h-28 w-full shrink-0 z-10" aria-hidden="true" />

      {/* Main Editorial Content Container */}
      <div className="relative z-10 my-auto w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-center text-left">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="flex items-center gap-3 mb-5">
            <span className="w-8 h-[1px] bg-[#C7A15A]" aria-hidden="true" />
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D6B978] font-sans">
              MARKHOR CLUB &bull; KHANPUR DAM &bull; KPK
            </span>
          </div>

          {/* Masked Line-by-Line Editorial Headline */}
          <h1 className="text-display-xl font-serif text-[#F4F0E8] font-normal leading-[1.06] tracking-tight mb-6">
            <span className="block overflow-hidden py-1">
              <span ref={headlineLine1Ref} className="block">
                A HIGHER STANDARD
              </span>
            </span>
            <span className="block overflow-hidden py-1 text-gold-gradient font-medium">
              <span ref={headlineLine2Ref} className="block">
                OF BELONGING
              </span>
            </span>
          </h1>

          {/* Supporting Text */}
          <p
            ref={paragraphRef}
            className="text-base sm:text-lg md:text-xl text-[#9A9389] font-sans font-light leading-relaxed mb-8 max-w-xl"
          >
            A destination where extraordinary days meet the landscape of Khanpur Dam — shaped by nature, leisure, wellness and adventure.
          </p>

          {/* CTA Buttons */}
          <div
            ref={ctaGroupRef}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8"
          >
            {/* Primary CTA */}
            <Link
              href="#amenities"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-sm bg-gradient-to-r from-[#C7A15A] to-[#D6B978] text-[#071116] font-sans font-semibold text-xs tracking-[0.18em] uppercase shadow-xl hover:shadow-[#C7A15A]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A15A]"
            >
              <span>EXPLORE MEMBERSHIP</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Secondary CTA */}
            <Link
              href="#contact"
              className="group inline-flex items-center justify-center gap-3 px-7 py-4 rounded-sm border border-[#C7A15A]/60 text-[#F4F0E8] bg-transparent hover:bg-[#C7A15A]/10 hover:border-[#C7A15A] hover:text-[#D6B978] transition-all duration-300 min-h-[48px] font-sans font-semibold text-xs tracking-[0.15em] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A15A]"
            >
              <FileText className="w-4 h-4 text-[#C7A15A]" />
              <span>WATCH OUR STORY</span>
            </Link>
          </div>

          {/* Location Microcopy */}
          <div
            ref={locationRef}
            className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#9A9389] font-sans"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C7A15A]" aria-hidden="true" />
            <span>Khanpur Dam &bull; Khyber Pakhtunkhwa, Pakistan</span>
          </div>
        </div>
      </div>

      {/* Hero Bottom Footer Row */}
      <div
        ref={footerRef}
        className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 pb-6 pt-2 flex items-end justify-between border-t border-[#F4F0E8]/10"
      >
        <ConceptDisclaimer label="Artist's Impression" />

        {/* Scroll Handoff Cue */}
        <div className="mx-auto flex flex-col items-center">
          <ScrollIndicator />
        </div>

        <div className="hidden lg:block text-right text-[11px] uppercase tracking-[0.25em] text-[#9A9389] font-sans">
          Markhor Group Pvt. Ltd.
        </div>
      </div>
    </section>
  )
}
