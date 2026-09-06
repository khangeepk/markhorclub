import React from 'react'

interface MediaFrameProps {
  children: React.ReactNode
  aspectRatio?: 'auto' | '16/9' | '4/3' | '1/1' | '21/9'
  className?: string
  overlay?: boolean
  border?: boolean
}

export default function MediaFrame({
  children,
  aspectRatio = '16/9',
  className = '',
  overlay = true,
  border = true,
}: MediaFrameProps) {
  const aspectClasses = {
    'auto': 'aspect-auto',
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '21/9': 'aspect-[21/9]',
  }

  return (
    <div
      className={`relative overflow-hidden rounded-sm w-full ${aspectClasses[aspectRatio]} ${
        border ? 'border border-[#C7A15A]/20 shadow-2xl' : ''
      } ${className}`}
    >
      {children}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/80 via-transparent to-transparent pointer-events-none" />
      )}
    </div>
  )
}
