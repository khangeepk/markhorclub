'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Lock, User, ShieldAlert, ArrowRight } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('Markhorclub')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await res.json()

      if (data.success) {
        router.push('/admin')
      } else {
        setError(data.error || 'Login failed. Please check credentials.')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#071116] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background visual overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(199,161,90,0.15)_0%,_transparent_70%)]" />

      <div className="w-full max-w-md rounded-2xl bg-[#0B1C26]/90 border border-[#C7A15A]/30 p-8 shadow-2xl backdrop-blur-xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C7A15A]/10 border border-[#C7A15A]/40 mb-4 text-[#C7A15A]">
            <Image
              src="/assets/logos/markhor-logo-gold.png"
              alt="Markhor Club"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <h1 className="text-2xl font-serif font-semibold text-[#F4F0E8] tracking-wide">
            MARKHOR CLUB
          </h1>
          <p className="text-xs uppercase tracking-[0.25em] text-[#C7A15A] mt-1 font-medium">
            Management Portal
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-rose-950/40 border border-rose-500/30 flex items-center gap-3 text-xs text-rose-200">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-[#D6B978] tracking-wider uppercase mb-2">
              Admin Username
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C7A15A]/60" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-[#071116] border border-[#C7A15A]/30 rounded-xl pl-10 pr-4 py-3 text-sm text-[#F4F0E8] placeholder-[#F4F0E8]/30 focus:outline-none focus:border-[#C7A15A]"
                placeholder="Enter username"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#D6B978] tracking-wider uppercase mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C7A15A]/60" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#071116] border border-[#C7A15A]/30 rounded-xl pl-10 pr-4 py-3 text-sm text-[#F4F0E8] placeholder-[#F4F0E8]/30 focus:outline-none focus:border-[#C7A15A]"
                placeholder="Enter password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-[#C7A15A] text-[#071116] font-semibold text-xs tracking-widest uppercase hover:bg-[#D6B978] transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(199,161,90,0.2)] disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In To Portal'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="mt-8 text-center text-[10px] tracking-wider text-[#F4F0E8]/40 uppercase border-t border-[#C7A15A]/10 pt-4">
          Authorized Personnel Only • Server Enforced Session
        </div>
      </div>
    </div>
  )
}
