import React from 'react'
import ConceptDisclaimer from './ConceptDisclaimer'

export type MediaTreatmentVariant =
  | 'full-bleed'
  | 'editorial-landscape'
  | 'portrait-crop'
  | 'cinematic-frame'
  | 'overlapping-media'
  | 'captioned-media'
  | 'standard'

interface MediaFrameProps {
  children: React.ReactNode
  variant?: MediaTreatmentVariant
  aspectRatio?: 'auto' | '16/9' | '4/3' | '1/1' | '21/9' | '4/5' | '3/4'
  className?: string
  overlay?: boolean
  border?: boolean
  caption?: string
  plateNumber?: string
  disclaimer?: boolean
  radius?: 'none' | 'sm'
}

export default function MediaFrame({
  children,
  variant = 'standard',
  aspectRatio = '16/9',
  className = '',
  overlay = true,
  border = true,
  caption,
  plateNumber,
  disclaimer = false,
  radius = 'sm',
}: MediaFrameProps) {
  const aspectClasses = {
    'auto': 'aspect-auto',
    '16/9': 'aspect-[16/9]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    '21/9': 'aspect-[21/9]',
    '4/5': 'aspect-[4/5]',
    '3/4': 'aspect-[3/4]',
  }

  const radiusClass = radius === 'none' ? 'rounded-none' : 'rounded-none sm:rounded-sm'

  // Variant Preset Enhancements
  if (variant === 'full-bleed') {
    return (
      <div className={`relative overflow-hidden w-full aspect-[21/9] min-h-[360px] md:min-h-[460px] border border-[#C7A15A]/25 shadow-2xl ${radiusClass} ${className}`}>
        {children}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#071116] via-[#071116]/40 to-transparent pointer-events-none" />
        )}
        {disclaimer && (
          <div className="absolute bottom-4 left-4 z-10">
            <ConceptDisclaimer label="Artist's Impression" />
          </div>
        )}
      </div>
    )
  }

  if (variant === 'cinematic-frame') {
    return (
      <div className={`relative overflow-hidden border border-[#C7A15A]/30 bg-[#0B1C26] p-2 shadow-2xl ${radiusClass} ${className}`}>
        <div className={`relative w-full overflow-hidden ${aspectClasses[aspectRatio]}`}>
          {children}
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/80 via-transparent to-transparent pointer-events-none" />
          )}
          {disclaimer && (
            <div className="absolute bottom-3 left-3 z-10">
              <ConceptDisclaimer label="Artist's Impression" />
            </div>
          )}
        </div>
      </div>
    )
  }

  if (variant === 'captioned-media') {
    return (
      <figure className={`group relative overflow-hidden border border-[#C7A15A]/25 bg-[#0B1C26] p-2 shadow-2xl ${radiusClass} ${className}`}>
        <div className={`relative w-full overflow-hidden ${aspectClasses[aspectRatio]}`}>
          {children}
          {overlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/80 via-transparent to-transparent pointer-events-none" />
          )}
          {disclaimer && (
            <div className="absolute bottom-4 left-4 z-10">
              <ConceptDisclaimer label="Artist's Impression" />
            </div>
          )}
        </div>
        {(caption || plateNumber) && (
          <figcaption className="flex items-center justify-between gap-4 px-1 pt-3">
            {plateNumber && (
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#C7A15A]">
                {plateNumber}
              </span>
            )}
            {caption && (
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#9A9389]/80 truncate">
                {caption}
              </span>
            )}
          </figcaption>
        )}
      </figure>
    )
  }

  if (variant === 'portrait-crop') {
    return (
      <div className={`relative overflow-hidden w-full aspect-[4/5] border border-[#C7A15A]/20 shadow-xl ${radiusClass} ${className}`}>
        {children}
        {overlay && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/75 via-transparent to-transparent pointer-events-none" />
        )}
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden w-full ${radiusClass} ${aspectClasses[aspectRatio]} ${
        border ? 'border border-[#C7A15A]/20 shadow-2xl' : ''
      } ${className}`}
    >
      {children}
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#071116]/85 via-transparent to-transparent pointer-events-none" />
      )}
      {disclaimer && (
        <div className="absolute bottom-3 left-3 z-10">
          <ConceptDisclaimer label="Artist's Impression" />
        </div>
      )}
    </div>
  )
}
