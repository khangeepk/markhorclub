'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react'
import Container from '../ui/Container'
import ConceptDisclaimer from '../ui/ConceptDisclaimer'

type GalleryItem = { category: string; title: string; image: string; alt: string; conceptual?: boolean }

const ITEMS: GalleryItem[] = [
  { category: 'Destination', title: 'Khanpur Dam Panorama', image: '/Assets/images/Dam View 1.jpg', alt: 'Khanpur Dam destination panorama' },
  { category: 'Arrival', title: 'Architectural Approach', image: '/Assets/images/Entrance.png', alt: 'Conceptual Markhor Club arrival approach', conceptual: true },
  { category: 'Dining', title: 'Signature Restaurant', image: '/Assets/images/Dining.png', alt: 'Conceptual Markhor Club dining environment', conceptual: true },
  { category: 'Wellness', title: 'Hydrotherapy Jacuzzi', image: '/Assets/images/Jakuzi 1.jpg', alt: 'Conceptual jacuzzi and wellness environment', conceptual: true },
  { category: 'Equestrian', title: 'Riding in the Open Air', image: '/Assets/images/horse riding 2.png', alt: 'Conceptual equestrian experience', conceptual: true },
  { category: 'Water', title: 'Open Water Boating', image: '/Assets/images/Boating 1.png', alt: 'Conceptual boating experience at Khanpur Dam', conceptual: true },
  { category: 'Family Leisure', title: 'Aqua Play for Every Age', image: '/Assets/images/Swiming Pool.jpg', alt: 'Conceptual family aqua play experience', conceptual: true },
]

function GalleryFrame({ item, index, className = '', onOpen }: { item: GalleryItem; index: number; className?: string; onOpen: (index: number) => void }) {
  return <button type="button" onClick={() => onOpen(index)} className={`group relative block w-full overflow-hidden border border-[#C7A15A]/25 bg-[#0B1C26] p-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B978] ${className}`} aria-label={`Open ${item.title} image`}><div className="relative h-full min-h-[280px] overflow-hidden sm:min-h-[360px]"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-1000 group-hover:scale-[1.025]" /><div className="absolute inset-0 bg-gradient-to-t from-[#071116]/90 via-transparent to-transparent" /><div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4"><div><span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D6B978]">{item.category}</span><h3 className="mt-2 font-serif text-2xl font-light text-[#F4F0E8] sm:text-3xl">{item.title}</h3></div><Maximize2 className="h-4 w-4 shrink-0 text-[#D6B978] opacity-70 transition group-hover:opacity-100" aria-hidden="true" /></div>{item.conceptual && <div className="absolute right-4 top-4"><ConceptDisclaimer label="Conceptual visualization" /></div>}</div></button>
}

export default function LifestyleGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const active = activeIndex === null ? null : ITEMS[activeIndex]

  useEffect(() => {
    if (activeIndex === null) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowRight') setActiveIndex((index) => index === null ? 0 : (index + 1) % ITEMS.length)
      if (event.key === 'ArrowLeft') setActiveIndex((index) => index === null ? 0 : (index - 1 + ITEMS.length) % ITEMS.length)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKeyDown) }
  }, [activeIndex])

  return <>
    <section id="gallery" className="section-space relative overflow-hidden border-t border-[#C7A15A]/20 bg-[#071116] text-[#F4F0E8]">
      <Container>
        <header className="mb-10 grid items-end gap-7 lg:mb-14 lg:grid-cols-12 lg:gap-16"><div className="lg:col-span-7"><span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D6B978] sm:text-xs">Section 08 — Visual story</span><h2 className="mt-5 font-serif text-4xl font-light leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">A DESTINATION<br /><span className="italic text-[#D6B978]">SEEN IN MOMENTS.</span></h2></div><p className="max-w-md text-sm font-light leading-relaxed text-[#9A9389] lg:col-span-5">A curated visual passage through dining, equestrian life, water, wellness, adventure and the landscape around Markhor Club.</p></header>

        <div className="relative mb-6 h-[390px] sm:h-[540px]"><GalleryFrame item={ITEMS[0]} index={0} onOpen={setActiveIndex} className="h-full" /></div>
        <div className="grid gap-6 md:grid-cols-12"><GalleryFrame item={ITEMS[1]} index={1} onOpen={setActiveIndex} className="h-[310px] md:col-span-5 md:h-[420px]" /><GalleryFrame item={ITEMS[2]} index={2} onOpen={setActiveIndex} className="h-[310px] md:col-span-7 md:mt-14 md:h-[420px]" /></div>

        <div className="my-14 border-y border-[#C7A15A]/20 py-10 text-center sm:my-20"><span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C7A15A]">Curated experience</span><p className="mx-auto mt-4 max-w-2xl font-serif text-3xl font-light leading-tight sm:text-4xl">THE LANDSCAPE SETS THE RHYTHM. THE CLUB GIVES IT MEANING.</p></div>

        <div className="grid gap-6 md:grid-cols-12"><GalleryFrame item={ITEMS[3]} index={3} onOpen={setActiveIndex} className="h-[310px] md:col-span-7 md:h-[440px]" /><GalleryFrame item={ITEMS[4]} index={4} onOpen={setActiveIndex} className="h-[310px] md:col-span-5 md:mt-16 md:h-[440px]" /></div>
        <div className="mt-6 grid gap-6 md:grid-cols-2"><GalleryFrame item={ITEMS[5]} index={5} onOpen={setActiveIndex} className="h-[320px]" /><GalleryFrame item={ITEMS[6]} index={6} onOpen={setActiveIndex} className="h-[320px]" /></div>

        <div className="mt-14 border-t border-[#C7A15A]/20 pt-8 text-center"><span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C7A15A]">The Markhor life</span><p className="mt-3 font-serif text-2xl font-light sm:text-3xl">SOME MOMENTS ARE MEANT TO BE SHARED.</p><a href="#membership" className="mt-6 inline-flex border border-[#C7A15A]/60 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D6B978] transition hover:bg-[#C7A15A]/10">Explore membership <span className="ml-3" aria-hidden="true">→</span></a></div>
      </Container>
    </section>

    {active && activeIndex !== null && <div className="fixed inset-0 z-[1100] flex items-center justify-center bg-[#04090C]/95 p-4 backdrop-blur-xl sm:p-8" role="dialog" aria-modal="true" aria-label={`${active.title} image viewer`}><button type="button" onClick={() => setActiveIndex(null)} className="absolute right-5 top-5 z-10 p-3 text-[#F4F0E8] transition hover:text-[#D6B978] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B978]" aria-label="Close image viewer"><X className="h-6 w-6" /></button><button type="button" onClick={() => setActiveIndex((activeIndex - 1 + ITEMS.length) % ITEMS.length)} className="absolute left-2 top-1/2 z-10 -translate-y-1/2 p-3 text-[#F4F0E8] transition hover:text-[#D6B978] sm:left-6" aria-label="Previous photo"><ChevronLeft className="h-7 w-7" /></button><div className="w-full max-w-5xl"><div className="relative h-[62vh] overflow-hidden border border-[#C7A15A]/30 bg-[#0B1C26] p-2"><Image src={active.image} alt={active.alt} fill sizes="90vw" className="object-contain" /></div><div className="mt-4 flex items-end justify-between gap-4"><div><span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D6B978]">{active.category}</span><h2 className="mt-1 font-serif text-2xl font-light">{active.title}</h2></div><span className="text-[10px] uppercase tracking-[0.2em] text-[#9A9389]">{String(activeIndex + 1).padStart(2, '0')} / {String(ITEMS.length).padStart(2, '0')}</span></div></div><button type="button" onClick={() => setActiveIndex((activeIndex + 1) % ITEMS.length)} className="absolute right-2 top-1/2 z-10 -translate-y-1/2 p-3 text-[#F4F0E8] transition hover:text-[#D6B978] sm:right-6" aria-label="Next photo"><ChevronRight className="h-7 w-7" /></button></div>}
  </>
}
