import React from 'react'

interface StatItemProps {
  value: string
  label: string
  subtitle?: string
  className?: string
}

export default function StatItem({ value, label, subtitle, className = '' }: StatItemProps) {
  return (
    <div className={`flex flex-col border-l border-[#C7A15A]/30 pl-6 py-2 ${className}`}>
      <span className="text-3xl md:text-5xl font-serif font-semibold text-gold-gradient tracking-tight">
        {value}
      </span>
      <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#F4F0E8] mt-2">
        {label}
      </span>
      {subtitle && (
        <span className="text-xs text-[#9A9389] mt-1 font-sans">
          {subtitle}
        </span>
      )}
    </div>
  )
}
