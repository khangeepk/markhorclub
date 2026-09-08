'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Building2, Compass, Trees, Waves, MapPin, Maximize2, Layers } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Container from '../ui/Container'
import ConceptDisclaimer from '../ui/ConceptDisclaimer'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface Zone {
  number: string
  title: string
  subtitle: string
  description: string
  image: string
  icon: React.ComponentType<{ className?: string }>
  x: number
  y: number
  coordinates: string
}

const ZONES: Zone[] = [
  {
    number: '01',
    title: 'Club & Social Core',
    subtitle: 'Arrival & Gathering',
    description: 'The ceremonial heart of Markhor Club. Designed around open-air arrival porticos, double-height reception volumes, and panoramic arrival gardens.',
    image: '/assets/images/Reception.jpg',
    icon: Building2,
    x: 47,
    y: 47,
    coordinates: '33°47\'04"N 72°50\'31"E',
  },
  {
    number: '02',
    title: 'Dining & Hospitality',
    subtitle: 'Lakeview Gastronomy',
    description: 'A collection of sunset dining rooms, tea lounges, and waterside dining terraces directly overlooking Khanpur Lake.',
    image: '/assets/images/Restaurant 3.png',
    icon: Building2,
    x: 61,
    y: 37,
    coordinates: '33°47\'08"N 72°50\'39"E',
  },
  {
    number: '03',
    title: 'Wellness & Indoor Recreation',
    subtitle: 'Hydrotherapy & Athletics',
    description: 'Thermal plunge pools, indoor sports halls, fitness suites, and quiet relaxation pavilions integrated into natural rock gradients.',
    image: '/assets/images/Indoor Sports.png',
    icon: Compass,
    x: 38,
    y: 42,
    coordinates: '33°47\'01"N 72°50\'25"E',
  },
  {
    number: '04',
    title: 'Equestrian & Outdoor Sport',
    subtitle: 'Paddock & Riding Trails',
    description: 'Custom riding arenas, stable complexes, and outdoor sports fields nestled along the mountain slopes.',
    image: '/assets/images/Horse 3.png',
    icon: Compass,
    x: 25,
    y: 29,
    coordinates: '33°46\'55"N 72°50\'18"E',
  },
  {
    number: '05',
    title: 'Fairway Golf Grounds',
    subtitle: 'Landscape Golf Experience',
    description: 'Contoured driving bays, practice greens, and scenic fairway corridors offering panoramic mountain views.',
    image: '/assets/images/Golf Club.png',
    icon: Compass,
    x: 74,
    y: 29,
    coordinates: '33°47\'15"N 72°50\'44"E',
  },
  {
    number: '06',
    title: 'Water & Marina',
    subtitle: 'Open Water Launch',
    description: 'Private boat slipways, jet-ski decks, and lakeside promenades for high-speed water recreation and sunset cruises.',
    image: '/assets/images/Zip 1.png',
    icon: Waves,
    x: 82,
    y: 56,
    coordinates: '33°47\'19"N 72°50\'52"E',
  },
  {
    number: '07',
    title: 'Aqua Theme Experience',
    subtitle: 'Aquatic Recreation',
    description: 'Family-focused water features, leisure lagoons, and cascading splash pools designed with natural stone details.',
    image: '/assets/images/Swiming pool 1.jpg',
    icon: Waves,
    x: 67,
    y: 68,
    coordinates: '33°47\'12"N 72°50\'46"E',
  },
  {
    number: '08',
    title: 'Events & Community Grounds',
    subtitle: 'Outdoor Ceremonies',
    description: 'Terraced amphitheaters, grand event lawns, and outdoor banquet pavilions for milestone gatherings.',
    image: '/assets/images/Markhor Lobby.png',
    icon: Building2,
    x: 43,
    y: 63,
    coordinates: '33°47\'02"N 72°50\'34"E',
  },
  {
    number: '09',
    title: 'Open Mountain Landscape',
    subtitle: 'Preserved Wilderness',
    description: 'Native flora, walking trails, and unbuilt green buffers securing absolute privacy and natural serenity.',
    image: '/assets/images/Dam View.png',
    icon: Trees,
    x: 20,
    y: 64,
    coordinates: '33°46\'50"N 72°50\'12"E',
  },
]

export default function MasterPlan() {
  const [activeNumber, setActiveNumber] = useState('01')
  const sectionRef = useRef<HTMLElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)

  const active = ZONES.find((zone) => zone.number === activeNumber) ?? ZONES[0]
  const ActiveIcon = active.icon

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 1024) return

    const section = sectionRef.current
    const pinContainer = pinContainerRef.current
    if (!section || !pinContainer) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinContainer,
        start: 'top top+=90',
        end: '+=1800',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress
          const zoneIndex = Math.min(
            Math.floor(progress * ZONES.length),
            ZONES.length - 1
          )
          setActiveNumber(ZONES[zoneIndex].number)
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="master-plan"
      className="relative border-t border-[#C7A15A]/20 bg-[#071116] py-20 lg:py-28 text-[#F4F0E8] overflow-hidden"
    >
      {/* Fine Linework Grid Pattern Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#C7A15A_1px,transparent_1px),linear-gradient(to_bottom,#C7A15A_1px,transparent_1px)] [background-size:48px_48px]" />

      <Container>
        {/* HEADER SECTION */}
        <header className="relative mb-12 grid items-end gap-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 border-b border-[#C7A15A]/30 pb-1 text-[10px] uppercase tracking-[0.25em] text-[#D6B978] font-mono">
              <Layers className="h-3.5 w-3.5 text-[#D6B978]" aria-hidden="true" />
              <span>Section 07 — Architectural Master Plan</span>
            </div>
            <h2 className="mt-5 font-serif text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl text-[#F4F0E8]">
              500 KANAL <br />
              <span className="italic text-[#D6B978]">ARCHITECTURAL VISION.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 space-y-4">
            <p className="text-sm font-light leading-relaxed text-[#9A9389]">
              An integrated, landscape-led master plan arranged across 500 Kanals of prime lakeside topography along Khanpur Dam. Each zone is meticulously proportioned to balance activity with quiet mountain seclusion.
            </p>
            <div className="text-[11px] font-mono text-[#D6B978]/90 tracking-widest uppercase flex items-center gap-3 border-t border-[#C7A15A]/15 pt-3">
              <span>LOCATION: KHANPUR DAM</span>
              <span>&bull;</span>
              <span>2 KM FROM ALEXANDER ROAD</span>
            </div>
          </div>
        </header>

        {/* ARCHITECTURAL STATUS & MANDATORY DISCLAIMER BAR */}
        <div className="relative mb-12 flex flex-col gap-6 border-y border-[#C7A15A]/25 bg-[#0B1C26]/40 p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-6">
            <div className="border-r border-[#C7A15A]/20 pr-6">
              <span className="block font-serif text-4xl font-light text-[#D6B978] leading-none sm:text-5xl">
                500
              </span>
              <span className="mt-1 block text-[10px] font-mono uppercase tracking-[0.2em] text-[#9A9389]">
                KANAL ESTATE
              </span>
            </div>
            <div>
              <span className="block text-xs font-mono uppercase tracking-[0.18em] text-[#F4F0E8]">
                MASTER DEVELOPMENT LAYOUT
              </span>
              <span className="mt-1 block text-[11px] font-mono text-[#9A9389]">
                Coordinate Anchor: 33°47&apos;04&quot;N 72°50&apos;31&quot;E
              </span>
            </div>
          </div>

          {/* REQUIRED DISCLAIMER BADGE */}
          <div className="shrink-0 border-t border-[#C7A15A]/20 pt-4 sm:border-t-0 sm:pt-0">
            <ConceptDisclaimer label="CONCEPTUAL PLANNING DIAGRAM — ARTIST'S IMPRESSION — NOT TO SCALE" />
          </div>
        </div>

        {/* PINNED ZONE WORKBENCH (DESKTOP + RESPONSIVE) */}
        <div ref={pinContainerRef} className="relative">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
            
            {/* LEFT: ZONE SELECTION NAV (4 COLS) */}
            <aside className="border border-[#C7A15A]/20 bg-[#0B1C26]/80 p-6 backdrop-blur-md lg:col-span-4 rounded-sm">
              <div className="mb-6 flex items-center justify-between border-b border-[#C7A15A]/20 pb-4">
                <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#D6B978]">
                  DEVELOPMENT ZONES
                </span>
                <span className="text-[10px] font-mono text-[#9A9389] uppercase tracking-widest">
                  09 SECTORS
                </span>
              </div>

              <div className="space-y-1">
                {ZONES.map((zone) => {
                  const isSelected = active.number === zone.number
                  return (
                    <button
                      key={zone.number}
                      type="button"
                      onClick={() => setActiveNumber(zone.number)}
                      aria-pressed={isSelected}
                      className={`group flex w-full items-center justify-between p-3 text-left transition-all duration-300 ${
                        isSelected
                          ? 'border border-[#D6B978]/40 bg-[#D6B978]/10 text-[#F4F0E8]'
                          : 'border border-transparent hover:border-[#C7A15A]/20 hover:bg-white/5 text-[#9A9389]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`font-serif text-sm transition-colors ${isSelected ? 'text-[#D6B978]' : 'text-[#9A9389]'}`}>
                          {zone.number}
                        </span>
                        <span className={`text-xs font-mono uppercase tracking-wider transition-colors ${isSelected ? 'text-[#F4F0E8]' : 'group-hover:text-[#F4F0E8]'}`}>
                          {zone.title}
                        </span>
                      </div>
                      <span className={`h-1.5 w-1.5 rounded-full transition-all ${isSelected ? 'bg-[#D6B978]' : 'bg-transparent group-hover:bg-[#C7A15A]/40'}`} />
                    </button>
                  )
                })}
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#C7A15A]/20 pt-4 text-[10px] font-mono text-[#9A9389] uppercase tracking-widest">
                <span>CANVAS SCALE: 1:5000</span>
                <span>STATUS: CONCEPTUAL</span>
              </div>
            </aside>

            {/* CENTER: LARGE PLAN CANVAS WITH FINE LINEWORK & INTERACTIVE PINS (5 COLS) */}
            <div className="relative min-h-[460px] overflow-hidden border border-[#C7A15A]/30 bg-[#0B1C26] lg:col-span-5 lg:min-h-[580px] rounded-sm group">
              {/* Architectural Grid Underlay */}
              <div className="pointer-events-none absolute inset-0 z-10 opacity-20 [background-image:radial-gradient(#D6B978_1px,transparent_1px)] [background-size:24px_24px]" />
              
              {/* Master Plan Map Image */}
              <Image
                src="/assets/images/master-plan-diagram.png"
                alt="Conceptual Markhor Club master plan diagram"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                priority
                className="object-cover opacity-85 transition-opacity duration-700 group-hover:opacity-95"
              />

              {/* Gradient Atmosphere Overlays */}
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-[#071116]/90 via-transparent to-[#071116]/40" />

              {/* Architectural Canvas Corner Crosshairs */}
              <div className="pointer-events-none absolute left-3 top-3 z-20 font-mono text-[9px] text-[#D6B978]/60">
                + N 33.7845°
              </div>
              <div className="pointer-events-none absolute right-3 top-3 z-20 font-mono text-[9px] text-[#D6B978]/60">
                + E 72.8421°
              </div>
              <div className="pointer-events-none absolute bottom-3 left-3 z-20">
                <ConceptDisclaimer label="ARTIST'S IMPRESSION — NOT TO SCALE" />
              </div>

              {/* INTERACTIVE ZONE PIN MARKERS */}
              {ZONES.map((zone) => {
                const isSelected = active.number === zone.number
                return (
                  <button
                    key={zone.number}
                    type="button"
                    onClick={() => setActiveNumber(zone.number)}
                    aria-label={`Inspect zone ${zone.number}: ${zone.title}`}
                    style={{ left: `${zone.x}%`, top: `${zone.y}%` }}
                    className={`absolute z-30 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center font-mono text-[10px] font-bold transition-all duration-300 ${
                      isSelected
                        ? 'scale-125 border-2 border-[#F4F0E8] bg-[#D6B978] text-[#071116] shadow-[0_0_20px_rgba(214,185,120,0.8)]'
                        : 'border border-[#D6B978]/60 bg-[#071116]/85 text-[#F4F0E8] hover:scale-110 hover:border-[#F4F0E8] hover:bg-[#D6B978] hover:text-[#071116]'
                    }`}
                  >
                    {zone.number}
                  </button>
                )
              })}
            </div>

            {/* RIGHT: SELECTED ZONE DETAIL ANNOTATION PANEL (3 COLS) */}
            <div className="flex flex-col justify-between border border-[#C7A15A]/20 bg-[#0B1C26]/90 p-6 backdrop-blur-md lg:col-span-3 lg:min-h-[580px] rounded-sm">
              <div>
                {/* Zone Category Header */}
                <div className="flex items-center justify-between border-b border-[#C7A15A]/20 pb-4">
                  <div className="flex items-center gap-2">
                    <ActiveIcon className="h-4 w-4 text-[#D6B978]" aria-hidden="true" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D6B978]">
                      ZONE SPECIFICATION
                    </span>
                  </div>
                  <span className="font-serif text-2xl font-light text-[#D6B978]">
                    {active.number}
                  </span>
                </div>

                {/* Zone Visual Preview Frame */}
                <div className="relative mt-6 h-48 w-full overflow-hidden border border-[#C7A15A]/25 bg-[#071116]">
                  <Image
                    src={active.image}
                    alt={`Conceptual rendering of ${active.title}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071116] via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] font-mono text-[#D6B978]">
                    <span className="bg-[#071116]/80 px-2 py-0.5 border border-[#C7A15A]/30">
                      CONCEPTUAL RENDER
                    </span>
                  </div>
                </div>

                {/* Zone Title & Narrative */}
                <div className="mt-6 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#C7A15A]">
                    {active.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl font-light text-[#F4F0E8] leading-snug">
                    {active.title}
                  </h3>
                  <p className="mt-3 text-xs font-light leading-relaxed text-[#9A9389]">
                    {active.description}
                  </p>
                </div>
              </div>

              {/* Zone Coordinates & Footer Specifications */}
              <div className="mt-8 border-t border-[#C7A15A]/20 pt-4 space-y-2 text-[10px] font-mono text-[#9A9389]">
                <div className="flex items-center justify-between">
                  <span>GRID LOCATOR:</span>
                  <span className="text-[#F4F0E8]">{active.coordinates}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>ORIENTATION:</span>
                  <span className="text-[#D6B978]">KHANPUR LAKEFRONT</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM ARCHITECTURAL CLOSING STATEMENT */}
        <div className="mt-16 border-t border-[#C7A15A]/20 pt-10 text-center">
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C7A15A]">
            INTEGRATED MASTER PLAN
          </span>
          <p className="mt-3 font-serif text-2xl font-light sm:text-3xl text-[#F4F0E8]">
            DESIGNED AROUND NATURE. CRAFTED FOR GENERATIONS.
          </p>
        </div>
      </Container>
    </section>
  )
}

