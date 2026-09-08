import React from 'react'

interface ConceptDisclaimerProps {
  label?: string
  className?: string
}

/**
 * Micro-label disclaimer badge for architectural visualizations and artist impressions.
 */
export default function ConceptDisclaimer({
  label = "Artist's Impression",
  className = '',
}: ConceptDisclaimerProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-none sm:rounded-sm bg-[#071116]/75 backdrop-blur-md border border-[#F4F0E8]/15 text-[9px] uppercase tracking-[0.22em] font-medium text-[#9A9389] select-none ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#D6B978]" aria-hidden="true" />
      <span>{label}</span>
    </span>
  )
}
