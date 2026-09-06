"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function CinematicPreloader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if preloader has already run in current session
    const hasSeenPreloader = sessionStorage.getItem('mh_preloader_seen')
    
    // If reduced motion is preferred or seen in session, end faster
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timerDuration = hasSeenPreloader || prefersReducedMotion ? 600 : 1800

    const timer = setTimeout(() => {
      setLoading(false)
      sessionStorage.setItem('mh_preloader_seen', 'true')
    }, timerDuration)

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[2000] flex flex-col items-center justify-center bg-[#071116] text-[#F4F0E8] select-none pointer-events-auto"
        >
          <div className="flex flex-col items-center justify-center text-center px-6">
            {/* Gold Markhor Emblem */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="mb-6 relative"
            >
              <Image
                src="/assets/logos/markhor-logo-gold.png"
                alt="Markhor Club Emblem"
                width={180}
                height={64}
                priority
                className="w-auto h-16 md:h-20 object-contain drop-shadow-[0_0_20px_rgba(199,161,90,0.3)]"
              />
            </motion.div>

            {/* Fine Gold Line Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeInOut' }}
              className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#C7A15A] to-transparent mb-5"
            />

            {/* Microcopy */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-1"
            >
              <h2 className="text-sm uppercase tracking-[0.3em] font-serif text-[#F4F0E8]">
                MARKHOR CLUB
              </h2>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#C7A15A] font-sans">
                KHANPUR DAM • PAKISTAN
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
