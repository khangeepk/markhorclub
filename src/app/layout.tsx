import './globals.css'
import React from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import SmoothScrollProvider from '../components/common/SmoothScrollProvider'
import CinematicIntroProvider from '../components/common/CinematicIntro'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.markhourgroup.com'),
  title: 'Markhor Club | Khanpur Dam Destination',
  description:
    'Discover Markhor Club by Markhor Group Pvt. Ltd. — a 500 Kanal destination near Alexander Road, Khanpur Dam, KPK, Pakistan.',
  keywords: [
    'Markhor Club',
    'Markhor Group',
    'Khanpur Dam Resort',
    'Club Destination Pakistan',
    'Khanpur Dam KPK',
    'Alexander Road Khanpur',
    'Water Sports Pakistan',
    'Equestrian Club Khanpur',
  ],
  openGraph: {
    title: 'Markhor Club | Khanpur Dam Destination',
    description:
      'A 500 Kanal destination featuring dining, wellness, outdoor adventure and water experiences at Khanpur Dam.',
    url: 'https://www.markhourgroup.com',
    siteName: 'Markhor Club',
    images: [
      {
        url: '/assets/images/Dam View.jpg',
        width: 1200,
        height: 630,
        alt: 'Khanpur Dam Panoramic View - Markhor Club',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400..800;1,400..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#071116] text-[#F4F0E8] antialiased selection:bg-[#C7A15A] selection:text-[#071116]">
        <CinematicIntroProvider>
          <SmoothScrollProvider>
            <Header />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </CinematicIntroProvider>
      </body>
    </html>
  )
}
