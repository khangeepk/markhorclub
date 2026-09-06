import React from 'react'

interface TypographyProps {
  children: React.ReactNode
  className?: string
}

export function SectionEyebrow({ children, className = '' }: TypographyProps) {
  return (
    <div className={`flex items-center gap-3 text-eyebrow mb-4 ${className}`}>
      <span className="w-6 h-[1px] bg-[#C7A15A]" aria-hidden="true" />
      <span>{children}</span>
    </div>
  )
}

export function SectionHeading({ children, className = '' }: TypographyProps) {
  return (
    <h2 className={`text-h1 font-serif text-[#F4F0E8] tracking-tight mb-6 ${className}`}>
      {children}
    </h2>
  )
}

export function SectionDescription({ children, className = '' }: TypographyProps) {
  return (
    <p className={`text-base md:text-lg text-[#9A9389] max-w-2xl leading-relaxed font-sans ${className}`}>
      {children}
    </p>
  )
}
