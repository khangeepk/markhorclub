'use client'

import React from 'react'
import Image from 'next/image'
import Container from '../ui/Container'
import ConceptDisclaimer from '../ui/ConceptDisclaimer'

const PILLARS = [
  ['01', 'Nature', 'Mountain ridgelines, open space and the waters of Khanpur Dam.'],
  ['02', 'Leisure', 'Dining, terraces and unhurried moments made for connection.'],
  ['03', 'Wellness', 'Fitness, jacuzzi and restorative spaces woven into the day.'],
  ['04', 'Adventure', 'Equestrian, golf, boating and water-led exploration.'],
  ['05', 'Community', 'A setting for families, members, guests and shared memories.'],
]

export default function BrandStory() {
  return (
    <section id="about" className="section-space relative overflow-hidden border-t border-[#C7A15A]/15 bg-[#071116] text-[#F4F0E8]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(199,161,90,0.08),transparent_32%)]" />
      <Container>
        <header className="relative mb-12 lg:mb-16">
          <div className="mb-6 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D6B978] sm:text-xs">
            <Image src="/assets/logos/markhor-logo-gold.png" alt="" width={42} height={42} className="h-9 w-9 object-contain opacity-90" aria-hidden="true" />
            <span>The Markhor Vision</span>
            <span className="h-px w-12 bg-[#C7A15A]/50" aria-hidden="true" />
            <span className="hidden text-[#9A9389]/70 sm:inline">Vol. I — Chapter 02</span>
          </div>
          <div className="grid items-start gap-8 lg:grid-cols-12 lg:gap-16">
            <h2 className="font-serif text-4xl font-normal leading-[1.08] tracking-tight text-[#F4F0E8] sm:text-5xl lg:col-span-7 lg:text-6xl">
              MORE THAN A CLUB.<br />
              <span className="italic font-light text-[#D6B978]">A WAY OF LIVING.</span>
            </h2>
            <div className="space-y-5 lg:col-span-5 lg:pt-2">
              <p className="font-serif text-lg leading-relaxed text-[#D9E4EB] sm:text-xl">
                Markhor Club brings together nature, recreation, wellness and social life within one destination overlooking Khanpur Dam.
              </p>
              <p className="border-l border-[#C7A15A]/40 pl-4 text-sm font-light leading-relaxed tracking-wide text-[#9A9389]">
                Across 500 Kanal, the vision is to create a place where families, members and guests can reconnect with the outdoors, with experiences, and with one another.
              </p>
            </div>
          </div>
        </header>

        <div className="relative mb-14 grid items-stretch gap-8 lg:grid-cols-12">
          <figure className="group relative overflow-hidden border border-[#C7A15A]/25 bg-[#0B1C26] p-2 shadow-2xl sm:p-3 lg:col-span-7">
            <div className="relative h-[360px] overflow-hidden sm:h-[480px] lg:h-[560px]">
              <Image src="/assets/images/Markhor Statue.png" alt="Markhor Club statue and clubhouse arrival" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition duration-1000 group-hover:scale-[1.025]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/80 via-transparent to-[#071116]/10" />
              <div className="absolute bottom-5 left-5"><ConceptDisclaimer label="Artist's Impression" /></div>
            </div>
            <figcaption className="flex items-end justify-between gap-4 px-1 pt-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C7A15A]">Plate I — The Markhor Vision</span>
              <span className="hidden text-[10px] uppercase tracking-[0.22em] text-[#9A9389]/60 sm:inline">01 // 03</span>
            </figcaption>
          </figure>
          <div className="flex flex-col gap-8 lg:col-span-5 lg:gap-10">
            <figure className="group border border-[#C7A15A]/20 bg-[#0B1C26] p-2 shadow-xl">
              <div className="relative h-56 overflow-hidden sm:h-72">
                <Image src="/assets/images/Markhor Lobby.png" alt="Markhor Club social lobby environment" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover transition duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/75 via-transparent to-transparent" />
              </div>
              <figcaption className="pt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C7A15A]">Plate II — Leisure & Connection</figcaption>
            </figure>
            <figure className="group border border-[#C7A15A]/20 bg-[#0B1C26] p-2 shadow-xl">
              <div className="relative h-56 overflow-hidden sm:h-64">
                <Image src="/assets/images/yatch view.png" alt="Markhor Club yacht-side water escape" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover transition duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/65 via-transparent to-transparent" />
              </div>
              <figcaption className="pt-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C7A15A]">Plate III — Water &amp; Escape</figcaption>
            </figure>
          </div>
        </div>

        <div className="border-t border-b border-[#C7A15A]/20 py-8 sm:py-10">
          <div className="mb-7 flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C7A15A]">The five pillars</span>
              <h3 className="mt-1 font-serif text-2xl font-light text-[#F4F0E8] sm:text-3xl">Foundations of the destination</h3>
            </div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#9A9389]/70">Curated experiences &amp; facilities</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5">
            {PILLARS.map(([number, title, description], index) => (
              <div key={number} className={`group px-4 py-6 transition-colors hover:bg-[#0B1C26]/70 sm:px-5 ${index > 0 ? 'border-l border-[#C7A15A]/20' : ''} ${index === 4 ? 'col-span-2 md:col-span-1' : ''}`}>
                <span className="font-serif text-xl font-light text-[#D6B978]">{number}</span>
                <h4 className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#F4F0E8] group-hover:text-[#D6B978]">{title}</h4>
                <p className="mt-2 text-[11px] font-light leading-relaxed text-[#9A9389]">{description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-6 text-center md:grid-cols-4 md:text-left">
          {[
            ['Estate scale', '500 Kanal'],
            ['Access & connectivity', 'Approx. 2 KM from Alexander Road'],
            ['Geographic orientation', 'Khanpur Dam View Facing'],
            ['Province & region', 'Khyber Pakhtunkhwa, Pakistan'],
          ].map(([label, value]) => (
            <div key={label} className="space-y-1">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C7A15A]">{label}</span>
              <span className="font-serif text-base font-light text-[#D9E4EB] sm:text-lg">{value}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
