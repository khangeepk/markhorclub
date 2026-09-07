'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'
import { useCinematicIntro } from './CinematicIntro'

export const WhatsAppButton: React.FC = () => {
  const { introComplete } = useCinematicIntro()
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER || '+923305230888'
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '')
  const message = 'Hello Markhor Club, I would like information about membership.'
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`

  if (!introComplete) return null

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact Markhor Club on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-3 px-4 py-3 rounded-full bg-[#0B1C26]/90 border border-[#C7A15A]/40 text-[#F4F0E8] shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#C7A15A] hover:bg-[#0B1C26] hover:shadow-[0_0_25px_rgba(199,161,90,0.3)] group"
    >
      <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-[#C7A15A]/15 text-[#C7A15A] group-hover:bg-[#C7A15A] group-hover:text-[#071116] transition-colors duration-300">
        <MessageCircle className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500" />
      </div>

      <div className="hidden sm:flex flex-col text-left pr-1">
        <span className="text-[9px] uppercase tracking-[0.2em] text-[#C7A15A] font-medium">VIP Concierge</span>
        <span className="text-xs font-serif tracking-wide text-[#F4F0E8] group-hover:text-[#D6B978]">WhatsApp Inquiry</span>
      </div>
    </a>
  )
}

