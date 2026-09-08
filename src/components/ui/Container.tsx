import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  clean?: boolean
}

/**
 * Standardized Layout Container with responsive gutters (px-5 sm:px-8 lg:px-12 xl:px-16) and 1400px max width.
 */
export default function Container({ children, className = '', clean = false }: ContainerProps) {
  if (clean) {
    return <div className={`max-w-[1400px] mx-auto ${className}`}>{children}</div>
  }
  return (
    <div className={`max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 ${className}`}>
      {children}
    </div>
  )
}
