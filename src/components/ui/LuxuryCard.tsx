import React from 'react'

interface LuxuryCardProps {
  children: React.ReactNode
  className?: string
  hoverEffect?: boolean
  variant?: 'glass' | 'dark' | 'warm' | 'bordered'
}

/**
 * Architectural Panel Container replacing generic SaaS cards with luxury glassmorphic & editorial planes.
 */
export default function LuxuryCard({
  children,
  className = '',
  hoverEffect = true,
  variant = 'glass',
}: LuxuryCardProps) {
  const variantStyles = {
    glass: 'glass-panel p-6 sm:p-8',
    dark: 'bg-[#071116] border border-[#F4F0E8]/10 p-6 sm:p-8 rounded-none sm:rounded-sm',
    warm: 'bg-[#F4F0E8] text-[#071116] border border-[#C7A15A]/30 p-6 sm:p-8 rounded-none sm:rounded-sm',
    bordered: 'bg-[#0B1C26]/70 border border-[#C7A15A]/20 p-6 sm:p-8 rounded-none sm:rounded-sm',
  }

  const hoverStyles = hoverEffect
    ? 'transition-all duration-500 hover:border-[#C7A15A]/40 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-0.5'
    : ''

  return (
    <div className={`${variantStyles[variant]} ${hoverStyles} ${className}`}>
      {children}
    </div>
  )
}
