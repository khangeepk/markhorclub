'use client'

import React, { useState, useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Container from '../ui/Container'
import ConceptDisclaimer from '../ui/ConceptDisclaimer'
import SectionWrapper from '../ui/SectionWrapper'
import { SectionEyebrow, DisplayTitle, SectionDescription } from '../ui/Typography'
import LuxuryButton from '../ui/LuxuryButton'

const AMENITIES = [
  {
    number: '01',
    title: 'RESTAURANTS',
    subhead: 'DINING DESIGNED FOR CONNECTION.',
    copy: 'Refined social spaces envisioned for memorable meals, relaxed conversations and elevated club dining overlooking Khanpur Dam.',
    image: '/assets/images/Restaurant 3.png',
    alt: 'Markhor Club signature restaurant interior',
    tags: ['DINING', 'SOCIAL', 'HOSPITALITY'],
  },
  {
    number: '02',
    title: 'GYM & FITNESS',
    subhead: 'MOVE. STRENGTHEN. RECHARGE.',
    copy: 'A contemporary fitness environment conceived to make wellness, movement and performance part of everyday club life.',
    image: '/assets/images/Gym.png',
    alt: 'Markhor Club fitness center and training suite',
    tags: ['FITNESS', 'STRENGTH', 'WELLNESS'],
  },
  {
    number: '03',
    title: 'INDOOR SPORTS',
    subhead: 'PLAY BEYOND THE WEATHER.',
    copy: 'Dynamic indoor recreation designed for year-round energy, competition, squash and social connection.',
    image: '/assets/images/Indoor Sports.png',
    alt: 'Markhor Club indoor sports facility',
    tags: ['PLAY', 'COMPETE', 'CONNECT'],
  },
  {
    number: '04',
    title: 'JACUZZI & WELLNESS',
    subhead: 'SLOW DOWN. RESET.',
    copy: 'An intimate wellness experience designed around warmth, hydrotherapy, thermal calm and restorative moments.',
    image: '/assets/images/Jakuzi 1.jpg',
    alt: 'Markhor Club hydrotherapy jacuzzi and wellness suite',
    tags: ['RELAX', 'RESTORE', 'RECHARGE'],
  },
  {
    number: '05',
    title: 'SWIMMING POOL',
    subhead: 'LEISURE, REFLECTED IN WATER.',
    copy: 'A resort-inspired pool environment imagined for relaxed afternoons, shoreline leisure and effortless escape under open skies.',
    image: '/assets/images/Swiming Pool.jpg',
    alt: 'Markhor Club resort swimming pool',
    tags: ['SWIM', 'RELAX', 'ESCAPE'],
  },
]

export default function ClubExperience() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = AMENITIES[activeIndex]
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyMediaRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const isDesktop = window.innerWidth >= 1024
      if (isDesktop && containerRef.current && stickyMediaRef.current) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: 'top top+=100',
          end: 'bottom bottom',
          pin: stickyMediaRef.current,
          pinSpacing: false,
        })
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <SectionWrapper id="amenities" bg="midnight" padding="lg" className="border-t border-[#C7A15A]/15 select-none">
      <div className="pointer-events-none absolute left-0 top-1/3 h-[560px] w-[560px] bg-[#164E63]/10 blur-[140px]" />

      <Container>
        {/* Header Section */}
        <header className="mb-12 lg:mb-16">
          <SectionEyebrow number="04" accentLine={true}>
            THE CLUB EXPERIENCE &bull; ARCHITECTURAL SANCTUARY
          </SectionEyebrow>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <h2 className="text-display-lg font-serif text-[#F4F0E8] font-normal leading-[1.06] tracking-tight">
                EVERY DAY,<br />
                <span className="italic font-light text-gold-gradient">a different way to live.</span>
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm font-sans font-light text-[#9A9389] leading-relaxed border-l border-[#C7A15A]/40 pl-4">
                From dining and fitness to sport, water and wellness, Markhor Club is envisioned as an architectural sanctuary where every hour of the day becomes an intentional experience.
              </p>
            </div>
          </div>
        </header>

        {/* Amenity Index Tabs (Desktop & Tablet Bar) */}
        <div className="mb-12 hidden sm:grid grid-cols-5 border-y border-[#C7A15A]/20">
          {AMENITIES.map((amenity, index) => (
            <button
              key={amenity.number}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`group flex items-center gap-3 px-4 py-5 text-left text-[10px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
                index > 0 ? 'border-l border-[#C7A15A]/15' : ''
              } ${activeIndex === index ? 'text-[#D6B978] bg-[#0B1C26]/60' : 'text-[#9A9389] hover:text-[#F4F0E8] hover:bg-[#0B1C26]/30'}`}
              aria-pressed={activeIndex === index}
            >
              <span className="font-serif text-base font-light text-[#D6B978]">{amenity.number}</span>
              <span className="truncate">{amenity.title}</span>
              <span
                className={`ml-auto h-px bg-[#D6B978] transition-all duration-300 ${
                  activeIndex === index ? 'w-5 opacity-100' : 'w-0 opacity-0'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Desktop Sequential Viewport Layout: Sticky Media + Active Narrative */}
        <div ref={containerRef} className="hidden lg:grid grid-cols-12 gap-12 items-start min-h-[600px]">
          {/* Left 7 Columns: Sticky Media Viewport with Smooth Image Crossfade */}
          <div ref={stickyMediaRef} className="col-span-7">
            <div className="relative h-[540px] w-full overflow-hidden border border-[#C7A15A]/25 bg-[#0B1C26] p-2 shadow-2xl rounded-none sm:rounded-sm">
              <div className="relative h-full w-full overflow-hidden">
                <Image
                  key={active.image}
                  src={active.image}
                  alt={active.alt}
                  fill
                  sizes="58vw"
                  priority
                  className="object-cover object-center transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/85 via-transparent to-transparent pointer-events-none" />

                {/* Oversized Background Numeral */}
                <span className="absolute left-6 top-4 font-serif text-8xl font-light text-[#F4F0E8]/10 select-none pointer-events-none">
                  {active.number}
                </span>

                <div className="absolute bottom-5 left-5 z-10">
                  <ConceptDisclaimer label="Artist's Impression" />
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Active Chapter Story & Navigation Controls */}
          <div className="col-span-5 flex flex-col justify-between h-[540px] py-2">
            <div>
              <span className="font-serif text-6xl font-light text-gold-gradient block">
                {active.number}
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#D6B978] block mt-2">
                {active.title}
              </span>

              <h3 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-[#F4F0E8] mt-4">
                {active.subhead}
              </h3>

              <p className="text-sm font-sans font-light text-[#9A9389] leading-relaxed mt-5 max-w-md">
                {active.copy}
              </p>

              <div className="mt-8 flex flex-wrap gap-2">
                {active.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-[#C7A15A]/30 px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#D6B978] bg-[#0B1C26]/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Stepper Control */}
            <div className="border-t border-[#C7A15A]/20 pt-5 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#9A9389]">
              <span>CHAPTER {active.number} OF 05</span>
              <button
                type="button"
                onClick={() => setActiveIndex((activeIndex + 1) % AMENITIES.length)}
                className="text-[#D6B978] hover:text-[#F4F0E8] transition-colors flex items-center gap-2 group"
              >
                <span>NEXT EXPERIENCE</span>
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sequential Editorial Layout (No Heavy Pinning) */}
        <div className="space-y-12 lg:hidden">
          {AMENITIES.map((amenity) => (
            <article key={amenity.number} className="border-b border-[#C7A15A]/20 pb-12 last:border-0">
              <div className="relative h-64 sm:h-80 w-full overflow-hidden border border-[#C7A15A]/25 bg-[#0B1C26] p-2 rounded-none sm:rounded-sm">
                <div className="relative h-full w-full overflow-hidden">
                  <Image
                    src={amenity.image}
                    alt={amenity.alt}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <ConceptDisclaimer label="Artist's Impression" />
                  </div>
                </div>
              </div>

              <span className="mt-5 block text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C7A15A]">
                {amenity.number} &bull; {amenity.title}
              </span>
              <h3 className="mt-3 font-serif text-2xl font-normal text-[#F4F0E8]">
                {amenity.subhead}
              </h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-[#9A9389]">
                {amenity.copy}
              </p>
            </article>
          ))}
        </div>

        {/* Handoff Divider to Outdoor Experience */}
        <div className="mt-16 pt-8 border-t border-[#C7A15A]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C7A15A]">
              BEYOND THE CLUBHOUSE
            </span>
            <p className="mt-1 text-sm font-light text-[#9A9389]">
              From horseback to open water, Markhor Club extends into the landscape.
            </p>
          </div>
          <LuxuryButton href="#experiences" variant="ghost">
            EXPLORE OUTDOORS &rarr;
          </LuxuryButton>
        </div>
      </Container>
    </SectionWrapper>
  )
}
