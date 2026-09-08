import React from 'react'

interface SectionWrapperProps {
  children: React.ReactNode
  id?: string
  className?: string
  bg?: 'midnight' | 'navy' | 'black' | 'slate' | 'ivory' | 'glass' | 'transparent'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  as?: 'section' | 'article' | 'div' | 'footer'
}

/**
 * Standardized Section Wrapper with background environment presets and responsive fluid section spacing.
 */
export default function SectionWrapper({
  children,
  id,
  className = '',
  bg = 'midnight',
  padding = 'lg',
  as: Component = 'section',
}: SectionWrapperProps) {
  const bgStyles = {
    midnight: 'bg-[#071116] text-[#F4F0E8]',
    navy: 'bg-[#0B1C26] text-[#F4F0E8]',
    black: 'bg-[#04090C] text-[#F4F0E8]',
    slate: 'bg-[#121E26] text-[#F4F0E8]',
    ivory: 'bg-[#F4F0E8] text-[#071116]',
    glass: 'glass-panel text-[#F4F0E8]',
    transparent: 'bg-transparent text-[#F4F0E8]',
  }

  const paddingStyles = {
    none: 'py-0',
    sm: 'py-10 md:py-14 lg:py-16',
    md: 'py-14 md:py-20 lg:py-24',
    lg: 'section-space',
    xl: 'section-space-hero',
  }

  return (
    <Component
      id={id}
      className={`relative w-full overflow-hidden ${bgStyles[bg]} ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </Component>
  )
}
