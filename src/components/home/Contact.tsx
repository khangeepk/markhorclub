'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Phone, Mail, MapPin, Calendar, MessageCircle, Compass, CheckCircle2 } from 'lucide-react'
import Container from '../ui/Container'
import ConceptDisclaimer from '../ui/ConceptDisclaimer'
import { MEMBERSHIP_CONFIG } from '../../config/membership'

export default function Contact() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER || '+923305230888'
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '')
  const whatsappMessage = 'Hello Markhor Club Concierge, I would like to book a visit to Khanpur Dam.'
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(whatsappMessage)}`

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-[#C7A15A]/20 bg-[#0B1C26] py-24 text-[#F4F0E8]"
    >
      {/* Ambient Lighting Glow */}
      <div className="pointer-events-none absolute -right-32 top-16 h-96 w-96 rounded-full bg-[#164E63]/15 blur-[140px]" />
      
      <Container>
        <div className="grid grid-cols-1 items-stretch gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* LEFT: DESTINATION CANVAS (7 COLS) */}
          <div className="relative min-h-[460px] overflow-hidden border border-[#C7A15A]/30 bg-[#071116] p-3 lg:col-span-7 rounded-sm group">
            <div className="relative h-full min-h-[440px] w-full overflow-hidden">
              <Image
                src="/assets/images/Dam View.png"
                alt="Khanpur Dam destination panorama view"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071116] via-[#071116]/30 to-transparent" />
              
              {/* Corner Crosshair Metadata */}
              <div className="absolute top-4 left-4 z-10 font-mono text-[9px] text-[#D6B978] uppercase tracking-widest border-b border-[#C7A15A]/30 pb-1">
                LOCATION: KHANPUR DAM &bull; KPK
              </div>
              <div className="absolute top-4 right-4 z-10 font-mono text-[9px] text-[#D6B978]/70">
                33.7845° N, 72.8421° E
              </div>

              {/* Bottom Canvas Overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C7A15A]">
                    500 KANAL ESTATE
                  </span>
                  <h2 className="mt-2 font-serif text-3xl font-light text-[#F4F0E8] sm:text-4xl leading-tight">
                    COME CLOSER TO THE DESTINATION.
                  </h2>
                </div>
                <ConceptDisclaimer label="Artist's Impression" />
              </div>
            </div>
          </div>

          {/* RIGHT: DESTINATION INVITATION PANEL (5 COLS) */}
          <div className="flex flex-col justify-between lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 border-b border-[#C7A15A]/30 pb-1 text-[10px] uppercase tracking-[0.25em] text-[#D6B978] font-mono">
                <Compass className="h-3.5 w-3.5 text-[#D6B978]" />
                <span>Section 10 — Destination Invitation</span>
              </div>

              <h2 className="mt-4 font-serif text-4xl font-light leading-[1.08] sm:text-5xl text-[#F4F0E8]">
                LET&apos;S BEGIN <br />
                <span className="italic text-[#D6B978]">THE CONVERSATION.</span>
              </h2>

              <p className="mt-4 text-xs font-light leading-relaxed text-[#9A9389]">
                Whether you wish to inspect the 500 Kanal lakeside grounds, preview private dining salons, or discuss pre-launch membership terms, our concierge desk is at your service.
              </p>
            </div>

            {/* LOCATION & ACCESS METADATA STACK */}
            <div className="border-y border-[#C7A15A]/20 py-6 text-xs text-[#9A9389] space-y-4 font-mono">
              <div className="flex items-start gap-4">
                <MapPin className="h-4 w-4 text-[#D6B978] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-[#C7A15A]">ADDRESS</span>
                  <span className="text-[#F4F0E8] font-sans">Near Alexander Road, Khanpur Dam, KPK, Pakistan</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Compass className="h-4 w-4 text-[#D6B978] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-[#C7A15A]">ACCESS &amp; ORIENTATION</span>
                  <span className="text-[#F4F0E8] font-sans">Approx. 2 KM from Alexander Road &bull; Khanpur Lake Facing</span>
                </div>
              </div>
            </div>

            {/* DIRECT CONTACT CHANNELS */}
            <div className="space-y-3 text-xs font-mono">
              <a
                href={`tel:${MEMBERSHIP_CONFIG.uanPhone}`}
                className="flex items-center gap-3 text-[#F4F0E8] transition-colors hover:text-[#D6B978] group focus:outline-none focus:ring-1 focus:ring-[#D6B978]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C7A15A]/30 bg-[#071116] text-[#D6B978] group-hover:border-[#D6B978] group-hover:bg-[#D6B978] group-hover:text-[#071116] transition-colors">
                  <Phone className="h-3.5 w-3.5" />
                </div>
                <div>
                  <span className="block text-[9px] text-[#9A9389] uppercase tracking-widest">UAN CONCIERGE</span>
                  <span className="text-sm font-light tracking-wider">{MEMBERSHIP_CONFIG.uanPhone}</span>
                </div>
              </a>

              <a
                href={`mailto:${MEMBERSHIP_CONFIG.contactEmail}`}
                className="flex items-center gap-3 text-[#F4F0E8] transition-colors hover:text-[#D6B978] group focus:outline-none focus:ring-1 focus:ring-[#D6B978]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C7A15A]/30 bg-[#071116] text-[#D6B978] group-hover:border-[#D6B978] group-hover:bg-[#D6B978] group-hover:text-[#071116] transition-colors">
                  <Mail className="h-3.5 w-3.5" />
                </div>
                <div>
                  <span className="block text-[9px] text-[#9A9389] uppercase tracking-widest">EMAIL ADVISORY</span>
                  <span className="text-xs font-light">{MEMBERSHIP_CONFIG.contactEmail}</span>
                </div>
              </a>
            </div>

            {/* 4 INVITATION PATHWAY ACTIONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Link
                href="#membership"
                className="group flex items-center justify-center gap-2 bg-[#D6B978] px-5 py-3.5 text-[10px] font-mono uppercase tracking-[0.18em] font-bold text-[#071116] transition-all hover:bg-[#F4F0E8] focus:outline-none focus:ring-2 focus:ring-[#D6B978]"
              >
                <Calendar className="h-3.5 w-3.5 text-[#071116]" />
                <span>Book a VIP Visit</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 border border-[#C7A15A]/60 bg-[#071116]/80 px-5 py-3.5 text-[10px] font-mono uppercase tracking-[0.18em] font-medium text-[#D6B978] transition-all hover:bg-[#C7A15A]/15 hover:border-[#D6B978] hover:text-[#F4F0E8] focus:outline-none focus:ring-2 focus:ring-[#D6B978]"
              >
                <MessageCircle className="h-3.5 w-3.5 text-[#D6B978]" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>

          </div>

        </div>
      </Container>
    </section>
  )
}

