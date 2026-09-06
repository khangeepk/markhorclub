import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface LuxuryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost'
  href?: string
  icon?: boolean
  children: React.ReactNode
  className?: string
}

export default function LuxuryButton({
  variant = 'primary',
  href,
  icon = true,
  children,
  className = '',
  ...props
}: LuxuryButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-sm font-sans font-semibold text-xs tracking-[0.15em] uppercase transition-all duration-300 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C7A15A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071116]'

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-[#C7A15A] to-[#D6B978] text-[#071116] shadow-lg shadow-[#C7A15A]/20 hover:shadow-xl hover:shadow-[#C7A15A]/35 hover:-translate-y-0.5 active:translate-y-0',
    secondary:
      'border border-[#C7A15A]/70 text-[#F4F0E8] bg-transparent hover:bg-[#C7A15A]/10 hover:border-[#C7A15A] hover:text-[#D6B978] active:bg-[#C7A15A]/20',
    ghost:
      'px-0 py-2 text-[#C7A15A] hover:text-[#D6B978] bg-transparent font-medium normal-case tracking-wider hover:translate-x-1',
  }

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </>
  )

  if (href) {
    return (
      <Link
        href={href}
        className={`group ${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        {content}
      </Link>
    )
  }

  return (
    <button
      className={`group ${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {content}
    </button>
  )
}
