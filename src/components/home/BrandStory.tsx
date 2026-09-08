'use client'

import React, { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Container from '../ui/Container'
import ConceptDisclaimer from '../ui/ConceptDisclaimer'
import SectionWrapper from '../ui/SectionWrapper'
import { SectionEyebrow, DisplayTitle, SectionDescription, EditorialLead } from '../ui/Typography'

const PILLARS = [
  {
    number: '01',
    title: 'Nature',
    subtitle: 'MOUNT MOVEMENT & OPEN WATER',
    description: 'Mountain ridgelines, open sky and the serene waters of Khanpur Dam shaping every day.',
  },
  {
    number: '02',
    title: 'Leisure',
    subtitle: 'UNHURRIED SOCIAL TIME',
    description: 'Refined dining, sunset terraces and warm spaces built for effortless connection.',
  },
  {
    number: '03',
    title: 'Wellness',
    subtitle: 'RESTORATIVE CALM & RESET',
    description: 'State-of-the-art fitness, hydrotherapy jacuzzi and restorative spaces woven into daily life.',
  },
  {
    number: '04',
    title: 'Adventure',
    subtitle: 'EQUESTRIAN, WATER & HEIGHTS',
    description: 'Equestrian trails, fairway golf, boating and high-energy water exploration.',
  },
  {
    number: '05',
    title: 'Community',
    subtitle: 'LEGACY & SHARED MEMORIES',
    description: 'A setting envisioned for families, members and guests to gather and belong.',
  },
]

export default function BrandStory() {
  const containerRef = useRef<HTMLDivElement>(null)
  const mainVisualRef = useRef<HTMLDivElement>(null)
  const textGroupRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      // Parallax zoom on the main visual frame as user scrolls into view
      if (mainVisualRef.current) {
        gsap.fromTo(
          mainVisualRef.current,
          { y: 30, opacity: 0.8 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: mainVisualRef.current,
              start: 'top 85%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <SectionWrapper id="about" bg="midnight" padding="lg" className="border-t border-[#C7A15A]/15 select-none">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(199,161,90,0.06),transparent_40%)]" />

      <Container>
        {/* Header Section: Eyebrow + Editorial Headline */}
        <header className="relative mb-14 lg:mb-20">
          <SectionEyebrow number="02" accentLine={true}>
            THE MARKHOR VISION &bull; CHAPTER II
          </SectionEyebrow>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <h2 className="text-display-lg font-serif text-[#F4F0E8] font-normal leading-[1.06] tracking-tight">
                MORE THAN A CLUB.<br />
                <span className="italic font-light text-gold-gradient">A WAY OF LIVING.</span>
              </h2>
            </div>
            <div className="lg:col-span-5 space-y-4 lg:pt-2">
              <EditorialLead>
                Markhor Club brings together nature, recreation, wellness and social life within one destination overlooking Khanpur Dam.
              </EditorialLead>
              <p className="text-sm text-[#9A9389] font-sans font-light leading-relaxed pl-5">
                Across 500 Kanal, the vision is to create a sanctuary where families, members and guests can reconnect with the outdoors, with experiences, and with one another.
              </p>
            </div>
          </div>
        </header>

        {/* Asymmetric Editorial Media Spread: Dominant Left + Stacked Right */}
        <div ref={containerRef} className="relative mb-16 lg:mb-24 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Dominant Main Visual */}
          <figure ref={mainVisualRef} className="group relative overflow-hidden border border-[#C7A15A]/25 bg-[#0B1C26] p-2 sm:p-3 shadow-2xl rounded-none sm:rounded-sm lg:col-span-7 flex flex-col justify-between">
            <div className="relative h-[380px] sm:h-[480px] lg:h-[580px] w-full overflow-hidden">
              <Image
                src="/assets/images/Markhor Statue.png"
                alt="Markhor Club statue and clubhouse arrival"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                priority
                className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/85 via-transparent to-[#071116]/15" />
              <div className="absolute bottom-5 left-5">
                <ConceptDisclaimer label="Artist's Impression" />
              </div>
            </div>
            <figcaption className="flex items-center justify-between gap-4 px-2 pt-4 pb-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C7A15A]">
                PLATE I &bull; THE MARKHOR ARRIVAL & VISION
              </span>
              <span className="text-[10px] font-mono text-[#9A9389]">
                01 // 03
              </span>
            </figcaption>
          </figure>

          {/* Secondary Supporting Visuals Stack */}
          <div className="flex flex-col gap-8 lg:col-span-5 lg:gap-10 justify-between">
            <figure className="group relative overflow-hidden border border-[#C7A15A]/20 bg-[#0B1C26] p-2 shadow-xl rounded-none sm:rounded-sm">
              <div className="relative h-60 sm:h-72 w-full overflow-hidden">
                <Image
                  src="/assets/images/Markhor Lobby.png"
                  alt="Markhor Club social lobby environment"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/80 via-transparent to-transparent" />
              </div>
              <figcaption className="pt-3 px-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C7A15A]">
                <span>PLATE II &bull; LEISURE & CONNECTION</span>
                <span className="font-mono text-[#9A9389]">02 // 03</span>
              </figcaption>
            </figure>

            <figure className="group relative overflow-hidden border border-[#C7A15A]/20 bg-[#0B1C26] p-2 shadow-xl rounded-none sm:rounded-sm">
              <div className="relative h-60 sm:h-64 w-full overflow-hidden">
                <Image
                  src="/assets/images/yatch view.png"
                  alt="Markhor Club yacht-side water escape"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/70 via-transparent to-transparent" />
              </div>
              <figcaption className="pt-3 px-2 flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C7A15A]">
                <span>PLATE III &bull; WATER & ESCAPE</span>
                <span className="font-mono text-[#9A9389]">03 // 03</span>
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Foundations of the Destination: Staggered Editorial Timeline (Replaces Identical Cards) */}
        <div className="border-t border-b border-[#C7A15A]/20 py-10 lg:py-14 mb-14">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#C7A15A] block mb-1">
                THE FIVE PILLARS
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#F4F0E8]">
                Foundations of the Destination
              </h3>
            </div>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#9A9389] font-sans">
              CURATED LIFESTYLE PILLARS
            </span>
          </div>

          {/* Editorial Progressive Layout */}
          <div className="space-y-6">
            {PILLARS.map((pillar, idx) => (
              <div
                key={pillar.number}
                className="group relative border-b border-[#F4F0E8]/10 pb-6 pt-2 transition-all duration-300 hover:border-[#D6B978]/50"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-1 flex items-center gap-2">
                    <span className="font-serif text-2xl font-light text-[#D6B978]">
                      {pillar.number}
                    </span>
                    <span className="h-px w-6 bg-[#C7A15A]/40 transition-all duration-300 group-hover:w-10 group-hover:bg-[#D6B978]" />
                  </div>

                  <div className="md:col-span-4">
                    <h4 className="font-serif text-2xl font-normal text-[#F4F0E8] group-hover:text-[#D6B978] transition-colors">
                      {pillar.title}
                    </h4>
                    <span className="text-[9px] uppercase tracking-[0.22em] text-[#C7A15A] block mt-0.5 font-sans">
                      {pillar.subtitle}
                    </span>
                  </div>

                  <div className="md:col-span-7">
                    <p className="text-sm font-sans font-light text-[#9A9389] leading-relaxed group-hover:text-[#D9E4EB] transition-colors">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Destination Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          {[
            ['ESTATE SCALE', '500 Kanal'],
            ['ACCESS & CONNECTIVITY', 'Approx. 2 KM Alexander Rd'],
            ['GEOGRAPHIC OUTLOOK', 'Khanpur Dam View Facing'],
            ['PROVINCE & REGION', 'Khyber Pakhtunkhwa, PK'],
          ].map(([label, value]) => (
            <div key={label} className="space-y-1 border-l border-[#C7A15A]/30 pl-4 py-1">
              <span className="block text-[9px] font-semibold uppercase tracking-[0.22em] text-[#C7A15A]">
                {label}
              </span>
              <span className="font-serif text-base sm:text-lg font-light text-[#D9E4EB]">
                {value}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </SectionWrapper>
  )
}
