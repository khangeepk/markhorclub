import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Container from '../ui/Container'

const FOOTER_NAV = [
  ['Club', '#about'],
  ['Amenities', '#amenities'],
  ['Experiences', '#experiences'],
  ['Aqua Park', '#aqua-park'],
  ['Master Plan', '#master-plan'],
  ['Gallery', '#gallery'],
  ['Membership', '#membership'],
  ['Contact', '#contact'],
]

export default function Footer() {
  return (
    <footer className="section-space-compact relative overflow-hidden border-t border-[#C7A15A]/25 bg-[#04090C] text-[#F4F0E8]">
      <div className="pointer-events-none absolute -right-10 bottom-[-180px] select-none font-serif text-[22rem] font-light leading-none text-[#C7A15A]/[0.035]">M</div>
      <Container>
        <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center" aria-label="Markhor Club home">
              <Image src="/assets/logos/markhor-logo-gold.png" alt="Markhor Club" width={160} height={56} className="h-12 w-auto object-contain" />
            </Link>
            <p className="mt-6 max-w-md font-serif text-2xl font-light leading-tight text-[#D9E4EB] sm:text-3xl">Nature elevates living.</p>
            <p className="mt-4 max-w-sm text-sm font-light leading-relaxed text-[#9A9389]">A 500 Kanal destination near Alexander Road, Khanpur Dam, KPK, Pakistan.</p>
          </div>

          <nav aria-label="Footer navigation" className="lg:col-span-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C7A15A]">Explore Markhor Club</span>
            <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3">
              {FOOTER_NAV.map(([label, href]) => <Link key={href} href={href} className="group flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#9A9389] transition hover:text-[#D6B978]"><span>{label}</span><ArrowUpRight className="h-3 w-3 opacity-0 transition group-hover:opacity-100" aria-hidden="true" /></Link>)}
            </div>
          </nav>

          <div className="lg:col-span-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C7A15A]">Contact</span>
            <div className="mt-5 space-y-3 text-sm text-[#9A9389]">
              <a href="tel:0995111222333" className="block transition hover:text-[#D6B978]">0995-111-222-333</a>
              <a href="mailto:info@markhourgroup.com" className="block transition hover:text-[#D6B978]">info@markhourgroup.com</a>
              <a href="https://www.markhourgroup.com" target="_blank" rel="noopener noreferrer" className="block transition hover:text-[#D6B978]">www.markhourgroup.com</a>
            </div>
          </div>
        </div>

        <div className="relative mt-12 flex flex-col gap-4 border-t border-[#C7A15A]/20 pt-6 text-[10px] uppercase tracking-[0.16em] text-[#9A9389]/70 sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Markhor Group Pvt. Ltd.</span>
          <span>Near Alexander Road · Khanpur Dam · KPK · Pakistan</span>
          <div className="flex gap-5"><span>Privacy statement</span><span>Terms of membership</span></div>
        </div>
      </Container>
    </footer>
  )
}
