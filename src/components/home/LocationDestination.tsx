'use client'

import React, { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Navigation, Compass } from 'lucide-react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Container from '../ui/Container'
import ConceptDisclaimer from '../ui/ConceptDisclaimer'
import SectionWrapper from '../ui/SectionWrapper'
import { SectionEyebrow, DisplayTitle, SectionDescription } from '../ui/Typography'
import LuxuryButton from '../ui/LuxuryButton'

const DESTINATION_PATH = [
  { num: '01', label: 'PAKISTAN', sub: 'Country' },
  { num: '02', label: 'KPK', sub: 'Province' },
  { num: '03', label: 'KHANPUR DAM', sub: 'Destination' },
  { num: '04', label: 'MARKHOR CLUB', sub: '500 Kanal Estate' },
]

const FACT_ITEMS = [
  {
    label: 'LOCATION',
    value: 'Near Alexander Road, Khanpur Dam, KPK',
    sub: 'Khyber Pakhtunkhwa, Pakistan',
  },
  {
    label: 'PROXIMITY',
    value: 'Approx. 2 KM from Alexander Road',
    sub: 'Near Khanpur Dam main access approach',
  },
  {
    label: 'ORIENTATION',
    value: 'Khanpur Dam View Facing',
    sub: 'Panoramic waterfront & mountain vistas',
  },
  {
    label: 'ESTATE SCALE',
    value: '500 Kanal Master Plan',
    sub: 'Integrated club & resort destination',
  },
]

export default function LocationDestination() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)
  const heroVisualRef = useRef<HTMLDivElement>(null)
  const textContentRef = useRef<HTMLDivElement>(null)
  const routePathRef = useRef<HTMLDivElement>(null)
  const factStackRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Desktop Controlled Pin / Parallax Scroll Story (Hold landscape while location text progresses)
      const isDesktop = window.innerWidth >= 1024

      if (isDesktop && pinContainerRef.current && heroVisualRef.current) {
        ScrollTrigger.create({
          trigger: pinContainerRef.current,
          start: 'top top+=80',
          end: 'bottom bottom',
          pin: heroVisualRef.current,
          pinSpacing: false,
        })
      }

      // Parallax scale on visual frame
      if (heroVisualRef.current) {
        gsap.fromTo(
          heroVisualRef.current.querySelector('img'),
          { scale: 1.08 },
          {
            scale: 1.0,
            ease: 'none',
            scrollTrigger: {
              trigger: heroVisualRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <SectionWrapper
      id="destination"
      bg="midnight"
      padding="lg"
      className="relative w-full border-t border-[#C7A15A]/15 select-none"
    >
      <div ref={sectionRef}>
        {/* Background Water Ambient Glow */}
        <div className="pointer-events-none absolute -top-40 right-0 h-[600px] w-[600px] bg-[#164E63]/15 rounded-full blur-[140px]" />

        <Container>
          {/* Header Section: Eyebrow + Display Headline */}
          <header className="relative mb-12 lg:mb-16">
            <SectionEyebrow number="03" accentLine={true}>
              THE DESTINATION &bull; KHANPUR DAM
            </SectionEyebrow>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <h2 className="text-display-lg font-serif text-[#F4F0E8] font-normal leading-[1.06] tracking-tight">
                  WHERE MOUNTAINS MEET<br />
                  <span className="italic font-light text-gold-gradient">THE WATER.</span>
                </h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-sm font-sans font-light text-[#9A9389] leading-relaxed border-l border-[#C7A15A]/40 pl-4">
                  Set near Alexander Road and directly facing Khanpur Dam, Markhor Club brings elevated hospitality into KPK&apos;s premier waterfront landscape.
                </p>
              </div>
            </div>
          </header>

          {/* Desktop Pin Container / Mobile Vertical Flow */}
          <div ref={pinContainerRef} className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16">
            {/* Left 7 Columns: Sticky Large Cinematic Destination Landscape */}
            <div ref={heroVisualRef} className="lg:col-span-7">
              <div className="relative w-full aspect-[16/10] lg:aspect-[21/9] min-h-[380px] sm:min-h-[480px] rounded-none sm:rounded-sm overflow-hidden border border-[#C7A15A]/25 shadow-2xl group">
                <Image
                  src="/assets/images/location-destination-visual.jpg"
                  alt="Khanpur Dam Panorama - Markhor Club Location"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  priority
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071116] via-[#071116]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#071116]/75 via-transparent to-transparent w-2/3" />

                <div className="absolute bottom-6 left-6 z-10">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D6B978] block mb-1">
                    DESTINATION PANORAMA
                  </span>
                  <span className="font-serif text-2xl font-light text-[#F4F0E8]">
                    Khanpur Dam, Khyber Pakhtunkhwa
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-10">
                  <ConceptDisclaimer label="Artist's Impression" />
                </div>
              </div>
            </div>

            {/* Right 5 Columns: Destination Narrative, Route Line & Access Cards */}
            <div ref={textContentRef} className="lg:col-span-5 space-y-8">
              {/* Linear Route Progression Line */}
              <div ref={routePathRef} className="glass-panel p-6 border border-[#C7A15A]/20 bg-[#0B1C26]/80 rounded-none sm:rounded-sm">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D6B978] block mb-4">
                  DESTINATION ROUTE PATH
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative">
                  {DESTINATION_PATH.map((step, idx) => (
                    <div key={step.label} className="flex flex-col relative z-10">
                      <span className="text-[10px] font-mono text-[#C7A15A]">{step.num}</span>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#F4F0E8] font-sans mt-0.5">
                        {step.label}
                      </span>
                      <span className="text-[9px] text-[#9A9389] font-sans">
                        {step.sub}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3 Architectural Proximity & Access Cards */}
              <div className="space-y-4">
                <div className="glass-panel p-6 border border-[#C7A15A]/20 rounded-none sm:rounded-sm hover:border-[#C7A15A]/40 transition-all">
                  <div className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C7A15A] mb-2">
                    <Navigation className="w-3.5 h-3.5 text-[#C7A15A]" />
                    <span>ACCESS PROXIMITY</span>
                  </div>
                  <div className="font-serif text-3xl font-normal text-gold-gradient tracking-tight">
                    APPROX. 2 KM
                  </div>
                  <span className="text-xs uppercase tracking-[0.18em] font-semibold text-[#F4F0E8] block mt-1">
                    FROM ALEXANDER ROAD
                  </span>
                  <p className="text-xs text-[#9A9389] font-sans font-light mt-1">
                    Direct access via the Alexander Road approach to Khanpur Dam
                  </p>
                </div>

                <div className="glass-panel p-6 border border-[#C7A15A]/20 rounded-none sm:rounded-sm hover:border-[#C7A15A]/40 transition-all">
                  <div className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C7A15A] mb-2">
                    <MapPin className="w-3.5 h-3.5 text-[#C7A15A]" />
                    <span>GEOGRAPHIC ORIENTATION</span>
                  </div>
                  <div className="font-serif text-2xl font-normal text-[#F4F0E8] tracking-tight">
                    KHANPUR DAM VIEW FACING
                  </div>
                  <p className="text-xs text-[#9A9389] font-sans font-light mt-1">
                    Uninterrupted waterfront vistas across the reservoir & mountain ridgelines
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Destination Data Stack & Topographic Contour Badge */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-14 pt-8 border-t border-[#C7A15A]/15">
            {/* Fact Stack */}
            <div ref={factStackRef} className="lg:col-span-7 space-y-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#C7A15A] block mb-4">
                VERIFIED SPECIFICATIONS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FACT_ITEMS.map((item) => (
                  <div key={item.label} className="border-l border-[#C7A15A]/30 pl-4 py-2 bg-[#0B1C26]/40">
                    <span className="text-[9px] font-mono text-[#D6B978] uppercase tracking-wider block">
                      {item.label}
                    </span>
                    <span className="text-sm font-sans font-medium text-[#F4F0E8] block mt-0.5">
                      {item.value}
                    </span>
                    <span className="text-xs text-[#9A9389] font-sans font-light block mt-0.5">
                      {item.sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Topographic Overview Badge */}
            <div className="lg:col-span-5">
              <div className="glass-panel p-8 border border-[#C7A15A]/25 flex flex-col items-center justify-center text-center relative overflow-hidden rounded-none sm:rounded-sm">
                <svg
                  className="absolute inset-0 w-full h-full opacity-15 text-[#C7A15A]"
                  viewBox="0 0 400 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M-50 150 C50 80, 150 220, 250 100 C350 0, 450 180, 550 120" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M-50 190 C50 120, 150 260, 250 140 C350 40, 450 220, 550 160" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                </svg>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#071116] border border-[#D6B978] flex items-center justify-center mb-4 shadow-lg shadow-[#D6B978]/15">
                    <Compass className="w-5 h-5 text-[#D6B978]" />
                  </div>
                  <span className="font-serif text-xl font-normal text-[#F4F0E8]">
                    MARKHOR CLUB ESTATE
                  </span>
                  <span className="text-[10px] text-[#D6B978] uppercase tracking-[0.22em] font-sans mt-1">
                    NEAR ALEXANDER ROAD &bull; KHANPUR DAM
                  </span>
                  <div className="mt-4">
                    <ConceptDisclaimer label="Topographic Geographic Overview" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Exit CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-[#C7A15A]/15">
            <LuxuryButton href="#contact" variant="primary">
              EXPLORE THE LOCATION
            </LuxuryButton>

            <span className="text-[10px] uppercase tracking-[0.24em] text-[#9A9389] font-sans text-center sm:text-right">
              A DESTINATION DESIGNED TO BE EXPERIENCED.
            </span>
          </div>
        </Container>
      </div>
    </SectionWrapper>
  )
}
