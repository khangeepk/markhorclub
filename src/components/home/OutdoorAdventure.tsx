'use client'

import React from 'react'
import Image from 'next/image'
import Container from '../ui/Container'
import ConceptDisclaimer from '../ui/ConceptDisclaimer'

const CHAPTERS = [
  ['01', 'EQUESTRIAN'],
  ['02', 'GOLF'],
  ['03', 'BOATING'],
  ['04', 'WATER ADVENTURE'],
  ['05', 'ZIPLINE'],
]

export default function OutdoorAdventure() {
  return (
    <section id="experiences" className="section-space-compact relative overflow-hidden bg-[#071116] text-[#F4F0E8]">
      <Container>
        <header className="mx-auto mb-12 max-w-3xl text-center lg:mb-16">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D6B978] sm:text-xs">Beyond the clubhouse</span>
          <h2 className="mt-4 font-serif text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">THE OUTDOORS ARE PART OF THE CLUB.</h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-relaxed text-[#9A9389] sm:text-base">From horseback and fairways to open water and high-energy adventure, Markhor Club extends the experience into the landscape around it.</p>
          <div className="mt-6 text-[10px] font-semibold uppercase tracking-[0.23em] text-[#D6B978]">Ride · Play · Explore · Discover</div>
        </header>

        <div className="mb-12 grid grid-cols-2 border-y border-[#C7A15A]/20 sm:grid-cols-5">
          {CHAPTERS.map(([number, label], index) => (
            <div key={number} className={`flex items-center gap-3 px-3 py-4 text-[10px] font-semibold uppercase tracking-[0.16em] ${index > 0 ? 'border-l border-[#C7A15A]/20' : ''} ${index === 4 ? 'text-[#D6B978]' : 'text-[#9A9389]'}`}>
              <span className="font-serif text-base font-light">{number}</span><span>{label}</span>
            </div>
          ))}
        </div>

        <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="relative h-[430px] overflow-hidden border border-[#C7A15A]/25 bg-[#0B1C26] p-2 sm:h-[520px] lg:col-span-7">
            <div className="relative h-full overflow-hidden">
              <Image src="/Assets/images/Horse riding 1.png" alt="Conceptual equestrian experience at Markhor Club" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4"><ConceptDisclaimer label="Artist's Impression" /></div>
            </div>
          </div>
          <div className="lg:col-span-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C7A15A]">01 — Equestrian</span>
            <h3 className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl">RIDE WITH FREEDOM.</h3>
            <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-[#9A9389]">A riding experience envisioned around open air, movement and the timeless relationship between rider and horse.</p>
            <div className="mt-7 flex gap-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D6B978]"><span>Riding</span><span>Nature</span><span>Equestrian lifestyle</span></div>
          </div>
        </article>

        <article className="group relative mt-12 h-[330px] overflow-hidden border border-[#C7A15A]/25 bg-[#0B1C26] sm:h-[440px] lg:mt-16">
          <Image src="/Assets/images/outdoor-golf.png" alt="Conceptual golf experience at Markhor Club" fill sizes="100vw" className="object-cover transition duration-1000 group-hover:scale-[1.02]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071116] via-[#071116]/20 to-transparent" />
          <div className="absolute bottom-7 left-6 right-6 sm:bottom-10 sm:left-10"><span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C7A15A]">02 — Golf</span><h3 className="mt-3 max-w-2xl font-serif text-3xl font-light sm:text-5xl">A GAME OF SPACE, FOCUS AND PRESTIGE.</h3></div>
          <div className="absolute right-5 top-5"><ConceptDisclaimer label="Artist's Impression" /></div>
        </article>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16">
          <article className="border border-[#C7A15A]/20 bg-[#0B1C26] p-2"><div className="relative h-72 overflow-hidden sm:h-96"><Image src="/Assets/images/Boating.png" alt="Conceptual boating experience at Khanpur Dam" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /><div className="absolute bottom-4 left-4"><ConceptDisclaimer label="Artist's Impression" /></div></div><div className="p-5 sm:p-7"><span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C7A15A]">03 — Boating</span><h3 className="mt-3 font-serif text-2xl font-light sm:text-3xl">THE WATER BECOMES THE ESCAPE.</h3><p className="mt-3 text-sm font-light leading-relaxed text-[#9A9389]">A relaxed water-based experience inspired by the setting of Khanpur Dam and time beyond the shoreline.</p></div></article>
          <article className="border border-[#C7A15A]/20 bg-[#0B1C26] p-2"><div className="relative h-72 overflow-hidden sm:h-96"><Image src="/Assets/images/Boating 1.png" alt="Conceptual water adventure experience at Khanpur Dam" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" /><div className="absolute bottom-4 left-4"><ConceptDisclaimer label="Artist's Impression" /></div></div><div className="p-5 sm:p-7"><span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C7A15A]">04 — Water adventure</span><h3 className="mt-3 font-serif text-2xl font-light sm:text-3xl">FOR THE DAYS THAT NEED MORE ENERGY.</h3><p className="mt-3 text-sm font-light leading-relaxed text-[#9A9389]">A high-energy water experience bringing speed, movement and adventure into the Markhor Club lifestyle.</p></div></article>
        </div>

        <article className="mt-12 grid items-stretch gap-8 border border-[#C7A15A]/25 bg-[#0B1C26] p-2 lg:grid-cols-12 lg:gap-0 lg:p-0 lg:mt-16">
          <div className="relative h-72 overflow-hidden sm:h-96 lg:col-span-7 lg:h-[430px]"><Image src="/Assets/images/Zip 2.png" alt="Conceptual zipline experience at Markhor Club" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" /><div className="absolute bottom-4 left-4"><ConceptDisclaimer label="Artist's Impression" /></div></div>
          <div className="flex flex-col justify-center px-5 pb-6 sm:px-8 sm:pb-8 lg:col-span-5 lg:p-12"><span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C7A15A]">05 — Zipline</span><h3 className="mt-3 font-serif text-3xl font-light leading-tight sm:text-4xl">SEE THE LANDSCAPE FROM ANOTHER ANGLE.</h3><p className="mt-4 text-sm font-light leading-relaxed text-[#9A9389]">An adventure experience imagined to introduce height, movement and a new perspective on the natural setting.</p></div>
        </article>

        <div className="mt-14 border-t border-[#C7A15A]/20 pt-8 text-center"><span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C7A15A]">The next horizon</span><p className="mt-3 font-serif text-2xl font-light sm:text-3xl">A WORLD BUILT AROUND WATER.</p></div>
      </Container>
    </section>
  )
}
