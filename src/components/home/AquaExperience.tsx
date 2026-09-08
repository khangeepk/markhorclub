'use client'

import React from 'react'
import Image from 'next/image'
import Container from '../ui/Container'
import ConceptDisclaimer from '../ui/ConceptDisclaimer'
import SectionWrapper from '../ui/SectionWrapper'
import { SectionEyebrow, DisplayTitle } from '../ui/Typography'
import LuxuryButton from '../ui/LuxuryButton'

const CHAPTERS = [
  {
    number: '01',
    label: 'FAMILY WATER PLAY',
    title: 'WHERE EVERY AGE FINDS A REASON TO STAY.',
    image: '/assets/images/aqua-family-play.png',
    alt: 'Conceptual family water play experience at Markhor Club',
    copy: 'Playful water spaces imagined for children, families and shared days under open skies and warm sunlight.',
  },
  {
    number: '02',
    label: 'WATER ADVENTURE',
    title: 'A LITTLE MORE ENERGY IN EVERY DROP.',
    image: '/assets/images/aqua-water-adventure.png',
    alt: 'Conceptual aquatic adventure experience at Markhor Club',
    copy: 'Movement, speed and open-air adventure bringing a dynamic, energetic rhythm to the water.',
  },
  {
    number: '03',
    label: 'POOLS & LEISURE',
    title: 'SLOWER MOMENTS BELONG HERE TOO.',
    image: '/assets/images/Swiming pool 1.jpg',
    alt: 'Resort swimming pool and leisure deck',
    copy: 'Quiet pools, shaded pauses and easy afternoons creating room to slow down, reflect and reset.',
  },
  {
    number: '04',
    label: 'FAMILY ESCAPE',
    title: 'A DAY THAT BECOMES A MEMORY.',
    image: '/assets/images/boating 1.jpg',
    alt: 'Khanpur Dam family waterfront destination',
    copy: 'A full day shaped by water, mountain scenery, leisure and the people who make it memorable.',
  },
]

export default function AquaExperience() {
  return (
    <SectionWrapper id="aqua-park" bg="midnight" padding="lg" className="relative overflow-hidden border-t border-[#C7A15A]/15 select-none">
      {/* Daylight Aquatic Glow Shift */}
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] bg-[#164E63]/20 blur-[150px]" />
      <div className="pointer-events-none absolute left-1/4 bottom-10 h-[400px] w-[400px] bg-[#D6B978]/10 blur-[120px]" />

      <Container>
        {/* Header Section */}
        <header className="relative mx-auto mb-14 max-w-3xl text-center lg:mb-20">
          <SectionEyebrow number="06" accentLine={false} className="justify-center">
            SIGNATURE DESTINATION &bull; AQUA THEME PARK
          </SectionEyebrow>

          <h2 className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.05] tracking-tight text-[#F4F0E8]">
            A WORLD BUILT<br />
            <span className="italic font-light text-gold-gradient">AROUND WATER.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm sm:text-base font-light leading-relaxed text-[#9A9389]">
            Designed for family leisure, aquatic adventure and unforgettable days under open skies, the Aqua Experience extends Markhor Club toward the waters of Khanpur Dam.
          </p>

          <div className="mt-6 flex justify-center items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D6B978]">
            <span>Family</span>
            <span className="text-[#9A9389]">&bull;</span>
            <span>Adventure</span>
            <span className="text-[#9A9389]">&bull;</span>
            <span>Recreation</span>
            <span className="text-[#9A9389]">&bull;</span>
            <span>Resort Escape</span>
          </div>
        </header>

        {/* Signature Near-Full-Screen Visual Hero Moment */}
        <div className="relative w-full aspect-[21/9] min-h-[380px] sm:min-h-[500px] overflow-hidden border border-[#C7A15A]/30 bg-[#0B1C26] p-3 shadow-2xl mb-16 lg:mb-24 rounded-none sm:rounded-sm group">
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src="/assets/images/aqua-family-play.png"
              alt="Conceptual Markhor Club signature aqua experience"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071116] via-[#071116]/25 to-transparent" />

            <div className="absolute inset-x-6 bottom-6 sm:bottom-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 z-10">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#D6B978] block mb-2">
                  RESORT POOLS & FAMILY LEISURE
                </span>
                <h3 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-[#F4F0E8] max-w-xl">
                  MAKE A DAY OF THE WATER.
                </h3>
              </div>
              <ConceptDisclaimer label="Artist's Impression" />
            </div>
          </div>
        </div>

        {/* 4 Aqua Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {CHAPTERS.map((chapter) => (
            <article
              key={chapter.number}
              className="glass-panel p-6 sm:p-8 border border-[#C7A15A]/20 bg-[#0B1C26]/70 rounded-none sm:rounded-sm space-y-5 hover:border-[#C7A15A]/40 transition-all"
            >
              <div className="relative h-60 sm:h-72 w-full overflow-hidden border border-[#C7A15A]/20">
                <Image
                  src={chapter.image}
                  alt={chapter.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/75 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 z-10">
                  <ConceptDisclaimer label="Artist's Impression" />
                </div>
              </div>

              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C7A15A]">
                  {chapter.number} &bull; {chapter.label}
                </span>
                <h3 className="font-serif text-2xl font-normal text-[#F4F0E8] mt-2 leading-tight">
                  {chapter.title}
                </h3>
                <p className="text-sm font-sans font-light text-[#9A9389] leading-relaxed mt-3">
                  {chapter.copy}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Section Handoff to Master Plan */}
        <div className="pt-8 border-t border-[#C7A15A]/20 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-[#C7A15A]">
              THE VISION CONTINUES
            </span>
            <p className="font-serif text-2xl sm:text-3xl font-light text-[#F4F0E8] mt-1">
              FROM EXPERIENCE TO A 500 KANAL VISION.
            </p>
          </div>
          <LuxuryButton href="#master-plan" variant="outline">
            EXPLORE MASTER PLAN &rarr;
          </LuxuryButton>
        </div>
      </Container>
    </SectionWrapper>
  )
}
