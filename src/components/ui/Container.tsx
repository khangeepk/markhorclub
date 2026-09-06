import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  clean?: boolean
}

export default function Container({ children, className = '', clean = false }: ContainerProps) {
  if (clean) {
    return <div className={`max-w-[1400px] mx-auto ${className}`}>{children}</div>
  }
  return (
    <div className={`max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 ${className}`}>
      {children}
    </div>
  )
}
