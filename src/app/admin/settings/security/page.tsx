'use client'

import React, { useState, useEffect } from 'react'
import { ArrowLeft, Shield, Monitor, LogOut, Loader2, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function SecurityPage() {
  const router = useRouter()
  const [session, setSession] = useState<{
    username: string
    role: string
    lastLoginAt: string | null
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    fetch('/api/admin/profile')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setSession({
            username: data.user.username,
            role: data.user.role,
            lastLoginAt: null, // fetched separately if needed
          })
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const handleLogoutAll = async () => {
    if (!confirm('Sign out of the admin portal?')) return
    setLoggingOut(true)
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch {
      setLoggingOut(false)
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => router.push('/admin/settings')}
          className="p-2 rounded-lg text-[#F4F0E8]/40 hover:text-[#C7A15A] hover:bg-[#C7A15A]/10 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="w-9 h-9 rounded-lg bg-rose-400/10 flex items-center justify-center">
          <Shield className="w-4 h-4 text-rose-400" />
        </div>
        <div>
          <h1 className="text-lg font-serif font-bold text-[#F4F0E8] tracking-wide">Security</h1>
          <p className="text-xs text-[#F4F0E8]/40">Session and access security settings</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Current Session */}
        <div className="bg-[#0B1C26] border border-[#C7A15A]/15 rounded-xl p-5">
          <h2 className="text-[10px] uppercase tracking-widest text-[#C7A15A] font-semibold mb-4">
            Current Session
          </h2>
          {loading ? (
            <div className="flex items-center gap-2 text-[#F4F0E8]/40 text-sm">
              <Loader2 className="w-4 h-4 animate-spin" /> Loading…
            </div>
          ) : session ? (
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#C7A15A]/15 border border-[#C7A15A]/30 flex items-center justify-center">
                <Monitor className="w-5 h-5 text-[#C7A15A]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#F4F0E8]">@{session.username}</p>
                <p className="text-xs text-[#F4F0E8]/50">
                  Role: {session.role} • Active session
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] text-emerald-400">Authenticated</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Session Security Info */}
        <div className="bg-[#0B1C26] border border-[#C7A15A]/15 rounded-xl p-5">
          <h2 className="text-[10px] uppercase tracking-widest text-[#C7A15A] font-semibold mb-4">
            Session Security
          </h2>
          <div className="space-y-2.5 text-xs text-[#F4F0E8]/60">
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <span>JWT sessions expire after 12 hours</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <span>HTTP-only, SameSite cookies — not accessible via JavaScript</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <span>All admin actions are audit-logged with username, action, and timestamp</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <span>Passwords hashed with bcrypt (cost factor 10) — never stored in plain text</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <span>Login rate-limited: 5 failed attempts triggers 15-minute lockout per IP</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <span>RBAC enforced server-side on all sensitive API endpoints</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 mt-0.5">✓</span>
              <span>Last active SUPER_ADMIN cannot be disabled or demoted</span>
            </div>
          </div>
        </div>

        {/* Sign Out */}
        <div className="bg-[#0B1C26] border border-rose-500/20 rounded-xl p-5">
          <h2 className="text-[10px] uppercase tracking-widest text-rose-400 font-semibold mb-3">
            Sign Out
          </h2>
          <p className="text-xs text-[#F4F0E8]/50 mb-4">
            Sign out of the admin portal. You will need to log in again to access the portal.
          </p>
          <button
            onClick={handleLogoutAll}
            disabled={loggingOut}
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-900/40 border border-rose-500/30 text-rose-400 rounded-xl text-xs font-semibold tracking-wide uppercase hover:bg-rose-900/60 transition-all disabled:opacity-50"
          >
            {loggingOut ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            {loggingOut ? 'Signing out…' : 'Sign Out'}
          </button>
        </div>

        {/* Password change link */}
        <div className="flex items-start gap-3 bg-[#071116] border border-[#C7A15A]/10 rounded-xl p-4">
          <AlertCircle className="w-4 h-4 text-[#C7A15A] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-[#F4F0E8]/60">
              To change your password, go to{' '}
              <button
                onClick={() => router.push('/admin/settings/account')}
                className="text-[#C7A15A] hover:underline"
              >
                My Account → Change Password
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
