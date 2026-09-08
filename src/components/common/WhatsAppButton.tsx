'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'
import { useCinematicIntro } from './CinematicIntro'
import { MEMBERSHIP_CONFIG } from '../../config/membership'

export const WhatsAppButton: React.FC = () => {
  const { introComplete } = useCinematicIntro()
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER || '+923305230888'
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '')
  const message = 'Hello Markhor Club Concierge, I would like information regarding membership and site visit options.'
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`

  if (!introComplete) return null

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Markhor Club Concierge on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-3 border border-[#C7A15A]/40 bg-[#071116]/90 text-[#F4F0E8] shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-[#D6B978] hover:bg-[#0B1C26] hover:shadow-[0_0_20px_rgba(214,185,120,0.2)] focus:outline-none focus:ring-2 focus:ring-[#D6B978] focus:ring-offset-2 focus:ring-offset-[#071116] group rounded-sm"
    >
      <div className="relative flex h-7 w-7 items-center justify-center rounded-full bg-[#C7A15A]/15 text-[#D6B978] transition-colors duration-300 group-hover:bg-[#D6B978] group-hover:text-[#071116]">
        <MessageCircle className="h-4 w-4" />
        <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500" />
      </div>

      <div className="hidden sm:flex flex-col text-left font-mono">
        <span className="text-[9px] uppercase tracking-[0.2em] text-[#D6B978]">
          CONCIERGE DESK
        </span>
        <span className="text-[11px] font-light text-[#F4F0E8] group-hover:text-[#D6B978] transition-colors">
          WhatsApp Inquiry
        </span>
      </div>
    </a>
  )
}


