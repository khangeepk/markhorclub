import React from 'react'

interface StatItemProps {
  value: string
  label: string
  subtitle?: string
  className?: string
}

/**
 * Editorial Stat Item displaying prominent light serif numerals and micro-labels.
 */
export default function StatItem({ value, label, subtitle, className = '' }: StatItemProps) {
  return (
    <div className={`flex flex-col border-l border-[#C7A15A]/35 pl-6 py-2 select-none ${className}`}>
      <span className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-champagne-gradient tracking-tight leading-none">
        {value}
      </span>
      <span className="text-[10px] uppercase tracking-[0.22em] font-semibold text-[#F4F0E8] mt-3">
        {label}
      </span>
      {subtitle && (
        <span className="text-xs text-[#9A9389] mt-1 font-sans font-light">
          {subtitle}
        </span>
      )}
    </div>
  )
}
