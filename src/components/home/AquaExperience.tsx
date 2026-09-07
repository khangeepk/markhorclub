'use client'

import React from 'react'
import Image from 'next/image'
import Container from '../ui/Container'
import ConceptDisclaimer from '../ui/ConceptDisclaimer'

const CHAPTERS = [
  {
    number: '01',
    label: 'FAMILY WATER PLAY',
    title: 'WHERE EVERY AGE FINDS A REASON TO STAY.',
    image: '/assets/images/aqua-family-play.png',
    alt: 'Conceptual family water play experience',
    copy: 'Playful water spaces imagined for children, families and shared days under the open sky.',
  },
  {
    number: '02',
    label: 'WATER ADVENTURE',
    title: 'A LITTLE MORE ENERGY IN EVERY DROP.',
    image: '/assets/images/aqua-water-adventure.png',
    alt: 'Conceptual water adventure experience',
    copy: 'Movement, speed and open-air adventure bring a more energetic rhythm to the water.',
  },
  {
    number: '03',
    label: 'POOLS & LEISURE',
    title: 'SLOWER MOMENTS BELONG HERE TOO.',
    image: '/assets/images/Gym 1.png',
    alt: 'Swimming pool and leisure experience',
    copy: 'Quiet pools, shaded pauses and easy afternoons create room to slow down and reset.',
  },
  {
    number: '04',
    label: 'FAMILY ESCAPE',
    title: 'A DAY THAT BECOMES A MEMORY.',
    image: '/assets/images/boating.jpg',
    alt: 'Khanpur Dam view for a family day destination',
    copy: 'A full day shaped by water, landscape, leisure and the people who make it memorable.',
  },
]

function ChapterRow({ chapter, reverse = false }: { chapter: typeof CHAPTERS[number]; reverse?: boolean }) {
  return (
    <article className={`grid items-center gap-7 border-t border-[#C7A15A]/20 py-8 lg:grid-cols-12 lg:gap-10 lg:py-10 ${reverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
      <div className="lg:col-span-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C7A15A]">{chapter.number} — {chapter.label}</span>
        <h3 className="mt-3 max-w-md font-serif text-2xl font-light leading-tight text-[#F4F0E8] sm:text-3xl">{chapter.title}</h3>
        <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-[#9A9389]">{chapter.copy}</p>
        <div className="mt-6 h-px w-16 bg-[#D6B978]" aria-hidden="true" />
      </div>
      <div className="relative h-60 overflow-hidden border border-[#C7A15A]/25 bg-[#0B1C26] p-2 sm:h-72 lg:col-span-7 lg:h-[330px]">
        <div className="relative h-full overflow-hidden">
          <Image src={chapter.image} alt={chapter.alt} fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover transition duration-1000 hover:scale-[1.025]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/65 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4"><ConceptDisclaimer label="Artist's Impression" /></div>
        </div>
      </div>
    </article>
  )
}

export default function AquaExperience() {
  return (
    <section id="aqua-park" className="section-space-compact relative overflow-hidden bg-[#071116] text-[#F4F0E8]">
      <div className="pointer-events-none absolute right-0 top-0 h-[520px] w-[520px] bg-[#164E63]/20 blur-[140px]" />
      <Container>
        <header className="relative mx-auto mb-10 max-w-3xl text-center lg:mb-14">
          <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D6B978] sm:text-xs">Signature destination</span>
          <h2 className="mt-4 font-serif text-4xl font-normal leading-[1.05] tracking-tight text-[#F4F0E8] sm:text-5xl lg:text-6xl">
            A WORLD BUILT<br className="hidden sm:block" /> <span className="italic font-light text-[#D6B978]">AROUND WATER.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-relaxed text-[#9A9389] sm:text-base">
            Designed for family leisure, aquatic adventure and unforgettable days under the open sky, the Aqua Experience extends Markhor Club toward Khanpur Dam.
          </p>
          <div className="mt-6 flex justify-center gap-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D6B978]">
            <span>Family</span><span className="text-[#9A9389]">·</span><span>Adventure</span><span className="text-[#9A9389]">·</span><span>Recreation</span><span className="text-[#9A9389]">·</span><span>Escape</span>
          </div>
        </header>

        <div className="relative mb-10 hidden h-[500px] overflow-hidden border border-[#C7A15A]/30 bg-[#0B1C26] p-3 lg:block">
          <div className="relative h-full overflow-hidden">
            <Image src="/assets/images/aqua-family-play.png" alt="Conceptual Markhor Club aqua experience" fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071116] via-[#071116]/20 to-transparent" />
            <div className="absolute inset-x-8 bottom-8 flex items-end justify-between gap-8">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#D6B978]">Resort pools &amp; family leisure</span>
                <h3 className="mt-2 max-w-xl font-serif text-4xl font-light leading-tight text-[#F4F0E8] xl:text-5xl">MAKE A DAY OF THE WATER.</h3>
              </div>
              <ConceptDisclaimer label="Artist's Impression" />
            </div>
          </div>
        </div>

        <div className="hidden lg:block">
          {CHAPTERS.map((chapter, index) => <ChapterRow key={chapter.number} chapter={chapter} reverse={index % 2 === 1} />)}
        </div>

        <div className="lg:hidden">
          <div className="relative h-[320px] overflow-hidden border border-[#C7A15A]/30 bg-[#0B1C26] p-2">
            <div className="relative h-full overflow-hidden">
              <Image src="/assets/images/aqua-family-play.png" alt="Conceptual Markhor Club aqua experience" fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071116] via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D6B978]">Resort pools &amp; family leisure</span>
                <h3 className="mt-2 font-serif text-3xl font-light leading-tight">MAKE A DAY OF THE WATER.</h3>
              </div>
            </div>
          </div>
          <div className="mt-8">
            {CHAPTERS.map((chapter, index) => (
              <article key={chapter.number} className="border-t border-[#C7A15A]/20 py-8">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C7A15A]">{chapter.number} — {chapter.label}</span>
                <h3 className="mt-3 font-serif text-2xl font-light leading-tight text-[#F4F0E8]">{chapter.title}</h3>
                <p className="mt-3 text-sm font-light leading-relaxed text-[#9A9389]">{chapter.copy}</p>
                <div className="relative mt-6 h-56 overflow-hidden border border-[#C7A15A]/25 bg-[#0B1C26] p-2">
                  <div className="relative h-full overflow-hidden">
                    <Image src={chapter.image} alt={chapter.alt} fill sizes="100vw" className="object-cover" />
                    <div className="absolute bottom-3 left-3"><ConceptDisclaimer label="Artist's Impression" /></div>
                  </div>
                </div>
                {index === CHAPTERS.length - 1 && <div className="mt-8 h-px w-12 bg-[#D6B978]" aria-hidden="true" />}
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 border-t border-[#C7A15A]/20 pt-8 text-center">
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C7A15A]">The vision continues</span>
          <p className="mt-3 font-serif text-2xl font-light text-[#F4F0E8] sm:text-3xl">FROM EXPERIENCE TO A 500 KANAL VISION.</p>
          <a href="#master-plan" className="mt-5 inline-flex border border-[#C7A15A]/60 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D6B978] transition hover:bg-[#C7A15A]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B978]">Explore the master plan <span className="ml-3" aria-hidden="true">→</span></a>
        </div>
      </Container>
    </section>
  )
}
