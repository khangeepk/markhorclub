import React from 'react'

interface DividerProps {
  className?: string
  accent?: boolean
  variant?: 'hairline' | 'accent' | 'ivory'
}

/**
 * Hairline Divider Component for luxury spatial separation.
 */
export default function Divider({ className = '', accent = false, variant = 'hairline' }: DividerProps) {
  if (accent || variant === 'accent') {
    return (
      <div className={`relative flex items-center justify-center my-10 ${className}`}>
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C7A15A]/45 to-transparent" />
        <div className="absolute w-2 h-2 rotate-45 border border-[#C7A15A] bg-[#071116]" />
      </div>
    )
  }

  if (variant === 'ivory') {
    return (
      <div className={`w-full h-[1px] bg-gradient-to-r from-transparent via-[#F4F0E8]/20 to-transparent my-8 ${className}`} />
    )
  }

  return (
    <div className={`w-full h-[1px] bg-[#C7A15A]/20 my-8 ${className}`} />
  )
}
