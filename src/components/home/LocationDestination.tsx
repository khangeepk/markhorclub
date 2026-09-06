"use client"

import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Navigation } from 'lucide-react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Container from '../ui/Container'
import ConceptDisclaimer from '../ui/ConceptDisclaimer'

const DESTINATION_PATH = ['PAKISTAN', 'KPK', 'KHANPUR DAM', 'MARKHOR CLUB']

const FACT_ITEMS = [
  {
    label: 'LOCATION',
    value: 'Near Alexander Road, Khanpur Dam, KPK',
    sub: 'Pakistan',
  },
  {
    label: 'ACCESS',
    value: 'Approx. 2 KM from Alexander Road',
    sub: 'Near the Khanpur Dam approach',
  },
  {
    label: 'OUTLOOK',
    value: 'Khanpur Dam View Facing',
    sub: 'Panoramic mountain & water vistas',
  },
  {
    label: 'SCALE',
    value: '500 Kanal Destination',
    sub: 'Master-planned estate',
  },
]

export default function LocationDestination() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const heroVisualRef = useRef<HTMLDivElement>(null)
  const eyebrowRef = useRef<HTMLDivElement>(null)
  const headlineLine1Ref = useRef<HTMLSpanElement>(null)
  const headlineLine2Ref = useRef<HTMLSpanElement>(null)
  const pathRef = useRef<HTMLDivElement>(null)
  const accessCardRef = useRef<HTMLDivElement>(null)
  const factStackRef = useRef<HTMLDivElement>(null)
  const graphicRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP ScrollTrigger timeline temporarily disabled for Layer 1 static layout QA
    return () => {}
  }, [])

  return (
    <section
      ref={sectionRef}
      id="destination"
      className="section-space-compact relative w-full bg-[#071116] text-[#F4F0E8] overflow-hidden select-none"
    >
      {/* Background Water Ambient Vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-[#164E63]/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Cinematic Full-Bleed Destination Header */}
      <Container>
        <div
          ref={heroVisualRef}
          className="relative w-full aspect-[16/9] lg:aspect-[21/9] min-h-[360px] md:min-h-[460px] rounded-sm overflow-hidden border border-[#C7A15A]/25 shadow-2xl mb-12 group"
        >
          <Image
            src="/assets/images/location-destination-visual.jpg"
            alt="Khanpur Dam Panorama - Markhor Club Location"
            fill
            sizes="(max-width: 1200px) 100vw, 1400px"
            priority
            className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
          />
          {/* Deep Navy/Black Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#071116] via-[#071116]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071116]/80 via-transparent to-transparent w-3/4" />

          {/* Overlay Headline & Eyebrow */}
          <div className="absolute bottom-8 left-6 sm:bottom-12 sm:left-12 max-w-2xl z-10">
            <div ref={eyebrowRef} className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] font-semibold text-[#D6B978] mb-3 font-sans">
              <span className="w-6 h-[1px] bg-[#C7A15A]" aria-hidden="true" />
              <span>THE DESTINATION</span>
            </div>

            <h2 className="text-display-lg font-serif text-[#F4F0E8] font-normal tracking-tight leading-[1.08] mb-4">
              <span className="block overflow-hidden py-1">
                <span ref={headlineLine1Ref} className="block">
                  WHERE THE MOUNTAINS
                </span>
              </span>
              <span className="block overflow-hidden py-1 text-gold-gradient">
                <span ref={headlineLine2Ref} className="block">
                  MEET THE WATER.
                </span>
              </span>
            </h2>
          </div>

          <div className="absolute top-6 right-6 z-10">
            <ConceptDisclaimer label="Artist's Impression" />
          </div>
        </div>

        {/* Supporting Copy & Destination Path Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12 border-b border-[#C7A15A]/15 pb-8">
          <div className="lg:col-span-7 space-y-4">
            <p className="text-lg md:text-xl text-[#F4F0E8] font-sans font-light leading-relaxed">
              Set near Alexander Road and facing the landscape of Khanpur Dam, Markhor Club brings a considered club experience into one of KPK&apos;s most distinctive natural settings.
            </p>
            <p className="text-sm md:text-base text-[#9A9389] font-sans font-light leading-relaxed">
              A destination shaped by water, mountains, open space and a 500 Kanal vision for elevated club living.
            </p>
          </div>

          {/* Linear Destination Path */}
          <div ref={pathRef} className="lg:col-span-5 flex items-center justify-between gap-2 overflow-x-auto pb-2 sm:pb-0">
            {DESTINATION_PATH.map((step, idx) => (
              <React.Fragment key={step}>
                <div className="path-step flex flex-col items-center text-center shrink-0">
                  <span className="text-[10px] font-mono text-[#C7A15A] mb-1">
                    0{idx + 1}
                  </span>
                  <span className="text-xs uppercase tracking-widest font-semibold text-[#F4F0E8] font-sans">
                    {step}
                  </span>
                </div>
                {idx < DESTINATION_PATH.length - 1 && (
                  <div className="path-step flex items-center shrink-0 text-[#C7A15A]/60">
                    <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-[#C7A15A]/40 to-[#C7A15A]" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Verified Proximity & View Cards */}
        <div ref={accessCardRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {/* Card 1: 2 KM Proximity */}
          <div className="glass-panel p-8 rounded-sm border border-[#C7A15A]/20 hover:border-[#C7A15A]/40 transition-all duration-300">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#C7A15A] mb-4">
              <Navigation className="w-4 h-4 text-[#C7A15A]" />
              <span>ACCESS CUE</span>
            </div>
            <div className="text-4xl lg:text-5xl font-serif text-gold-gradient font-normal tracking-tight mb-2">
              APPROX. 2 KM
            </div>
            <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#F4F0E8] mb-1">
              FROM ALEXANDER ROAD
            </p>
            <p className="text-xs text-[#9A9389] font-sans font-light">
              Verified access proximity near Khanpur Dam approach
            </p>
          </div>

          {/* Card 2: Khanpur Dam View Facing */}
          <div className="glass-panel p-8 rounded-sm border border-[#C7A15A]/20 hover:border-[#C7A15A]/40 transition-all duration-300">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#C7A15A] mb-4">
              <MapPin className="w-4 h-4 text-[#C7A15A]" />
              <span>ORIENTATION</span>
            </div>
            <div className="text-3xl lg:text-4xl font-serif text-gold-gradient font-normal tracking-tight mb-2">
              KHANPUR DAM
            </div>
            <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#F4F0E8] mb-1">
              VIEW FACING
            </p>
            <p className="text-xs text-[#9A9389] font-sans font-light">
              Panoramic waterfront perspectives over Khanpur Dam
            </p>
          </div>

          {/* Card 3: 500 Kanal Context */}
          <div className="glass-panel p-8 rounded-sm border border-[#C7A15A]/20 hover:border-[#C7A15A]/40 transition-all duration-300">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-semibold text-[#C7A15A] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#C7A15A]" />
              <span>DESTINATION SCALE</span>
            </div>
            <div className="text-4xl lg:text-5xl font-serif text-gold-gradient font-normal tracking-tight mb-2">
              500 KANAL
            </div>
            <p className="text-xs uppercase tracking-[0.18em] font-semibold text-[#F4F0E8] mb-1">
              MASTER ESTATE
            </p>
            <p className="text-xs text-[#9A9389] font-sans font-light">
              Expansive mountain & water lifestyle destination
            </p>
          </div>
        </div>

        {/* Editorial Fact Stack & Abstract Graphic Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-12">
          {/* Fact Stack */}
          <div ref={factStackRef} className="lg:col-span-6 space-y-6">
            <div className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C7A15A] mb-6">
              DESTINATION DATA
            </div>
            {FACT_ITEMS.map((item) => (
              <div
                key={item.label}
                className="location-fact-node flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#F4F0E8]/10 pb-4 gap-2"
              >
                <span className="text-xs font-mono text-[#D6B978] uppercase tracking-wider min-w-[100px]">
                  {item.label}
                </span>
                <div className="text-right sm:text-left">
                  <span className="text-sm font-sans font-medium text-[#F4F0E8] block">
                    {item.value}
                  </span>
                  <span className="text-xs text-[#9A9389] font-sans block">
                    {item.sub}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Abstract SVG Graphic & Destination Marker */}
          <div ref={graphicRef} className="lg:col-span-6">
            <div className="relative glass-panel p-8 sm:p-10 rounded-sm border border-[#C7A15A]/25 flex flex-col items-center justify-center text-center min-h-[320px] overflow-hidden">
              {/* Abstract Topographic Contour Background */}
              <svg
                className="absolute inset-0 w-full h-full opacity-20 text-[#C7A15A]"
                viewBox="0 0 400 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M-50 150 C50 80, 150 220, 250 100 C350 0, 450 180, 550 120" stroke="currentColor" strokeWidth="1.5" />
                <path d="M-50 190 C50 120, 150 260, 250 140 C350 40, 450 220, 550 160" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
                <path d="M-50 230 C50 160, 150 300, 250 180 C350 80, 450 260, 550 200" stroke="currentColor" strokeWidth="1" />
              </svg>

              {/* Gold Markhor Emblem Destination Pin Marker */}
              <div className="relative z-10 mb-6 flex flex-col items-center">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-[#C7A15A]/20 animate-ping opacity-75" />
                  <div className="relative w-12 h-12 rounded-full bg-[#071116] border border-[#C7A15A] flex items-center justify-center shadow-lg shadow-[#C7A15A]/20">
                    <Image
                      src="/assets/logos/markhor-logo-gold.png"
                      alt="Markhor Club Pin"
                      width={32}
                      height={32}
                      className="w-auto h-6 object-contain"
                    />
                  </div>
                </div>
                <span className="text-xs uppercase tracking-[0.2em] font-serif font-semibold text-[#F4F0E8] mt-3">
                  MARKHOR CLUB ESTATE
                </span>
                <span className="text-[10px] text-[#C7A15A] uppercase tracking-widest font-sans mt-1">
                  NEAR ALEXANDER ROAD &bull; KHANPUR DAM
                </span>
              </div>

              <div className="relative z-10">
                <ConceptDisclaimer label="Conceptual Geographic Overview" />
              </div>
            </div>
          </div>
        </div>

        {/* Section Primary CTA & Handoff Microcopy */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-[#C7A15A]/15">
          <Link
            href="#contact"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-sm bg-gradient-to-r from-[#C7A15A] to-[#D6B978] text-[#071116] font-sans font-semibold text-xs tracking-[0.18em] uppercase shadow-lg hover:shadow-xl hover:shadow-[#C7A15A]/30 hover:-translate-y-0.5 transition-all duration-300 min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A15A]"
          >
            <span>EXPLORE THE LOCATION</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <span className="text-xs uppercase tracking-[0.25em] text-[#9A9389] font-sans text-center sm:text-right">
            A DESTINATION DESIGNED TO BE EXPERIENCED.
          </span>
        </div>
      </Container>
    </section>
  )
}
