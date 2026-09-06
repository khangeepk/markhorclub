import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { db } from '@/lib/db'
import { ShieldCheck, QrCode, ArrowLeft, Download } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DigitalMembershipCardPage({ params }: { params: { id: string } }) {
  const member = await db.member.findFirst({
    where: {
      OR: [{ id: params.id }, { membershipNumber: params.id }],
    },
  })

  if (!member) {
    return (
      <div className="min-h-screen bg-[#071116] text-[#F4F0E8] flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-serif text-rose-400 font-bold">Membership Record Not Found</h1>
          <Link href="/" className="inline-block text-xs uppercase text-[#C7A15A] underline">
            Return to Homepage
          </Link>
        </div>
      </div>
    )
  }

  const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://markhorclub.com'}/verify-member/${member.digitalCardToken || 'demo-token'}`
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(verifyUrl)}`

  return (
    <div className="min-h-screen bg-[#071116] text-[#F4F0E8] py-16 px-4 flex flex-col items-center justify-center font-sans relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(199,161,90,0.15)_0%,_transparent_70%)]" />

      <div className="w-full max-w-lg space-y-6 relative z-10">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C7A15A] hover:text-[#D6B978]"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Club
          </Link>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#C7A15A]">
            OFFICIAL DIGITAL CREDENTIAL
          </span>
        </div>

        {/* Digital Membership Card Graphic */}
        <div className="w-full rounded-2xl bg-gradient-to-br from-[#0B1C26] via-[#071116] to-[#04090C] border-2 border-[#C7A15A]/40 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative overflow-hidden">
          {/* Card Ambient Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#C7A15A]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Card Top Brand */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-3">
              <Image
                src="/assets/logos/markhor-logo-gold.png"
                alt="Markhor Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <div>
                <h2 className="text-base font-serif font-bold text-[#F4F0E8] tracking-wider uppercase">MARKHOR CLUB</h2>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#C7A15A] block font-semibold">Khanpur Dam Estate</span>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider bg-emerald-950 text-emerald-400 border border-emerald-500/30">
              {member.membershipStatus.toUpperCase()}
            </span>
          </div>

          {/* Card Body Details */}
          <div className="space-y-4 mb-8">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#C7A15A] block font-semibold">Member Name</span>
              <h3 className="text-xl font-serif font-bold text-[#F4F0E8]">{member.fullName}</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#F4F0E8]/50 block">Membership Number</span>
                <span className="font-bold text-[#D6B978]">{member.membershipNumber}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-widest text-[#F4F0E8]/50 block">Issue Date</span>
                <span className="font-bold text-[#F4F0E8]">{new Date(member.joinedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          {/* Card Footer with QR */}
          <div className="pt-4 border-t border-[#C7A15A]/20 flex items-center justify-between">
            <div>
              <span className="text-[9px] uppercase tracking-widest text-[#C7A15A] block font-semibold">Estate Authorization</span>
              <p className="text-[10px] text-[#F4F0E8]/60 font-mono">500 Kanal Private Club Member</p>
            </div>
            {/* QR Code */}
            <div className="p-1.5 rounded-lg bg-white shrink-0">
              <img
                src={qrCodeUrl}
                alt="QR Member Verification"
                className="w-16 h-16 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="text-center text-[10px] text-[#F4F0E8]/40 font-mono uppercase tracking-widest">
          Present digital card or QR code upon entry at Markhor Club Concierge Desk
        </div>
      </div>
    </div>
  )
}
