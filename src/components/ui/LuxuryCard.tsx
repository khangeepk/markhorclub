import React from 'react'

interface LuxuryCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
}

export default function LuxuryCard({
  children,
  className = '',
  hoverEffect = true,
}: LuxuryCardProps) {
  return (
    <div
      className={`glass-panel p-8 rounded-sm transition-all duration-500 ${
        hoverEffect
          ? 'hover:border-[#C7A15A]/40 hover:shadow-xl hover:shadow-[#C7A15A]/10 hover:-translate-y-1'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
