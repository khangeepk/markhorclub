import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { db } from '@/lib/db'
import { ShieldCheck, CheckCircle2, AlertTriangle, Building2 } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function VerifyMemberPage({ params }: { params: { token: string } }) {
  const token = params.token

  const member = await db.member.findFirst({
    where: { digitalCardToken: token },
  })

  return (
    <div className="min-h-screen bg-[#071116] text-[#F4F0E8] flex items-center justify-center p-4 font-sans relative overflow-hidden">
      {/* Vignette background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(199,161,90,0.12)_0%,_transparent_70%)]" />

      <div className="w-full max-w-md rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/30 p-8 shadow-2xl backdrop-blur-xl relative z-10 text-center space-y-6">
        <Link href="/" className="inline-block">
          <Image
            src="/assets/logos/markhor-logo-gold.png"
            alt="Markhor Club"
            width={48}
            height={48}
            className="object-contain mx-auto"
          />
        </Link>

        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#C7A15A] block font-semibold">
            OFFICIAL MEMBER VERIFICATION
          </span>
          <h1 className="text-xl font-serif font-bold text-[#F4F0E8] mt-1">
            Markhor Club Digital Credential
          </h1>
        </div>

        {member ? (
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <div className="p-4 rounded-xl bg-[#071116] border border-[#C7A15A]/20 text-xs space-y-3 font-mono">
              <div className="flex justify-between border-b border-[#C7A15A]/10 pb-2">
                <span className="text-[#F4F0E8]/60">Member Name:</span>
                <span className="font-bold text-[#F4F0E8] font-sans">{member.fullName}</span>
              </div>
              <div className="flex justify-between border-b border-[#C7A15A]/10 pb-2">
                <span className="text-[#F4F0E8]/60">Membership No:</span>
                <span className="font-bold text-[#D6B978]">{member.membershipNumber}</span>
              </div>
              <div className="flex justify-between border-b border-[#C7A15A]/10 pb-2">
                <span className="text-[#F4F0E8]/60">Status:</span>
                <span className="font-bold text-emerald-400 uppercase">{member.membershipStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4F0E8]/60">Card Verification:</span>
                <span className="font-bold text-[#C7A15A] uppercase">{member.digitalCardStatus}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-emerald-400 font-semibold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" /> Authenticated Markhor Estate Record
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-rose-950 text-rose-400 border border-rose-500/40">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-rose-300">Invalid Verification Token</h2>
              <p className="text-xs text-[#F4F0E8]/70 mt-1">
                The provided QR token does not match any active Markhor Club membership record.
              </p>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-[#C7A15A]/15 text-[10px] text-[#F4F0E8]/40 uppercase tracking-widest font-mono">
          Khanpur Dam Estate • 500 Kanal Destination
        </div>
      </div>
    </div>
  )
}
