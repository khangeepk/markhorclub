'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUp, ArrowUpRight, Phone, Mail, MapPin } from 'lucide-react'
import Container from '../ui/Container'
import { MEMBERSHIP_CONFIG } from '../../config/membership'

const FOOTER_NAV = [
  { label: 'Club Vision', href: '#about' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Outdoor Adventure', href: '#experiences' },
  { label: 'Aqua Theme Park', href: '#aqua-park' },
  { label: '500 Kanal Master Plan', href: '#master-plan' },
  { label: 'Lifestyle Gallery', href: '#gallery' },
  { label: 'Private Membership', href: '#membership' },
  { label: 'Destination & Contact', href: '#contact' },
]

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative overflow-hidden border-t border-[#C7A15A]/25 bg-[#04090C] py-20 text-[#F4F0E8]">
      {/* Subtle Oversized Markhor Watermark Wordmark */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 select-none font-serif text-[18vw] font-light leading-none text-[#C7A15A]/[0.025] whitespace-nowrap tracking-tight"
        aria-hidden="true"
      >
        MARKHOR CLUB
      </div>

      <Container>
        {/* TOP BRAND & STATEMENT ROW */}
        <div className="relative mb-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="inline-block focus:outline-none focus:ring-1 focus:ring-[#D6B978]" aria-label="Markhor Club Homepage">
              <Image
                src="/assets/logos/markhor-logo-gold.png"
                alt="Markhor Club"
                width={160}
                height={56}
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="font-serif text-3xl font-light text-[#F4F0E8] leading-tight sm:text-4xl">
              NATURE ELEVATES LIVING.
            </p>
            <p className="max-w-md text-xs font-light leading-relaxed text-[#9A9389]">
              An integrated 500 Kanal destination near Alexander Road, Khanpur Dam, KPK, Pakistan. Crafted for connection, privacy, and generations of club living.
            </p>
          </div>

          {/* MINIMAL NAVIGATION MATRIX (4 COLS) */}
          <nav aria-label="Footer navigation" className="lg:col-span-4 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C7A15A]">
              DESTINATION DIRECTORY
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 font-mono text-xs">
              {FOOTER_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center gap-2 text-[#9A9389] transition-colors duration-300 hover:text-[#D6B978] focus:outline-none focus:text-[#D6B978]"
                >
                  <span className="uppercase tracking-wider">{item.label}</span>
                  <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#D6B978]" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </nav>

          {/* CONCIERGE INFORMATION (3 COLS) */}
          <div className="lg:col-span-3 space-y-4 font-mono text-xs">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C7A15A]">
              CONCIERGE DESK
            </span>
            <div className="space-y-3 text-[#9A9389]">
              <a
                href={`tel:${MEMBERSHIP_CONFIG.uanPhone}`}
                className="flex items-center gap-2 transition-colors hover:text-[#D6B978] focus:outline-none"
              >
                <Phone className="h-3.5 w-3.5 text-[#D6B978]" />
                <span>UAN: {MEMBERSHIP_CONFIG.uanPhone}</span>
              </a>
              <a
                href={`mailto:${MEMBERSHIP_CONFIG.contactEmail}`}
                className="flex items-center gap-2 transition-colors hover:text-[#D6B978] focus:outline-none"
              >
                <Mail className="h-3.5 w-3.5 text-[#D6B978]" />
                <span>{MEMBERSHIP_CONFIG.contactEmail}</span>
              </a>
              <div className="flex items-start gap-2 pt-1 text-[11px] font-sans font-light leading-relaxed text-[#9A9389]/80">
                <MapPin className="h-3.5 w-3.5 text-[#D6B978] shrink-0 mt-0.5" />
                <span>Near Alexander Road, Khanpur Dam, KPK, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM METADATA & BACK TO TOP BAR */}
        <div className="relative mt-12 flex flex-col gap-6 border-t border-[#C7A15A]/20 pt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-[#9A9389]/70 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <span>&copy; {new Date().getFullYear()} Markhor Group Pvt. Ltd. All rights reserved.</span>
            <span className="hidden sm:inline text-[#C7A15A]/40">&bull;</span>
            <span>Khanpur Dam Estate</span>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-6">
            <div className="flex gap-4 text-[#9A9389]">
              <span className="hover:text-[#F4F0E8] cursor-pointer transition-colors">Privacy Policy</span>
              <span>&bull;</span>
              <span className="hover:text-[#F4F0E8] cursor-pointer transition-colors">Terms of Membership</span>
            </div>

            {/* Back to top button */}
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Scroll back to top of page"
              className="flex items-center gap-2 border border-[#C7A15A]/30 bg-[#071116] px-3 py-2 text-[#D6B978] transition-all hover:border-[#D6B978] hover:bg-[#D6B978] hover:text-[#071116] focus:outline-none focus:ring-1 focus:ring-[#D6B978]"
            >
              <span>TOP</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  )
}

