'use client'

import React, { useEffect, useState, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    // Only run on devices that support hover and fine pointer (desktop mouse/trackpad)
    if (typeof window === 'undefined') return
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!isFinePointer) return

    let animationFrameId: number
    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) setIsVisible(true)

      // Direct move for inner dot (zero latency)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null
      const isInteractive = Boolean(
        target && (
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.tagName === 'INPUT' ||
          target.tagName === 'SELECT' ||
          target.tagName === 'TEXTAREA' ||
          target.closest('a') ||
          target.closest('button') ||
          target.role === 'button'
        )
      )
      setIsHovered(isInteractive)
    }

    const onMouseLeave = () => {
      setIsVisible(false)
    }

    const onMouseEnter = () => {
      setIsVisible(true)
    }

    // Smooth lerp loop for outer hairline ring
    const render = () => {
      const ease = 0.18
      ringX += (mouseX - ringX) * ease
      ringY += (mouseY - ringY) * ease

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }

      animationFrameId = requestAnimationFrame(render)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    animationFrameId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden lg:block" aria-hidden="true">
      {/* Outer Hairline Champagne Ring */}
      <div
        ref={ringRef}
        className={`fixed left-0 top-0 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ease-out ${
          isHovered
            ? 'scale-125 border-[#D6B978] bg-[#D6B978]/10'
            : 'border-[#D6B978]/40 bg-transparent'
        }`}
      />
      {/* Inner Champagne Gold Dot */}
      <div
        ref={dotRef}
        className={`fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D6B978] transition-transform duration-150 ${
          isHovered ? 'scale-150 bg-[#F4F0E8]' : 'scale-100'
        }`}
      />
    </div>
  )
}
