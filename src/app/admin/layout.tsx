import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Portal | Markhor Club',
  description: 'Markhor Club Estate Management & Administrative Portal',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#071116] text-[#F4F0E8] font-sans antialiased selection:bg-[#C7A15A] selection:text-[#071116]">
      {children}
    </div>
  )
}
