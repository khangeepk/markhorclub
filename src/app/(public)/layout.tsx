import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SmoothScrollProvider from '@/components/common/SmoothScrollProvider'
import CinematicIntroProvider from '@/components/common/CinematicIntro'
import { WhatsAppButton } from '@/components/common/WhatsAppButton'
import { FaqChatbot } from '@/components/common/FaqChatbot'
import { BackgroundAmbientAudio } from '@/components/common/BackgroundAmbientAudio'
import { CustomCursor } from '@/components/common/CustomCursor'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <CinematicIntroProvider>
      <CustomCursor />
      <BackgroundAmbientAudio />
      <SmoothScrollProvider>
        <Header />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <WhatsAppButton />
        <FaqChatbot />
      </SmoothScrollProvider>
    </CinematicIntroProvider>
  )
}

