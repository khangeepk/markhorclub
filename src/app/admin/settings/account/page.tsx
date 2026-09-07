'use client'

import React, { useState } from 'react'
import { ArrowLeft, User, Lock, Save, Loader2, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

type Tab = 'profile' | 'password'

export default function AccountPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('profile')

  // Profile state
  const [profile, setProfile] = useState({ fullName: '', email: '', phone: '' })
  const [profileLoading, setProfileLoading] = useState(true)
  const [profileSaving, setProfileSaving] = useState(false)
  const [profileSuccess, setProfileSuccess] = useState('')
  const [profileError, setProfileError] = useState('')

  // Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [passwordSaving, setPasswordSaving] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    fetch('/api/admin/profile')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setProfile({
            fullName: data.user.fullName || '',
            email: data.user.email || '',
            phone: data.user.phone || '',
          })
        }
      })
      .finally(() => setProfileLoading(false))
  }, [])

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setProfileSaving(true)
    setProfileError('')
    setProfileSuccess('')
    try {
      const res = await fetch('/api/admin/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })
      const data = await res.json()
      if (data.success) setProfileSuccess('Profile updated successfully.')
      else setProfileError(data.error || 'Failed to save.')
    } catch {
      setProfileError('Network error.')
    } finally {
      setProfileSaving(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordSaving(true)
    setPasswordError('')
    setPasswordSuccess('')
    try {
      const res = await fetch('/api/admin/settings/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData),
      })
      const data = await res.json()
      if (data.success) {
        setPasswordSuccess('Password changed successfully.')
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
      } else {
        setPasswordError(data.error || 'Failed to change password.')
      }
    } catch {
      setPasswordError('Network error.')
    } finally {
      setPasswordSaving(false)
    }
  }

  const PasswordInput = ({
    label,
    value,
    onChange,
    show,
    onToggle,
    placeholder,
  }: {
    label: string
    value: string
    onChange: (v: string) => void
    show: boolean
    onToggle: () => void
    placeholder?: string
  }) => (
    <div>
      <label className="block text-[10px] font-semibold text-[#D6B978] tracking-widest uppercase mb-2">
        {label}
      </label>
      <div className="relative">
        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C7A15A]/50" />
        <input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder || '••••••••'}
          className="w-full bg-[#071116] border border-[#C7A15A]/25 rounded-lg pl-10 pr-12 py-2.5 text-sm text-[#F4F0E8] placeholder-[#F4F0E8]/25 focus:outline-none focus:border-[#C7A15A] focus:ring-1 focus:ring-[#C7A15A] transition-all"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#C7A15A]/50 hover:text-[#C7A15A] transition-colors"
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
    </div>
  )

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
        <div className="w-9 h-9 rounded-lg bg-sky-400/10 flex items-center justify-center">
          <User className="w-4 h-4 text-sky-400" />
        </div>
        <div>
          <h1 className="text-lg font-serif font-bold text-[#F4F0E8] tracking-wide">My Account</h1>
          <p className="text-xs text-[#F4F0E8]/40">Profile and password management</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-[#071116] rounded-lg p-1 w-fit border border-[#C7A15A]/15">
        {(['profile', 'password'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-md text-xs font-semibold tracking-wide uppercase transition-all ${
              tab === t
                ? 'bg-[#C7A15A] text-[#071116]'
                : 'text-[#F4F0E8]/50 hover:text-[#F4F0E8]'
            }`}
          >
            {t === 'profile' ? 'My Profile' : 'Change Password'}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {tab === 'profile' && (
        profileLoading ? (
          <div className="flex items-center gap-2 text-[#F4F0E8]/40 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading…
          </div>
        ) : (
          <form onSubmit={handleProfileSave} className="space-y-5">
            <div className="bg-[#0B1C26] border border-[#C7A15A]/15 rounded-xl p-6 space-y-4">
              {[
                { label: 'Full Name', field: 'fullName', placeholder: 'Markhor Administrator' },
                { label: 'Email', field: 'email', placeholder: 'admin@markhor.club' },
                { label: 'Phone', field: 'phone', placeholder: '+92 300 0000000' },
              ].map(({ label, field, placeholder }) => (
                <div key={field}>
                  <label className="block text-[10px] font-semibold text-[#D6B978] tracking-widest uppercase mb-2">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={profile[field as keyof typeof profile]}
                    onChange={(e) =>
                      setProfile((p) => ({ ...p, [field]: e.target.value }))
                    }
                    placeholder={placeholder}
                    className="w-full bg-[#071116] border border-[#C7A15A]/25 rounded-lg px-4 py-2.5 text-sm text-[#F4F0E8] placeholder-[#F4F0E8]/25 focus:outline-none focus:border-[#C7A15A] focus:ring-1 focus:ring-[#C7A15A] transition-all"
                  />
                </div>
              ))}
            </div>

            {profileSuccess && (
              <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded-lg px-4 py-3">
                <CheckCircle className="w-4 h-4 shrink-0" /> {profileSuccess}
              </div>
            )}
            {profileError && (
              <div className="flex items-center gap-2 text-sm text-rose-400 bg-rose-950/40 border border-rose-500/30 rounded-lg px-4 py-3">
                <AlertCircle className="w-4 h-4 shrink-0" /> {profileError}
              </div>
            )}

            <button
              type="submit"
              disabled={profileSaving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C7A15A] to-[#D6B978] text-[#071116] rounded-xl font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all disabled:opacity-50"
            >
              {profileSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {profileSaving ? 'Saving…' : 'Save Profile'}
            </button>
          </form>
        )
      )}

      {/* Password Tab */}
      {tab === 'password' && (
        <form onSubmit={handlePasswordChange} className="space-y-5">
          <div className="bg-[#0B1C26] border border-[#C7A15A]/15 rounded-xl p-6 space-y-4">
            <PasswordInput
              label="Current Password"
              value={passwordData.currentPassword}
              onChange={(v) => setPasswordData((p) => ({ ...p, currentPassword: v }))}
              show={showCurrent}
              onToggle={() => setShowCurrent(!showCurrent)}
            />
            <PasswordInput
              label="New Password"
              value={passwordData.newPassword}
              onChange={(v) => setPasswordData((p) => ({ ...p, newPassword: v }))}
              show={showNew}
              onToggle={() => setShowNew(!showNew)}
            />
            <PasswordInput
              label="Confirm New Password"
              value={passwordData.confirmPassword}
              onChange={(v) => setPasswordData((p) => ({ ...p, confirmPassword: v }))}
              show={showNew}
              onToggle={() => setShowNew(!showNew)}
            />

            <div className="text-[10px] text-[#F4F0E8]/35 space-y-1">
              <p>Password requirements:</p>
              <ul className="list-disc ml-4 space-y-0.5">
                <li>Minimum 8 characters</li>
                <li>At least one uppercase and one lowercase letter</li>
                <li>At least one number</li>
                <li>At least one special character (@, #, $, !...)</li>
              </ul>
            </div>
          </div>

          {passwordSuccess && (
            <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded-lg px-4 py-3">
              <CheckCircle className="w-4 h-4 shrink-0" /> {passwordSuccess}
            </div>
          )}
          {passwordError && (
            <div className="flex items-center gap-2 text-sm text-rose-400 bg-rose-950/40 border border-rose-500/30 rounded-lg px-4 py-3">
              <AlertCircle className="w-4 h-4 shrink-0" /> {passwordError}
            </div>
          )}

          <button
            type="submit"
            disabled={passwordSaving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C7A15A] to-[#D6B978] text-[#071116] rounded-xl font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all disabled:opacity-50"
          >
            {passwordSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
            {passwordSaving ? 'Changing…' : 'Change Password'}
          </button>
        </form>
      )}
    </div>
  )
}
