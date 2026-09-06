import React from 'react'

interface ConceptDisclaimerProps {
  label?: string
  className?: string
}

export default function ConceptDisclaimer({
  label = "Artist's Impression",
  className = '',
}: ConceptDisclaimerProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#071116]/60 backdrop-blur-md border border-[#F4F0E8]/10 text-[10px] uppercase tracking-wider text-[#9A9389] select-none ${className}`}
    >
      <span className="w-1 h-1 rounded-full bg-[#C7A15A]" aria-hidden="true" />
      <span>{label}</span>
    </span>
  )
}
