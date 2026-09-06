'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Container from '../ui/Container'
import ConceptDisclaimer from '../ui/ConceptDisclaimer'

const AMENITIES = [
  { number: '01', title: 'RESTAURANTS', subhead: 'DINING DESIGNED FOR CONNECTION.', copy: 'Refined social spaces envisioned for memorable meals, relaxed conversations and elevated club dining.', image: '/Assets/images/Restaurant 3.png', tags: ['DINING', 'SOCIAL', 'HOSPITALITY'] },
  { number: '02', title: 'GYM & FITNESS', subhead: 'MOVE. STRENGTHEN. RECHARGE.', copy: 'A contemporary fitness environment conceived to make wellness and performance part of everyday club life.', image: '/Assets/images/Gym.png', tags: ['FITNESS', 'STRENGTH', 'WELLNESS'] },
  { number: '03', title: 'INDOOR SPORTS', subhead: 'PLAY BEYOND THE WEATHER.', copy: 'Dynamic indoor recreation designed for year-round energy, competition and social connection.', image: '/Assets/images/Sports 1.png', tags: ['PLAY', 'COMPETE', 'CONNECT'] },
  { number: '04', title: 'JACUZZI & WELLNESS', subhead: 'SLOW DOWN. RESET.', copy: 'An intimate wellness experience designed around warmth, calm and restorative moments.', image: '/Assets/images/amenity-jacuzzi.jpg', tags: ['RELAX', 'RESTORE', 'RECHARGE'] },
  { number: '05', title: 'SWIMMING POOL', subhead: 'LEISURE, REFLECTED IN WATER.', copy: 'A resort-inspired pool environment imagined for relaxed afternoons, family leisure and effortless escape.', image: '/Assets/images/Gym 1.png', tags: ['SWIM', 'RELAX', 'ESCAPE'] },
]

export default function ClubExperience() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = AMENITIES[activeIndex]

  return (
    <section id="amenities" className="section-space-compact relative overflow-hidden bg-[#071116] text-[#F4F0E8]">
      <div className="pointer-events-none absolute left-0 top-1/3 h-[560px] w-[560px] bg-[#164E63]/10 blur-[140px]" />
      <Container>
        <header className="mb-10 grid items-end gap-7 lg:mb-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D6B978] sm:text-xs">Section 04 — The Club Experience</span>
            <h2 className="mt-5 font-serif text-4xl font-light leading-[1.06] tracking-tight sm:text-5xl lg:text-6xl">EVERY DAY,<br /><span className="italic text-[#D6B978]">a different way to live.</span></h2>
          </div>
          <p className="max-w-md text-sm font-light leading-relaxed text-[#9A9389] lg:col-span-5">From dining and fitness to sport, water and wellness, Markhor Club is envisioned as an architectural sanctuary where every hour of the day becomes an intentional experience.</p>
        </header>

        <div className="mb-10 grid grid-cols-2 border-y border-[#C7A15A]/20 sm:grid-cols-5">
          {AMENITIES.map((amenity, index) => (
            <button key={amenity.number} type="button" onClick={() => setActiveIndex(index)} className={`group flex items-center gap-3 border-b border-[#C7A15A]/15 px-3 py-4 text-left text-[10px] font-semibold uppercase tracking-[0.14em] transition sm:border-b-0 sm:py-5 ${index % 2 === 1 ? 'sm:border-l' : ''} ${activeIndex === index ? 'text-[#D6B978]' : 'text-[#9A9389] hover:text-[#F4F0E8]'}`} aria-pressed={activeIndex === index}>
              <span className="font-serif text-base font-light">{amenity.number}</span><span>{amenity.title}</span><span className={`ml-auto hidden h-px w-5 bg-[#D6B978] transition sm:block ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`} />
            </button>
          ))}
        </div>

        <div className="hidden items-stretch gap-10 lg:grid lg:grid-cols-12 lg:gap-14">
          <div className="relative min-h-[500px] overflow-hidden border border-[#C7A15A]/25 bg-[#0B1C26] p-3 lg:col-span-7">
            <div className="relative h-full overflow-hidden">
              <Image key={active.image} src={active.image} alt={active.title} fill sizes="(max-width: 1024px) 100vw, 58vw" priority={activeIndex === 0} className="object-cover transition duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/85 via-transparent to-transparent" />
              <span className="absolute left-6 top-4 font-serif text-7xl font-light text-[#F4F0E8]/15">{active.number}</span>
              <div className="absolute bottom-5 left-5"><ConceptDisclaimer label="Artist's Impression" /></div>
            </div>
          </div>
          <div className="flex flex-col justify-end pb-3 lg:col-span-5">
            <span className="font-serif text-7xl font-light text-[#D6B978]/70">{active.number}</span>
            <span className="mt-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D6B978]">{active.title}</span>
            <h3 className="mt-4 font-serif text-3xl font-light leading-tight sm:text-4xl">{active.subhead}</h3>
            <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-[#9A9389]">{active.copy}</p>
            <div className="mt-7 flex flex-wrap gap-2">{active.tags.map((tag) => <span key={tag} className="border border-[#C7A15A]/30 px-3 py-1 text-[9px] uppercase tracking-[0.18em] text-[#D6B978]">{tag}</span>)}</div>
            <div className="mt-8 flex items-center justify-between border-t border-[#C7A15A]/20 pt-5 text-[10px] uppercase tracking-[0.2em] text-[#9A9389]"><span>Chapter {active.number} of 05</span><button type="button" onClick={() => setActiveIndex((activeIndex + 1) % AMENITIES.length)} className="text-[#D6B978] transition hover:text-[#F4F0E8]">Next experience →</button></div>
          </div>
        </div>

        <div className="space-y-12 lg:hidden">
          {AMENITIES.map((amenity) => (
            <article key={amenity.number} className="border-b border-[#C7A15A]/20 pb-12 last:border-0">
              <div className="relative h-64 overflow-hidden border border-[#C7A15A]/25 bg-[#0B1C26] p-2 sm:h-80"><div className="relative h-full overflow-hidden"><Image src={amenity.image} alt={amenity.title} fill sizes="100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#071116]/80 via-transparent to-transparent" /><div className="absolute bottom-3 left-3"><ConceptDisclaimer label="Artist's Impression" /></div></div></div>
              <span className="mt-5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C7A15A]">{amenity.number} — {amenity.title}</span><h3 className="mt-3 font-serif text-2xl font-light">{amenity.subhead}</h3><p className="mt-3 text-sm font-light leading-relaxed text-[#9A9389]">{amenity.copy}</p>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#C7A15A]/20 pt-8 text-center sm:flex-row sm:text-left"><div><span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C7A15A]">Outdoors, the story continues.</span><p className="mt-2 text-sm font-light text-[#9A9389]">From horseback to open water, Markhor Club extends beyond the clubhouse.</p></div><span className="hidden h-px w-12 bg-[#C7A15A]/50 sm:block" /></div>
      </Container>
    </section>
  )
}
