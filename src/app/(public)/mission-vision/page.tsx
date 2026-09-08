import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import { ArrowRight, Compass, ShieldCheck, Sparkles, MapPin, Phone } from 'lucide-react'
import Container from '@/components/ui/Container'
import SectionWrapper from '@/components/ui/SectionWrapper'
import ConceptDisclaimer from '@/components/ui/ConceptDisclaimer'
import { SectionEyebrow, DisplayTitle } from '@/components/ui/Typography'
import LuxuryButton from '@/components/ui/LuxuryButton'
import { MEMBERSHIP_CONFIG } from '@/config/membership'

export const metadata: Metadata = {
  title: 'Mission & Vision | Markhor Club',
  description:
    'Discover the mission and vision of Markhor Club — a private destination focused on nature, wellbeing, recreation, hospitality and meaningful community experiences near Khanpur Dam.',
  openGraph: {
    title: 'Mission & Vision | Markhor Club',
    description:
      'Discover the mission and vision of Markhor Club — a private destination focused on nature, wellbeing, recreation, hospitality and meaningful community experiences near Khanpur Dam.',
    images: ['/assets/images/Dam View.png'],
  },
}

export default function MissionVisionPage() {
  return (
    <div className="relative w-full bg-[#071116] text-[#F4F0E8] selection:bg-[#C7A15A] selection:text-[#071116]">
      {/* Ambient Radial Background Lighting */}
      <div className="pointer-events-none absolute top-0 right-0 h-[800px] w-[800px] rounded-full bg-[#164E63]/15 blur-[160px]" />
      <div className="pointer-events-none absolute top-1/2 left-0 h-[700px] w-[700px] rounded-full bg-[#263D32]/20 blur-[150px]" />

      {/* ==================================================
          1. HERO HEADER SECTION
         ================================================== */}
      <section className="relative w-full pt-36 lg:pt-44 pb-16 border-b border-[#C7A15A]/15">
        <Container>
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#C7A15A]/30 bg-[#0B1C26]/80 px-3.5 py-1.5 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[#D6B978]" />
              <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.28em] text-[#D6B978]">
                MARKHOR CLUB
              </span>
            </div>

            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.05] tracking-tight text-[#F4F0E8]">
              Mission &amp; Vision
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-[#D6B978] font-light leading-relaxed max-w-3xl">
              A destination shaped around nature, wellbeing, recreation and meaningful community experiences.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#9A9389]">
              <span className="inline-flex items-center gap-1.5 text-[#C7A15A]">
                <MapPin className="h-3.5 w-3.5" /> Khanpur Dam Estate
              </span>
              <span className="text-[#C7A15A]/40">&bull;</span>
              <span>500 Kanal Destination</span>
            </div>
          </div>

          {/* Full-width Cinematic Hero Media Frame */}
          <div className="mt-12 lg:mt-16 relative w-full aspect-[16/9] lg:aspect-[21/9] min-h-[360px] rounded-none sm:rounded-sm overflow-hidden border border-[#C7A15A]/25 shadow-2xl group">
            <Image
              src="/assets/images/Dam View.png"
              alt="Khanpur Dam Panorama — Markhor Club Setting"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071116] via-[#071116]/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#071116]/60 via-transparent to-transparent w-1/2" />

            <div className="absolute bottom-6 left-6 z-10 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#D6B978] block">
                DESTINATION LANDSCAPE
              </span>
              <span className="font-serif text-xl font-light text-[#F4F0E8] block">
                Khanpur Dam, Khyber Pakhtunkhwa
              </span>
            </div>

            <div className="absolute top-4 right-4 z-10">
              <ConceptDisclaimer label="Verified Site Outlook" />
            </div>
          </div>
        </Container>
      </section>

      {/* ==================================================
          2. MISSION SECTION (EDITORIAL SPREAD 01)
         ================================================== */}
      <section id="mission" className="relative w-full py-20 lg:py-28 border-b border-[#C7A15A]/15">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left 6 Columns: Editorial Typography & Copy */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <SectionEyebrow number="01" accentLine={true}>
                  OUR PURPOSE
                </SectionEyebrow>
                <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#F4F0E8] tracking-tight">
                  MISSION
                </h2>
              </div>

              <div className="relative border-l-2 border-[#C7A15A]/40 pl-6 sm:pl-8 py-2">
                <blockquote className="font-sans text-base sm:text-lg lg:text-xl font-light text-[#F4F0E8]/90 leading-relaxed sm:leading-loose">
                  &ldquo;Our mission is to create a distinctive private club experience where nature, wellbeing, recreation and community come together with purpose. At Markhor Club, we aim to offer members and families a thoughtfully curated lifestyle through quality dining, fitness and wellness, indoor and outdoor recreation, swimming, equestrian activities, golf, water experiences and family-focused leisure &mdash; all within an environment that values comfort, service, safety and a genuine sense of belonging.&rdquo;
                </blockquote>
              </div>

              {/* Curated Activity Markers */}
              <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-[11px] text-[#D6B978] tracking-wider uppercase">
                <div className="border border-[#C7A15A]/20 bg-[#0B1C26]/60 p-3 rounded-none sm:rounded-sm">
                  &bull; Wellness &amp; Fitness
                </div>
                <div className="border border-[#C7A15A]/20 bg-[#0B1C26]/60 p-3 rounded-none sm:rounded-sm">
                  &bull; Fine Dining
                </div>
                <div className="border border-[#C7A15A]/20 bg-[#0B1C26]/60 p-3 rounded-none sm:rounded-sm">
                  &bull; Equestrian &amp; Golf
                </div>
                <div className="border border-[#C7A15A]/20 bg-[#0B1C26]/60 p-3 rounded-none sm:rounded-sm">
                  &bull; Water Sports
                </div>
                <div className="border border-[#C7A15A]/20 bg-[#0B1C26]/60 p-3 rounded-none sm:rounded-sm">
                  &bull; Family Leisure
                </div>
                <div className="border border-[#C7A15A]/20 bg-[#0B1C26]/60 p-3 rounded-none sm:rounded-sm">
                  &bull; Private Comfort
                </div>
              </div>
            </div>

            {/* Right 6 Columns: Asymmetric Lifestyle Visual */}
            <div className="lg:col-span-6">
              <div className="relative w-full aspect-[4/5] sm:aspect-[16/12] lg:aspect-[4/5] max-h-[560px] rounded-none sm:rounded-sm overflow-hidden border border-[#C7A15A]/25 shadow-2xl group">
                <Image
                  src="/assets/images/horse riding 2.jpg"
                  alt="Equestrian Lifestyle at Markhor Club"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071116] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#D6B978] block mb-1">
                    EQUESTRIAN &amp; OUTDOOR RECREATION
                  </span>
                  <span className="font-serif text-lg font-light text-[#F4F0E8]">
                    A distinctive private club experience
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ==================================================
          3. VISION SECTION (EDITORIAL SPREAD 02)
         ================================================== */}
      <section id="vision" className="relative w-full py-20 lg:py-28 border-b border-[#C7A15A]/15 bg-[#04090C]/60">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left 6 Columns: Asymmetric Visual (Reversed Order on Desktop) */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative w-full aspect-[4/5] sm:aspect-[16/12] lg:aspect-[4/5] max-h-[560px] rounded-none sm:rounded-sm overflow-hidden border border-[#C7A15A]/25 shadow-2xl group">
                <Image
                  src="/assets/images/location-destination-visual.jpg"
                  alt="Khanpur Dam Horizon — Markhor Club Vision"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071116] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 z-10">
                  <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#D6B978] block mb-1">
                    NATURAL CHARACTER OF KHANPUR
                  </span>
                  <span className="font-serif text-lg font-light text-[#F4F0E8]">
                    Modern leisure &amp; responsible development
                  </span>
                </div>
              </div>
            </div>

            {/* Right 6 Columns: Editorial Typography & Copy */}
            <div className="lg:col-span-6 space-y-8 order-1 lg:order-2">
              <div className="space-y-3">
                <SectionEyebrow number="02" accentLine={true}>
                  OUR HORIZON
                </SectionEyebrow>
                <h2 className="font-serif text-4xl sm:text-5xl font-normal text-[#F4F0E8] tracking-tight">
                  VISION
                </h2>
              </div>

              <div className="relative border-l-2 border-[#C7A15A]/40 pl-6 sm:pl-8 py-2">
                <blockquote className="font-sans text-base sm:text-lg lg:text-xl font-light text-[#F4F0E8]/90 leading-relaxed sm:leading-loose">
                  &ldquo;Our vision is for Markhor Club to become one of Pakistan&rsquo;s most respected destination clubs &mdash; a place where the natural character of Khanpur, modern leisure and responsible development exist in harmony. We are focused on building a long-term community that brings people closer to nature, creates memorable experiences across wellness, sport, adventure and hospitality, and sets a higher standard for how families, members and future generations connect, relax and spend meaningful time together.&rdquo;
                </blockquote>
              </div>

              {/* Strategic Horizon Pillars */}
              <div className="pt-2 space-y-3 font-mono text-xs text-[#9A9389]">
                <div className="flex items-center gap-3 border-b border-[#C7A15A]/15 pb-2">
                  <span className="text-[#C7A15A]">01</span>
                  <span className="text-[#F4F0E8]">LONG-TERM COMMUNITY</span>
                  <span className="text-right ml-auto text-[10px] text-[#9A9389]">Generations of belonging</span>
                </div>
                <div className="flex items-center gap-3 border-b border-[#C7A15A]/15 pb-2">
                  <span className="text-[#C7A15A]">02</span>
                  <span className="text-[#F4F0E8]">RESPONSIBLE DEVELOPMENT</span>
                  <span className="text-right ml-auto text-[10px] text-[#9A9389]">Nature &amp; modern leisure</span>
                </div>
                <div className="flex items-center gap-3 border-b border-[#C7A15A]/15 pb-2">
                  <span className="text-[#C7A15A]">03</span>
                  <span className="text-[#F4F0E8]">HIGHER STANDARD</span>
                  <span className="text-right ml-auto text-[10px] text-[#9A9389]">Hospitality &amp; wellness</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ==================================================
          4. CLOSING MEMBERSHIP INVITATION STRIP
         ================================================== */}
      <section className="relative w-full py-20 bg-[#071116]">
        <Container>
          <div className="glass-panel p-8 sm:p-12 border border-[#C7A15A]/25 rounded-none sm:rounded-sm bg-[#0B1C26]/80 text-center space-y-6 max-w-4xl mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#D6B978]">
              BECOME PART OF THE VISION
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl text-[#F4F0E8] font-normal leading-tight">
              Join Markhor Club
            </h3>

            <p className="text-sm font-sans font-light text-[#9A9389] max-w-2xl mx-auto leading-relaxed">
              Experience an integrated 500 Kanal destination created for connection, leisure, and a genuine sense of belonging. Pre-launch fee {MEMBERSHIP_CONFIG.feeFormatted}.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <LuxuryButton href="/#membership" variant="primary">
                APPLY FOR MEMBERSHIP
              </LuxuryButton>
              <LuxuryButton href="/#contact" variant="outline">
                BOOK A VIP VISIT
              </LuxuryButton>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
