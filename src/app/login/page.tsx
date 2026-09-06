"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    if (!email || !password) {
      setError("Please enter your email and password.")
      return
    }
    setLoading(true)
    // Simulate authentication delay
    await new Promise((r) => setTimeout(r, 600))

    try {
      // In a real app, call an API route here. For now just redirect.
      router.push("/")
    } catch {
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-24 bg-[#071116] text-[#F4F0E8] relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-vignette opacity-50 pointer-events-none" />
      <div className="max-w-md w-full glass-panel rounded-sm p-8 md:p-10 relative z-10 border border-[#C7A15A]/30 shadow-2xl">
        <div className="flex flex-col items-center text-center mb-8">
          <Link href="/" className="mb-6">
            <Image
              src="/assets/logos/markhor-logo-gold.png"
              alt="Markhor Club"
              width={140}
              height={48}
              priority
              className="w-auto h-12 object-contain"
            />
          </Link>
          <h1 className="text-2xl font-serif font-semibold text-[#F4F0E8] mb-2">
            Member Portal
          </h1>
          <p className="text-xs uppercase tracking-[0.15em] text-[#9A9389]">
            Private Access • Markhor Club
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[#D6B978] mb-2 font-medium">
              Member Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#04090C]/80 border border-[#C7A15A]/30 rounded-sm text-[#F4F0E8] placeholder-[#9A9389]/60 focus:outline-none focus:border-[#C7A15A] transition-colors text-sm"
              placeholder="member@markhourgroup.com"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-[#D6B978] mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#04090C]/80 border border-[#C7A15A]/30 rounded-sm text-[#F4F0E8] placeholder-[#9A9389]/60 focus:outline-none focus:border-[#C7A15A] transition-colors text-sm"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-xs text-red-400 font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full py-3.5 px-6 bg-gradient-to-r from-[#C7A15A] to-[#D6B978] text-[#071116] font-semibold uppercase tracking-[0.15em] text-xs rounded-sm hover:shadow-lg hover:shadow-[#C7A15A]/25 transition-all duration-300 disabled:opacity-50 mt-4"
            disabled={loading}
          >
            {loading ? "Authenticating..." : "Sign In to Member Portal"}
          </button>
        </form>
      </div>
    </main>
  )
}
