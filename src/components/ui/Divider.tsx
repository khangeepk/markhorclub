import React from 'react'

interface DividerProps {
  className?: string
  accent?: boolean
}

export default function Divider({ className = '', accent = false }: DividerProps) {
  if (accent) {
    return (
      <div className={`relative flex items-center justify-center my-12 ${className}`}>
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#C7A15A]/40 to-transparent" />
        <div className="absolute w-2.5 h-2.5 rotate-45 border border-[#C7A15A] bg-[#071116]" />
      </div>
    )
  }

  return (
    <div className={`w-full h-[1px] bg-gradient-to-r from-transparent via-[#F4F0E8]/15 to-transparent my-8 ${className}`} />
  )
}
