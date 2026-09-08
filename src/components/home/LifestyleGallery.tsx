'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize2, X, Sparkles } from 'lucide-react'
import Container from '../ui/Container'
import ConceptDisclaimer from '../ui/ConceptDisclaimer'

type FrameType = 'full-width' | 'portrait' | 'landscape' | 'detail' | 'negative-space'

type GalleryItem = {
  id: string
  category: string
  title: string
  subtitle: string
  image: string
  alt: string
  type: FrameType
  conceptual?: boolean
  caption?: string
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '01',
    category: 'LAKEFRONT HORIZON',
    title: 'Open Water Yacht Excursions',
    subtitle: 'Khanpur Lake Waters',
    image: '/assets/images/yatch view.png',
    alt: 'Private yacht moored on Khanpur Lake against mountain backdrop',
    type: 'full-width',
    conceptual: true,
    caption: 'Private mooring and chartered boat passages across the calm waters of Khanpur Lake.',
  },
  {
    id: '02',
    category: 'PRIVATE DINING',
    title: 'Sunset Gastronomy Salon',
    subtitle: 'Culinary Craft',
    image: '/assets/images/Dining.png',
    alt: 'Conceptual intimate private dining room with warm lighting',
    type: 'portrait',
    conceptual: true,
    caption: 'An intimate dining atmosphere where curated cuisine meets expansive lake views.',
  },
  {
    id: '03',
    category: 'HYDROTHERAPY',
    title: 'Thermal Plunge & Bathing',
    subtitle: 'Wellness Sanctuary',
    image: '/assets/images/Jakuzi 1.jpg',
    alt: 'Hydrotherapy plunge pool with stone details',
    type: 'detail',
    conceptual: true,
    caption: 'Restorative thermal suites crafted into natural mountain stone.',
  },
  {
    id: '04',
    category: 'ARCHITECTURE',
    title: 'The Ceremonial Arrival Portico',
    subtitle: 'Architectural Statement',
    image: '/assets/images/Entrance.png',
    alt: 'Conceptual arrival porte-cochere of Markhor Club',
    type: 'landscape',
    conceptual: true,
    caption: 'Framed by native stone and warm timber, the arrival sequence establishes absolute calm.',
  },
  {
    id: '05',
    category: 'EQUESTRIAN LIFE',
    title: 'Morning Trail & Riding Arenas',
    subtitle: 'Paddock Trails',
    image: '/assets/images/horse riding 2.png',
    alt: 'Equestrian rider navigating mountain terrain',
    type: 'portrait',
    conceptual: true,
    caption: 'Guided trails and equestrian facilities integrated into mountain ridges.',
  },
  {
    id: '06',
    category: 'MEMBERS SALON',
    title: 'Fireplace & Evening Gathering',
    subtitle: 'Social Sanctuary',
    image: '/assets/images/Markhor Lobby.png',
    alt: 'Warm lounge interior with grand central fireplace',
    type: 'negative-space',
    conceptual: true,
    caption: 'Quiet hearths and lounge seating for evening reflection and conversation.',
  },
  {
    id: '07',
    category: 'OPEN WATER',
    title: 'Twilight Lake Cruising',
    subtitle: 'Twilight Excursions',
    image: '/assets/images/Boating 1.png',
    alt: 'Speedboat gliding through golden hour lake light',
    type: 'landscape',
    conceptual: true,
    caption: 'Fluid motion and sunset reflections along the Khanpur Dam basin.',
  },
]

export default function LifestyleGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const active = activeIndex === null ? null : GALLERY_ITEMS[activeIndex]

  useEffect(() => {
    if (activeIndex === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowRight') setActiveIndex((idx) => (idx === null ? 0 : (idx + 1) % GALLERY_ITEMS.length))
      if (event.key === 'ArrowLeft') setActiveIndex((idx) => (idx === null ? 0 : (idx - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length))
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [activeIndex])

  return (
    <>
      <section
        id="gallery"
        className="relative overflow-hidden border-t border-[#C7A15A]/20 bg-[#071116] py-24 text-[#F4F0E8]"
      >
        {/* Subtle Ambient Vignette Lighting */}
        <div className="pointer-events-none absolute -top-40 left-1/3 h-[600px] w-[600px] rounded-full bg-[#C7A15A]/5 blur-[160px]" />
        
        <Container>
          {/* SECTION HEADER */}
          <header className="mb-16 grid items-end gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D6B978] sm:text-xs">
                Section 08 — Editorial Visual Journey
              </span>
              <h2 className="mt-4 font-serif text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl text-[#F4F0E8]">
                A DESTINATION <br />
                <span className="italic text-[#D6B978]">REVEALED IN MOMENTS.</span>
              </h2>
            </div>
            <p className="max-w-md text-sm font-light leading-relaxed text-[#9A9389] lg:col-span-5">
              An unhurried visual passage through lakefront horizons, equestrian trails, hydrotherapy sanctuaries, and evening salons at Markhor Club.
            </p>
          </header>

          {/* EDITORIAL JOURNEY COMPOSITION */}
          <div className="space-y-16 lg:space-y-24">
            
            {/* ACT I: FULL-WIDTH CINEMATIC HERO FRAME (yatch view) */}
            <div className="group relative overflow-hidden border border-[#C7A15A]/25 bg-[#0B1C26] p-3 sm:p-4 rounded-sm">
              <button
                type="button"
                onClick={() => setActiveIndex(0)}
                className="relative block h-[380px] w-full overflow-hidden text-left sm:h-[540px] focus:outline-none focus:ring-1 focus:ring-[#D6B978]"
                aria-label={`Inspect image: ${GALLERY_ITEMS[0].title}`}
              >
                <Image
                  src={GALLERY_ITEMS[0].image}
                  alt={GALLERY_ITEMS[0].alt}
                  fill
                  sizes="100vw"
                  priority
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/95 via-[#071116]/30 to-transparent" />
                
                <div className="absolute top-6 left-6 z-10 font-mono text-[10px] text-[#D6B978] tracking-widest uppercase border-b border-[#C7A15A]/30 pb-1">
                  JOURNEY CHAPTER 01
                </div>

                <div className="absolute bottom-8 left-8 right-8 z-10 flex items-end justify-between gap-6">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#D6B978]">
                      {GALLERY_ITEMS[0].category}
                    </span>
                    <h3 className="mt-2 font-serif text-3xl font-light text-[#F4F0E8] sm:text-4xl">
                      {GALLERY_ITEMS[0].title}
                    </h3>
                    <p className="mt-2 max-w-lg text-xs font-light text-[#9A9389] hidden sm:block">
                      {GALLERY_ITEMS[0].caption}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D6B978]/40 bg-[#071116]/80 text-[#D6B978] transition-all group-hover:scale-110 group-hover:bg-[#D6B978] group-hover:text-[#071116]">
                    <Maximize2 className="h-4 w-4" />
                  </div>
                </div>

                <div className="absolute right-6 top-6 z-10">
                  <ConceptDisclaimer label="Conceptual visualization" />
                </div>
              </button>
            </div>

            {/* ACT II: ASYMMETRIC PAIRING (4:5 PORTRAIT + INTIMATE CAPTIONED DETAIL) */}
            <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
              {/* Left: 4:5 Portrait Crop (Dining.png) */}
              <div className="group relative border border-[#C7A15A]/20 bg-[#0B1C26] p-3 lg:col-span-6 rounded-sm">
                <button
                  type="button"
                  onClick={() => setActiveIndex(1)}
                  className="relative block aspect-[4/5] w-full overflow-hidden text-left focus:outline-none focus:ring-1 focus:ring-[#D6B978]"
                  aria-label={`Inspect image: ${GALLERY_ITEMS[1].title}`}
                >
                  <Image
                    src={GALLERY_ITEMS[1].image}
                    alt={GALLERY_ITEMS[1].alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 48vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/90 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D6B978]">
                        {GALLERY_ITEMS[1].category}
                      </span>
                      <h3 className="mt-1 font-serif text-2xl font-light text-[#F4F0E8]">
                        {GALLERY_ITEMS[1].title}
                      </h3>
                    </div>
                    <Maximize2 className="h-4 w-4 text-[#D6B978] opacity-70 group-hover:opacity-100" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <ConceptDisclaimer label="Conceptual rendering" />
                  </div>
                </button>
              </div>

              {/* Right: Intimate Detail Frame with Generous Negative Space (Jakuzi 1.jpg) */}
              <div className="flex flex-col justify-center border border-[#C7A15A]/15 bg-[#0B1C26]/40 p-8 lg:col-span-6 lg:p-12 rounded-sm space-y-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C7A15A]">
                  INTIMATE DETAIL &bull; SPECIFICATION 03
                </div>
                <h3 className="font-serif text-3xl font-light text-[#F4F0E8] leading-tight">
                  REST &amp; HYDROTHERAPY
                </h3>
                <p className="text-xs font-light leading-relaxed text-[#9A9389]">
                  Quiet moments framed by warm timber, dark marble, and thermal water plunge pools designed for deep physical recovery.
                </p>

                <div className="group relative border border-[#C7A15A]/30 bg-[#071116] p-2 overflow-hidden max-w-md">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(2)}
                    className="relative block h-64 w-full overflow-hidden text-left focus:outline-none"
                    aria-label={`Inspect detail: ${GALLERY_ITEMS[2].title}`}
                  >
                    <Image
                      src={GALLERY_ITEMS[2].image}
                      alt={GALLERY_ITEMS[2].alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 30vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 text-[10px] font-mono text-[#D6B978]">
                      + INTIMATE DETAIL VIEW
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* INTERACTION BREAK & QUOTE */}
            <div className="my-16 border-y border-[#C7A15A]/20 py-12 text-center">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C7A15A]">
                THE UNHURRIED LIFE
              </span>
              <p className="mx-auto mt-4 max-w-2xl font-serif text-3xl font-light leading-tight sm:text-4xl text-[#F4F0E8]">
                &ldquo;THE LANDSCAPE SETS THE RHYTHM. THE CLUB GIVES IT MEANING.&rdquo;
              </p>
            </div>

            {/* ACT III: LARGE LANDSCAPE ARCHITECTURE (Entrance.png) */}
            <div className="group relative border border-[#C7A15A]/25 bg-[#0B1C26] p-3 sm:p-4 rounded-sm">
              <button
                type="button"
                onClick={() => setActiveIndex(3)}
                className="relative block h-[320px] w-full overflow-hidden text-left sm:h-[440px] focus:outline-none focus:ring-1 focus:ring-[#D6B978]"
                aria-label={`Inspect image: ${GALLERY_ITEMS[3].title}`}
              >
                <Image
                  src={GALLERY_ITEMS[3].image}
                  alt={GALLERY_ITEMS[3].alt}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/95 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#D6B978]">
                      {GALLERY_ITEMS[3].category}
                    </span>
                    <h3 className="mt-1 font-serif text-2xl font-light text-[#F4F0E8] sm:text-3xl">
                      {GALLERY_ITEMS[3].title}
                    </h3>
                  </div>
                  <Maximize2 className="h-4 w-4 text-[#D6B978] opacity-70 group-hover:opacity-100" />
                </div>
                <div className="absolute top-4 right-4">
                  <ConceptDisclaimer label="Conceptual architecture" />
                </div>
              </button>
            </div>

            {/* ACT IV: EQUESTRIAN PORTRAIT + NEGATIVE SPACE SALON + TWILIGHT CRUISE */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-8">
              {/* Equestrian 4:5 Portrait (horse riding 2.png) */}
              <div className="group relative border border-[#C7A15A]/20 bg-[#0B1C26] p-3 md:col-span-5 rounded-sm">
                <button
                  type="button"
                  onClick={() => setActiveIndex(4)}
                  className="relative block aspect-[4/5] w-full overflow-hidden text-left focus:outline-none"
                  aria-label={`Inspect image: ${GALLERY_ITEMS[4].title}`}
                >
                  <Image
                    src={GALLERY_ITEMS[4].image}
                    alt={GALLERY_ITEMS[4].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.025]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/90 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D6B978]">
                      {GALLERY_ITEMS[4].category}
                    </span>
                    <h3 className="mt-1 font-serif text-xl font-light text-[#F4F0E8]">
                      {GALLERY_ITEMS[4].title}
                    </h3>
                  </div>
                </button>
              </div>

              {/* Members Salon + Twilight Cruise Stack (7 cols) */}
              <div className="grid grid-cols-1 gap-8 md:col-span-7">
                {/* Salon (Markhor Lobby.png) */}
                <div className="group relative border border-[#C7A15A]/20 bg-[#0B1C26] p-3 rounded-sm">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(5)}
                    className="relative block h-64 w-full overflow-hidden text-left focus:outline-none"
                    aria-label={`Inspect image: ${GALLERY_ITEMS[5].title}`}
                  >
                    <Image
                      src={GALLERY_ITEMS[5].image}
                      alt={GALLERY_ITEMS[5].alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 55vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-[1.025]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/90 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D6B978]">
                        {GALLERY_ITEMS[5].category}
                      </span>
                      <h3 className="mt-1 font-serif text-xl font-light text-[#F4F0E8]">
                        {GALLERY_ITEMS[5].title}
                      </h3>
                    </div>
                  </button>
                </div>

                {/* Twilight Cruise (Boating 1.png) */}
                <div className="group relative border border-[#C7A15A]/20 bg-[#0B1C26] p-3 rounded-sm">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(6)}
                    className="relative block h-64 w-full overflow-hidden text-left focus:outline-none"
                    aria-label={`Inspect image: ${GALLERY_ITEMS[6].title}`}
                  >
                    <Image
                      src={GALLERY_ITEMS[6].image}
                      alt={GALLERY_ITEMS[6].alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 55vw"
                      className="object-cover transition-transform duration-1000 group-hover:scale-[1.025]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/90 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D6B978]">
                        {GALLERY_ITEMS[6].category}
                      </span>
                      <h3 className="mt-1 font-serif text-xl font-light text-[#F4F0E8]">
                        {GALLERY_ITEMS[6].title}
                      </h3>
                    </div>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* CLOSING CALL TO MEMBERSHIP */}
          <div className="mt-20 border-t border-[#C7A15A]/20 pt-10 text-center">
            <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#C7A15A]">
              THE MARKHOR LIFE
            </span>
            <p className="mt-3 font-serif text-2xl font-light sm:text-3xl text-[#F4F0E8]">
              SOME MOMENTS ARE MEANT TO BE LIVED.
            </p>
            <a
              href="#membership"
              className="mt-6 inline-flex border border-[#C7A15A]/60 px-6 py-3 text-[10px] font-mono uppercase tracking-[0.2em] text-[#D6B978] transition hover:bg-[#C7A15A]/10"
            >
              EXPLORE MEMBERSHIP INVITATION <span className="ml-3" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </Container>
      </section>

      {/* FULLSCREEN LIGHTBOX READER MODAL */}
      {active && activeIndex !== null && (
        <div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-[#04090C]/95 p-4 backdrop-blur-xl sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title} image viewer`}
        >
          <button
            type="button"
            onClick={() => setActiveIndex(null)}
            className="absolute right-5 top-5 z-20 p-3 text-[#F4F0E8] transition hover:text-[#D6B978] focus:outline-none"
            aria-label="Close image viewer"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={() =>
              setActiveIndex((activeIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length)
            }
            className="absolute left-3 top-1/2 z-20 -translate-y-1/2 p-3 text-[#F4F0E8] transition hover:text-[#D6B978] sm:left-6"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <div className="w-full max-w-5xl">
            <div className="relative h-[65vh] w-full overflow-hidden border border-[#C7A15A]/30 bg-[#0B1C26] p-2">
              <Image
                src={active.image}
                alt={active.alt}
                fill
                sizes="95vw"
                className="object-contain"
              />
            </div>
            <div className="mt-4 flex items-end justify-between gap-4 font-mono">
              <div>
                <span className="text-[10px] uppercase tracking-[0.22em] text-[#D6B978]">
                  {active.category} &bull; {active.subtitle}
                </span>
                <h2 className="mt-1 font-serif text-2xl font-light text-[#F4F0E8]">
                  {active.title}
                </h2>
                {active.caption && (
                  <p className="mt-1 text-xs text-[#9A9389] font-light max-w-xl">
                    {active.caption}
                  </p>
                )}
              </div>
              <span className="text-xs uppercase tracking-[0.2em] text-[#9A9389]">
                {String(activeIndex + 1).padStart(2, '0')} / {String(GALLERY_ITEMS.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveIndex((activeIndex + 1) % GALLERY_ITEMS.length)}
            className="absolute right-3 top-1/2 z-20 -translate-y-1/2 p-3 text-[#F4F0E8] transition hover:text-[#D6B978] sm:right-6"
            aria-label="Next image"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </>
  )
}

