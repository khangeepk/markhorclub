'use client'

import React from 'react'
import Image from 'next/image'
import Container from '../ui/Container'
import ConceptDisclaimer from '../ui/ConceptDisclaimer'
import SectionWrapper from '../ui/SectionWrapper'
import { SectionEyebrow, DisplayTitle, SectionDescription } from '../ui/Typography'

const CHAPTERS = [
  { num: '01', title: 'EQUESTRIAN', mood: 'SLOW & CONFIDENT', img: '/assets/images/Horse riding 1.png' },
  { num: '02', title: 'GOLF', mood: 'CALM & FOCUS', img: '/assets/images/outdoor-golf.png' },
  { num: '03', title: 'BOATING', mood: 'FLUID & SERENE', img: '/assets/images/Boating.png' },
  { num: '04', title: 'WATER ADVENTURE', mood: 'DYNAMIC & HIGH-ENERGY', img: '/assets/images/Boating 1.png' },
  { num: '05', title: 'ZIPLINE', mood: 'VERTICAL & ELEVATED', img: '/assets/images/Zip 1.png' },
]

export default function OutdoorAdventure() {
  return (
    <SectionWrapper id="experiences" bg="midnight" padding="lg" className="border-t border-[#C7A15A]/15 select-none">
      <Container>
        {/* Section Header */}
        <header className="mx-auto mb-14 max-w-3xl text-center lg:mb-20">
          <SectionEyebrow number="05" accentLine={false} className="justify-center">
            BEYOND THE CLUBHOUSE &bull; OUTDOOR LIFESTYLE
          </SectionEyebrow>

          <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-[#F4F0E8]">
            THE OUTDOORS ARE PART OF THE CLUB.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base font-light leading-relaxed text-[#9A9389]">
            From horseback and fairways to open water and high-energy adventure, Markhor Club extends the experience into the landscape around it.
          </p>

          <div className="mt-6 flex justify-center items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D6B978]">
            <span>Ride</span>
            <span className="text-[#9A9389]">&bull;</span>
            <span>Play</span>
            <span className="text-[#9A9389]">&bull;</span>
            <span>Explore</span>
            <span className="text-[#9A9389]">&bull;</span>
            <span>Discover</span>
          </div>
        </header>

        {/* Horizontal Category Strip */}
        <div className="mb-14 hidden sm:grid grid-cols-5 border-y border-[#C7A15A]/20">
          {CHAPTERS.map((item, idx) => (
            <div
              key={item.num}
              className={`flex flex-col gap-1 px-4 py-5 text-left ${
                idx > 0 ? 'border-l border-[#C7A15A]/15' : ''
              }`}
            >
              <span className="font-serif text-base font-light text-[#D6B978]">{item.num}</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#F4F0E8]">
                {item.title}
              </span>
              <span className="text-[9px] uppercase tracking-[0.16em] text-[#9A9389]">
                {item.mood}
              </span>
            </div>
          ))}
        </div>

        {/* 1. Equestrian (Slow, Confident Movement Character) */}
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16 lg:mb-24">
          <div className="lg:col-span-7 relative h-[400px] sm:h-[500px] w-full overflow-hidden border border-[#C7A15A]/25 bg-[#0B1C26] p-2 shadow-2xl rounded-none sm:rounded-sm">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src="/assets/images/Horse riding 1.png"
                alt="Equestrian riding experience at Markhor Club"
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover object-center transition-transform duration-1000 hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 z-10">
                <ConceptDisclaimer label="Artist's Impression" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#C7A15A]">
              01 &bull; EQUESTRIAN LIFESTYLE
            </span>
            <h3 className="font-serif text-4xl sm:text-5xl font-normal leading-tight text-[#F4F0E8]">
              RIDE WITH FREEDOM.
            </h3>
            <p className="text-sm font-light leading-relaxed text-[#9A9389] max-w-md border-l border-[#C7A15A]/40 pl-4">
              A riding experience envisioned around open air, mountain trails, movement and the timeless relationship between rider and horse.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D6B978]">
              <span className="border border-[#C7A15A]/30 px-3 py-1 bg-[#0B1C26]">RIDING</span>
              <span className="border border-[#C7A15A]/30 px-3 py-1 bg-[#0B1C26]">NATURE</span>
              <span className="border border-[#C7A15A]/30 px-3 py-1 bg-[#0B1C26]">TRAILS</span>
            </div>
          </div>
        </article>

        {/* 2. Golf (Calm, Expansive Landscape Banner) */}
        <article className="group relative w-full aspect-[21/9] min-h-[320px] sm:min-h-[440px] overflow-hidden border border-[#C7A15A]/25 bg-[#0B1C26] shadow-2xl mb-16 lg:mb-24 rounded-none sm:rounded-sm">
          <Image
            src="/assets/images/outdoor-golf.png"
            alt="Golf fairway landscape at Markhor Club"
            fill
            sizes="100vw"
            className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071116] via-[#071116]/30 to-transparent" />

          <div className="absolute bottom-8 left-6 right-6 sm:bottom-12 sm:left-12 max-w-3xl z-10">
            <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#D6B978] block mb-2">
              02 &bull; GOLF & FAIRWAYS
            </span>
            <h3 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#F4F0E8]">
              A GAME OF SPACE, FOCUS AND PRESTIGE.
            </h3>
          </div>

          <div className="absolute top-6 right-6 z-10">
            <ConceptDisclaimer label="Artist's Impression" />
          </div>
        </article>

        {/* 3 & 4. Boating & Water Adventure (Fluid & Dynamic Split) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 lg:mb-24">
          {/* Boating (Fluid) */}
          <article className="border border-[#C7A15A]/20 bg-[#0B1C26] p-2 rounded-none sm:rounded-sm shadow-xl space-y-4">
            <div className="relative h-72 sm:h-96 w-full overflow-hidden">
              <Image
                src="/assets/images/Boating.png"
                alt="Boating on Khanpur Dam"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <ConceptDisclaimer label="Artist's Impression" />
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C7A15A]">
                03 &bull; BOATING & WATER ESCAPE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#F4F0E8] mt-2">
                THE WATER BECOMES THE ESCAPE.
              </h3>
              <p className="text-sm font-light leading-relaxed text-[#9A9389] mt-3">
                A relaxed water-based experience inspired by the setting of Khanpur Dam and peaceful moments beyond the shoreline.
              </p>
            </div>
          </article>

          {/* Jet Ski / Water Adventure (Dynamic) */}
          <article className="border border-[#C7A15A]/20 bg-[#0B1C26] p-2 rounded-none sm:rounded-sm shadow-xl space-y-4">
            <div className="relative h-72 sm:h-96 w-full overflow-hidden">
              <Image
                src="/assets/images/Boating 1.png"
                alt="Water adventure & jet ski on Khanpur Dam"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3">
                <ConceptDisclaimer label="Artist's Impression" />
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C7A15A]">
                04 &bull; JET SKI & WATER ADVENTURE
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#F4F0E8] mt-2">
                FOR DAYS THAT NEED MORE ENERGY.
              </h3>
              <p className="text-sm font-light leading-relaxed text-[#9A9389] mt-3">
                High-energy water sports bringing speed, open-water movement and adventure into the Markhor Club outdoor lifestyle.
              </p>
            </div>
          </article>
        </div>

        {/* 5. Zipline (Vertical Mountain Perspective) */}
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-[#C7A15A]/25 bg-[#0B1C26] p-2 lg:p-0 rounded-none sm:rounded-sm shadow-2xl">
          <div className="relative h-72 sm:h-96 lg:h-[440px] lg:col-span-7 w-full overflow-hidden">
            <Image
              src="/assets/images/Zip 1.png"
              alt="High mountain zipline experience"
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <ConceptDisclaimer label="Artist's Impression" />
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-10 space-y-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C7A15A]">
              05 &bull; MOUNTAIN ZIPLINE
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-[#F4F0E8]">
              SEE THE LANDSCAPE FROM ANOTHER ANGLE.
            </h3>
            <p className="text-sm font-light leading-relaxed text-[#9A9389]">
              An elevated adventure experience imagined to introduce height, movement and a new aerial perspective over the mountain landscape.
            </p>
          </div>
        </article>

        {/* Handoff Teaser to Aqua Park */}
        <div className="mt-16 pt-8 border-t border-[#C7A15A]/20 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#C7A15A]">
            THE NEXT HORIZON
          </span>
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#F4F0E8] mt-3">
            A WORLD BUILT AROUND WATER.
          </p>
        </div>
      </Container>
    </SectionWrapper>
  )
}
