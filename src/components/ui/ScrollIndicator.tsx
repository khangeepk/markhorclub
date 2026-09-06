"use client"

import React from 'react'

export default function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-3 opacity-80 hover:opacity-100 transition-opacity duration-300">
      <span className="text-[10px] uppercase tracking-[0.3em] text-[#D6B978] font-sans font-medium">
        Scroll
      </span>
      <div className="w-[1px] h-10 bg-gradient-to-b from-[#C7A15A] to-transparent relative overflow-hidden">
        <div className="w-full h-1/2 bg-[#F4F0E8] animate-pulse" />
      </div>
    </div>
  )
}
