"use client"

import React, { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type NavItem = { label: string; href: string }

const NAV_ITEMS: NavItem[] = [
  { label: 'CLUB', href: '#about' },
  { label: 'AMENITIES', href: '#amenities' },
  { label: 'EXPERIENCES', href: '#experiences' },
  { label: 'AQUA PARK', href: '#aqua-park' },
  { label: 'MASTER PLAN', href: '#master-plan' },
  { label: 'GALLERY', href: '#gallery' },
  { label: 'MEMBERSHIP', href: '#membership' },
  { label: 'CONTACT', href: '#contact' },
]

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  // Body scroll lock & ESC key listener
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[1050] bg-[#071116] text-[#F4F0E8] flex flex-col justify-between p-6 sm:p-10 select-none overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {/* Top Header Row */}
          <div className="flex items-center justify-between border-b border-[#C7A15A]/15 pb-6">
            <Link href="/" onClick={onClose} className="flex items-center gap-3">
              <Image
                src="/assets/logos/markhor-logo-gold.png"
                alt="Markhor Club"
                width={150}
                height={48}
                priority
                className="w-auto h-10 object-contain"
              />
            </Link>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close navigation menu"
              className="p-3 text-[#F4F0E8] hover:text-[#C7A15A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A15A] transition-colors rounded-sm"
            >
              <X size={26} />
            </button>
          </div>

          {/* Navigation Links with Staggered Entrance */}
          <nav className="my-auto py-8 flex flex-col space-y-4" aria-label="Mobile Navigation">
            {NAV_ITEMS.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.05 * index + 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group flex items-center justify-between text-2xl sm:text-3xl font-serif text-[#F4F0E8] hover:text-[#C7A15A] transition-colors py-1.5"
                >
                  <span className="tracking-wide">{item.label}</span>
                  <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#C7A15A]" />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Bottom Actions & Microcopy */}
          <div className="pt-6 border-t border-[#C7A15A]/15 space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Link
                href="#contact"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-3 py-4 bg-gradient-to-r from-[#C7A15A] to-[#D6B978] text-[#071116] font-semibold text-xs uppercase tracking-[0.2em] rounded-sm shadow-lg hover:shadow-[#C7A15A]/30 transition-all active:scale-[0.99] min-h-[48px]"
              >
                  <span>SCHEDULE VIP TOUR</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] uppercase tracking-[0.2em] text-[#9A9389] font-sans">
              <span>KHANPUR DAM • KPK • PAKISTAN</span>
              <span>UAN: 0995-111-222-333</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
