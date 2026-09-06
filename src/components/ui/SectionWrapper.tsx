import React from 'react'

interface SectionWrapperProps {
  children: React.ReactNode
  id?: string
  className?: string
  bg?: 'midnight' | 'navy' | 'black' | 'ivory' | 'glass' | 'transparent'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  as?: 'section' | 'article' | 'div' | 'footer'
}

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
    ivory: 'bg-[#F4F0E8] text-[#071116]',
    glass: 'glass-panel text-[#F4F0E8]',
    transparent: 'bg-transparent text-[#F4F0E8]',
  }

  const paddingStyles = {
    none: 'py-0',
    sm: 'py-12 md:py-16',
    md: 'py-16 md:py-24',
    lg: 'py-20 md:py-32',
    xl: 'py-28 md:py-44',
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
