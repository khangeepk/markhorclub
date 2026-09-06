'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Lock, User, ShieldAlert, ArrowRight, Eye, EyeOff } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('Markhorclub')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
        // Enforce generic credentials feedback or specific rate-limit feedback
        if (res.status === 429) {
          setError(data.error || 'Too many failed login attempts. Please try again later.')
        } else {
          setError('Invalid credentials.')
        }
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#071116] flex items-center justify-center p-4 relative overflow-hidden font-sans select-none">
      {/* Ambient Radial Gradient Background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(199,161,90,0.12)_0%,_transparent_70%)]" />

      <div className="w-full max-w-md rounded-2xl bg-[#0B1C26]/95 border border-[#C7A15A]/30 p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl relative z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#C7A15A]/10 border border-[#C7A15A]/40 mb-4 text-[#C7A15A]">
            <Image
              src="/assets/logos/markhor-logo-gold.png"
              alt="Markhor Club Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#F4F0E8] tracking-wider uppercase">
            MARKHOR CLUB
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#C7A15A] mt-1 font-semibold">
            ADMIN PORTAL
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/40 flex items-center gap-3 text-xs text-rose-200">
            <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] font-semibold text-[#D6B978] tracking-widest uppercase mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C7A15A]/60" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full bg-[#071116] border border-[#C7A15A]/30 rounded-xl pl-10 pr-4 py-3 text-sm text-[#F4F0E8] placeholder-[#F4F0E8]/30 focus:outline-none focus:border-[#C7A15A] focus:ring-1 focus:ring-[#C7A15A] transition-all"
                placeholder="Enter admin username"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-[#D6B978] tracking-widest uppercase mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C7A15A]/60" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#071116] border border-[#C7A15A]/30 rounded-xl pl-10 pr-12 py-3 text-sm text-[#F4F0E8] placeholder-[#F4F0E8]/30 focus:outline-none focus:border-[#C7A15A] focus:ring-1 focus:ring-[#C7A15A] transition-all"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#C7A15A]/60 hover:text-[#C7A15A] transition-colors p-1"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#C7A15A] to-[#D6B978] text-[#071116] font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(199,161,90,0.25)] disabled:opacity-50 mt-2 active:scale-[0.99]"
          >
            {loading ? 'Authenticating...' : 'Sign In To Portal'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        {/* Security Footer Note */}
        <div className="mt-8 text-center text-[10px] tracking-widest text-[#F4F0E8]/40 uppercase border-t border-[#C7A15A]/15 pt-4 font-mono">
          Authorized Personnel Only • Server Enforced Session
        </div>
      </div>
    </div>
  )
}
