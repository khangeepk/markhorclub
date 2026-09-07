'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, Building2, Compass, Trees, Waves } from 'lucide-react'
import Container from '../ui/Container'
import ConceptDisclaimer from '../ui/ConceptDisclaimer'

const ZONES = [
  { number: '01', title: 'Club & Social Core', description: 'The gathering heart of the destination, envisioned around connection, arrival and shared time.', image: '/assets/images/Reception.jpg', icon: Building2, x: 47, y: 47 },
  { number: '02', title: 'Dining & Hospitality', description: 'Spaces shaped around dining, social moments, lake-view terraces and welcoming hospitality.', image: '/assets/images/Restaurant 3.png', icon: Building2, x: 61, y: 37 },
  { number: '03', title: 'Wellness & Indoor Recreation', description: 'Fitness, indoor sport, swimming and restorative experiences brought together for everyday club life.', image: '/assets/images/Indoor Sports.png', icon: Compass, x: 38, y: 42 },
  { number: '04', title: 'Equestrian & Outdoor Sport', description: 'Open-air experiences shaped around riding, movement and natural connection with the landscape.', image: '/assets/images/Horse 3.png', icon: Compass, x: 25, y: 29 },
  { number: '05', title: 'Golf', description: 'A landscape-led golf component envisioned to bring sport, open space and social interaction together.', image: '/assets/images/Golf Club.png', icon: Compass, x: 74, y: 29 },
  { number: '06', title: 'Water & Adventure', description: 'Boating, water speed, jet-ski energy and zipline elevation inspired by the Khanpur setting.', image: '/assets/images/Zip 1.png', icon: Waves, x: 82, y: 56 },
  { number: '07', title: 'Aqua Theme Park', description: 'A family-focused water experience bringing play, recreation and aquatic adventure into the vision.', image: '/assets/images/Swiming pool 1.jpg', icon: Waves, x: 67, y: 68 },
  { number: '08', title: 'Events & Community', description: 'Spaces imagined for celebrations, gatherings, outdoor banquets and shared community moments.', image: '/assets/images/Markhor Lobby.png', icon: Building2, x: 43, y: 63 },
  { number: '09', title: 'Open Landscape', description: 'The mountain and lake setting remains central, allowing open space to shape the overall experience.', image: '/assets/images/Dam View.png', icon: Trees, x: 20, y: 64 },
]

export default function MasterPlan() {
  const [activeNumber, setActiveNumber] = useState('01')
  const active = ZONES.find((zone) => zone.number === activeNumber) ?? ZONES[0]
  const ActiveIcon = active.icon

  return (
    <section id="master-plan" className="section-space-compact relative overflow-hidden border-t border-[#C7A15A]/20 bg-[#071116] text-[#F4F0E8]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(214,185,120,.35)_1px,transparent_1px),linear-gradient(90deg,rgba(214,185,120,.35)_1px,transparent_1px)] [background-size:64px_64px]" />
      <Container>
        <header className="relative mb-10 grid items-end gap-7 lg:mb-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7"><span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D6B978] sm:text-xs">Section 07 — The 500 Kanal Vision</span><h2 className="mt-5 font-serif text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">500 KANAL<br /><span className="italic text-[#D6B978]">ONE COMPLETE VISION.</span></h2></div>
          <p className="max-w-md text-sm font-light leading-relaxed text-[#9A9389] lg:col-span-5">A landscape-led plan designed to let each club experience feel distinct while remaining part of a much larger whole along Khanpur Dam.</p>
        </header>

        <div className="relative mb-10 flex flex-col justify-between gap-5 border-y border-[#C7A15A]/20 py-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-5"><span className="font-serif text-6xl font-light leading-none text-[#D6B978] sm:text-7xl">500</span><div className="border-l border-[#C7A15A]/30 pl-5"><span className="block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C7A15A]">Estate scale</span><span className="mt-1 block text-xs uppercase tracking-[0.16em] text-[#D9E4EB]">Kanal integrated master plan</span></div></div>
          <ConceptDisclaimer label="Conceptual planning diagram — Artist's impression — Not to scale" />
        </div>

        <div className="hidden min-h-[590px] gap-7 lg:grid lg:grid-cols-12">
          <aside className="border border-[#C7A15A]/20 bg-[#0B1C26]/60 p-5 lg:col-span-4"><div className="mb-4 flex items-center justify-between border-b border-[#C7A15A]/20 pb-4"><span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D6B978]">Master plan zones</span><span className="text-[10px] uppercase tracking-[0.18em] text-[#9A9389]">09 categories</span></div><div className="divide-y divide-[#C7A15A]/10">{ZONES.map((zone) => <button key={zone.number} type="button" onClick={() => setActiveNumber(zone.number)} className={`flex w-full items-center gap-3 py-3 text-left text-xs uppercase tracking-[0.1em] transition ${active.number === zone.number ? 'text-[#D6B978]' : 'text-[#9A9389] hover:text-[#F4F0E8]'}`} aria-pressed={active.number === zone.number}><span className="w-7 font-serif text-base">{zone.number}</span><span className={`h-px transition-all ${active.number === zone.number ? 'w-6 bg-[#D6B978]' : 'w-0 bg-transparent'}`} /><span>{zone.title}</span></button>)}</div><div className="mt-5 flex items-center gap-2 border-t border-[#C7A15A]/20 pt-4 text-[10px] uppercase tracking-[0.14em] text-[#9A9389]"><Compass className="h-3.5 w-3.5 text-[#D6B978]" aria-hidden="true" /> 2 KM FROM ALEXANDER ROAD</div></aside>

          <div className="relative overflow-hidden border border-[#C7A15A]/25 bg-[#0B1C26] lg:col-span-5"><Image src="/assets/images/master-plan-diagram.png" alt="Conceptual Markhor Club master plan diagram" fill sizes="42vw" priority className="object-cover opacity-75" /><div className="absolute inset-0 bg-gradient-to-t from-[#071116] via-transparent to-[#071116]/30" />{ZONES.map((zone) => <button key={zone.number} type="button" onClick={() => setActiveNumber(zone.number)} aria-label={`Explore ${zone.title}`} style={{ left: `${zone.x}%`, top: `${zone.y}%` }} className={`absolute z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center border text-[10px] font-semibold transition ${active.number === zone.number ? 'border-[#F4F0E8] bg-[#D6B978] text-[#071116]' : 'border-[#D6B978]/70 bg-[#071116]/90 text-[#F4F0E8] hover:bg-[#D6B978] hover:text-[#071116]'}`}>{zone.number}</button>)}</div>

          <div className="flex flex-col justify-between border border-[#C7A15A]/20 bg-[#0B1C26]/70 p-6 lg:col-span-3"><div><div className="flex items-center justify-between"><ActiveIcon className="h-4 w-4 text-[#D6B978]" aria-hidden="true" /><span className="font-serif text-2xl font-light text-[#D6B978]">{active.number}</span></div><div className="mt-8 relative h-44 overflow-hidden border border-[#C7A15A]/20"><Image src={active.image} alt={`${active.title} conceptual preview`} fill sizes="25vw" className="object-cover" /><div className="absolute bottom-3 left-3"><ConceptDisclaimer label="Conceptual visualization" /></div></div><span className="mt-6 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C7A15A]">{active.title}</span><h3 className="mt-3 font-serif text-2xl font-light leading-tight">{active.title}</h3><p className="mt-4 text-sm font-light leading-relaxed text-[#9A9389]">{active.description}</p></div><div className="border-t border-[#C7A15A]/20 pt-4 text-[10px] uppercase tracking-[0.16em] text-[#9A9389]">Khanpur Dam View Facing</div></div>
        </div>

        <div className="lg:hidden"><div className="relative h-64 overflow-hidden border border-[#C7A15A]/25 bg-[#0B1C26] p-2"><div className="relative h-full overflow-hidden"><Image src="/Assets/images/master-plan-diagram.png" alt="Conceptual Markhor Club master plan overview" fill sizes="100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#071116] via-transparent to-[#071116]/20" /><div className="absolute bottom-4 left-4"><ConceptDisclaimer label="Conceptual planning diagram — Not to scale" /></div></div></div><div className="mt-8 divide-y divide-[#C7A15A]/20 border-t border-[#C7A15A]/20">{ZONES.map((zone) => <button key={zone.number} type="button" onClick={() => setActiveNumber(zone.number)} className="flex w-full items-center gap-4 py-5 text-left"><span className="font-serif text-xl font-light text-[#D6B978]">{zone.number}</span><span className="flex-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#F4F0E8]">{zone.title}</span><ArrowRight className={`h-4 w-4 transition ${active.number === zone.number ? 'text-[#D6B978]' : 'text-[#9A9389]'}`} aria-hidden="true" /></button>)}</div><div className="mt-8 border border-[#C7A15A]/20 bg-[#0B1C26]/70 p-5"><span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C7A15A]">{active.number} — {active.title}</span><p className="mt-3 text-sm leading-relaxed text-[#9A9389]">{active.description}</p></div></div>

        <div className="mt-12 border-t border-[#C7A15A]/20 pt-8 text-center"><span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C7A15A]">The landscape continues</span><p className="mt-3 font-serif text-2xl font-light sm:text-3xl">A PLACE TO GATHER, MOVE AND BELONG.</p></div>
      </Container>
    </section>
  )
}
