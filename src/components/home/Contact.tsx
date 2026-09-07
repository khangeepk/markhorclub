import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Mail, Phone } from 'lucide-react'
import Container from '../ui/Container'
import ConceptDisclaimer from '../ui/ConceptDisclaimer'

export default function Contact() {
  return (
    <section id="contact" className="section-space-compact relative overflow-hidden border-t border-[#C7A15A]/20 bg-[#0B1C26] text-[#F4F0E8]">
      <div className="pointer-events-none absolute -right-32 top-16 h-96 w-96 bg-[#164E63]/20 blur-[130px]" />
      <Container>
        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="relative min-h-[420px] overflow-hidden border border-[#C7A15A]/25 bg-[#071116] p-3 lg:col-span-7">
            <div className="relative h-full min-h-[394px] overflow-hidden">
              <Image src="/assets/images/Dam View.png" alt="Khanpur Dam destination view" fill sizes="(max-width: 1024px) 100vw, 58vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071116] via-[#071116]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#C7A15A]">Khanpur Dam · KPK</span>
                  <h2 className="mt-3 max-w-xl font-serif text-4xl font-light leading-tight sm:text-5xl">COME CLOSER TO THE DESTINATION.</h2>
                </div>
                <ConceptDisclaimer label="Artist's Impression" />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D6B978] sm:text-xs">Section 10 — Contact / Book a Visit</span>
            <h2 className="mt-5 font-serif text-4xl font-light leading-[1.06] sm:text-5xl">LET&apos;S BEGIN<br /><span className="italic text-[#D6B978]">THE CONVERSATION.</span></h2>
            <p className="mt-6 max-w-md text-sm font-light leading-relaxed text-[#9A9389]">For current destination, membership or visit information, speak with the Markhor Club team.</p>

            <div className="mt-8 border-y border-[#C7A15A]/20 py-6 text-sm text-[#D9E4EB]">
              <div className="flex gap-4"><span className="w-24 shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C7A15A]">Location</span><span>Near Alexander Road<br />Khanpur Dam · KPK · Pakistan</span></div>
              <div className="mt-5 flex gap-4"><span className="w-24 shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C7A15A]">Access</span><span>Approx. 2 KM from Alexander Road<br />Khanpur Dam View Facing</span></div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-[#D9E4EB]">
              <a href="tel:0995111222333" className="flex items-center gap-3 transition hover:text-[#D6B978]"><Phone className="h-4 w-4 text-[#D6B978]" aria-hidden="true" /><span>0995-111-222-333</span></a>
              <a href="mailto:info@markhourgroup.com" className="flex items-center gap-3 transition hover:text-[#D6B978]"><Mail className="h-4 w-4 text-[#D6B978]" aria-hidden="true" /><span>info@markhourgroup.com</span></a>
              <a href="https://www.markhourgroup.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 transition hover:text-[#D6B978]"><span className="w-4 text-center text-[10px] text-[#D6B978]" aria-hidden="true">↗</span><span>www.markhourgroup.com</span></a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#membership" className="group inline-flex items-center gap-3 bg-[#C7A15A] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#071116] transition hover:bg-[#D6B978] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B978]">Book a visit <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" /></Link>
              <Link href="#membership" className="inline-flex items-center border border-[#C7A15A]/60 px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#D6B978] transition hover:bg-[#C7A15A]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B978]">Membership inquiry</Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
