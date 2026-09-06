'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, ArrowRight } from 'lucide-react'
import MobileMenu from './MobileMenu'

const NAV_ITEMS = [
  { label: 'CLUB', href: '#about' },
  { label: 'AMENITIES', href: '#amenities' },
  { label: 'EXPERIENCES', href: '#experiences' },
  { label: 'AQUA PARK', href: '#aqua-park' },
  { label: 'MASTER PLAN', href: '#master-plan' },
  { label: 'GALLERY', href: '#gallery' },
  { label: 'MEMBERSHIP', href: '#membership' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Header(): JSX.Element {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header className={`mh-header ${scrolled ? 'mh-scrolled' : 'mh-top'}`}>
        <div className="mx-auto flex max-w-[1440px] items-center gap-4 px-5 py-3 sm:px-8 lg:px-10">
          <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label="Markhor Club home">
            <Image
              src="/assets/logos/markhor-logo-gold.png"
              alt="Markhor Club"
              width={160}
              height={52}
              priority
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] sm:h-11"
            />
            <span className="hidden border-l border-[#D6B978]/30 pl-3 text-[9px] font-semibold uppercase tracking-[0.24em] text-[#D6B978] lg:block">
              Nature elevates living
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-7 xl:flex" aria-label="Main Navigation">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href + item.label} href={item.href} className="mh-nav-link">
                <span>{item.label}</span>
                <span className="mh-underline" aria-hidden="true" />
              </Link>
            ))}
          </nav>

          <Link
            href="#contact"
            className="group ml-auto hidden min-h-10 items-center gap-2 border border-[#C7A15A]/70 bg-[#C7A15A] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#071116] transition hover:bg-[#D6B978] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B978] xl:inline-flex"
          >
            <span>Schedule VIP Tour</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>

          <button
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(true)}
            className="ml-auto inline-flex p-2 text-[#F4F0E8] transition hover:text-[#D6B978] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B978] xl:hidden"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  )
}
