import React from 'react'

interface TypographyProps {
  children: React.ReactNode
  className?: string
}

interface SectionEyebrowProps extends TypographyProps {
  number?: string
  accentLine?: boolean
}

/**
 * Micro-label eyebrow component with luxury tracking, hairline divider, and optional chapter number.
 */
export function SectionEyebrow({
  children,
  number,
  accentLine = true,
  className = '',
}: SectionEyebrowProps) {
  return (
    <div className={`flex items-center gap-3 text-micro-label mb-4 select-none ${className}`}>
      {accentLine && <span className="w-7 h-[1px] bg-[#C7A15A]/60" aria-hidden="true" />}
      {number && (
        <span className="font-serif text-sm font-light text-[#D6B978] tracking-normal">
          {number} —
        </span>
      )}
      <span>{children}</span>
    </div>
  )
}

/**
 * Section Heading component using editorial Playfair Display serif with fluid responsive clamps.
 */
export function SectionHeading({ children, className = '' }: TypographyProps) {
  return (
    <h2 className={`text-h1 font-serif text-[#F4F0E8] font-normal tracking-tight leading-[1.08] mb-6 ${className}`}>
      {children}
    </h2>
  )
}

/**
 * Display Title component for massive hero or chapter opening statements.
 */
export function DisplayTitle({ children, className = '' }: TypographyProps) {
  return (
    <h1 className={`text-display-xl font-serif text-[#F4F0E8] font-normal tracking-tight leading-[1.04] mb-6 ${className}`}>
      {children}
    </h1>
  )
}

/**
 * Section Description component rendering elevated, unhurried body copy.
 */
export function SectionDescription({ children, className = '' }: TypographyProps) {
  return (
    <p className={`text-body-lead font-sans text-[#9A9389] max-w-2xl leading-relaxed font-light ${className}`}>
      {children}
    </p>
  )
}

/**
 * Editorial Lead paragraph with an optional left champagne hairline accent.
 */
export function EditorialLead({ children, className = '' }: TypographyProps) {
  return (
    <p className={`text-body-lead font-serif text-[#D9E4EB] border-l border-[#C7A15A]/40 pl-5 py-1 leading-relaxed font-light ${className}`}>
      {children}
    </p>
  )
}

/**
 * Standalone MicroLabel for metadata tags, badges, and section indices.
 */
export function MicroLabel({ children, className = '' }: TypographyProps) {
  return (
    <span className={`text-micro-label uppercase tracking-[0.26em] text-[#D6B978] ${className}`}>
      {children}
    </span>
  )
}
