import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface LuxuryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
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
    'inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-none sm:rounded-sm font-sans font-semibold text-xs tracking-[0.18em] uppercase transition-all duration-300 min-h-[48px] select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6B978] focus-visible:ring-offset-2 focus-visible:ring-offset-[#071116]'

  const variantStyles = {
    primary:
      'bg-[#F4F0E8] text-[#071116] border border-[#F4F0E8] shadow-lg shadow-black/40 hover:bg-[#D6B978] hover:border-[#D6B978] hover:text-[#071116] hover:shadow-xl hover:shadow-[#D6B978]/20 hover:-translate-y-0.5 active:translate-y-0',
    secondary:
      'border border-[#D6B978]/50 text-[#F4F0E8] bg-transparent hover:bg-[#D6B978]/10 hover:border-[#D6B978] hover:text-[#D6B978] active:bg-[#D6B978]/20',
    outline:
      'border border-[#C7A15A]/60 text-[#D6B978] bg-transparent hover:bg-[#C7A15A]/15 hover:border-[#C7A15A] hover:text-[#F4F0E8]',
    ghost:
      'px-0 py-2 min-h-0 bg-transparent text-[#D6B978] hover:text-[#F4F0E8] tracking-[0.2em] font-medium hover:translate-x-1 border-0 shadow-none',
  }

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
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
