'use client'

import React, { useState, useEffect } from 'react'
import { Save, ArrowLeft, Building2, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Settings = {
  club_name: string
  club_email: string
  club_phone: string
  club_website: string
  club_address: string
  club_currency: string
  club_default_fee: string
}

const CURRENCIES = ['PKR', 'USD', 'EUR', 'GBP', 'AED']

export default function ClubProfilePage() {
  const router = useRouter()
  const [settings, setSettings] = useState<Settings>({
    club_name: '',
    club_email: '',
    club_phone: '',
    club_website: '',
    club_address: '',
    club_currency: 'PKR',
    club_default_fee: '500000',
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/admin/settings/club')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setSettings((prev) => ({ ...prev, ...data.settings }))
        }
      })
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch('/api/admin/settings/club', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })
      const data = await res.json()
      if (data.success) setSuccess('Club profile saved successfully.')
      else setError(data.error || 'Failed to save.')
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const InputField = ({
    label,
    field,
    type = 'text',
    placeholder,
  }: {
    label: string
    field: keyof Settings
    type?: string
    placeholder?: string
  }) => (
    <div>
      <label className="block text-[10px] font-semibold text-[#D6B978] tracking-widest uppercase mb-2">
        {label}
      </label>
      <input
        type={type}
        value={settings[field]}
        onChange={(e) => setSettings((s) => ({ ...s, [field]: e.target.value }))}
        placeholder={placeholder}
        className="w-full bg-[#071116] border border-[#C7A15A]/25 rounded-lg px-4 py-2.5 text-sm text-[#F4F0E8] placeholder-[#F4F0E8]/25 focus:outline-none focus:border-[#C7A15A] focus:ring-1 focus:ring-[#C7A15A] transition-all"
      />
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
        <div className="w-9 h-9 rounded-lg bg-[#C7A15A]/10 flex items-center justify-center">
          <Building2 className="w-4 h-4 text-[#C7A15A]" />
        </div>
        <div>
          <h1 className="text-lg font-serif font-bold text-[#F4F0E8] tracking-wide">Club Profile</h1>
          <p className="text-xs text-[#F4F0E8]/40">Manage Markhor Club display details</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-[#F4F0E8]/40 text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading settings…
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-5">
          <div className="bg-[#0B1C26] border border-[#C7A15A]/15 rounded-xl p-6 space-y-5">
            <h2 className="text-[10px] uppercase tracking-widest text-[#C7A15A] font-semibold mb-2">
              Basic Information
            </h2>
            <InputField label="Club Display Name" field="club_name" placeholder="Markhor Club" />
            <InputField label="Business Email" field="club_email" type="email" placeholder="info@markhourgroup.com" />
            <InputField label="Business Phone / UAN" field="club_phone" placeholder="0995-111-222-333" />
            <InputField label="Website" field="club_website" placeholder="www.markhourgroup.com" />
          </div>

          <div className="bg-[#0B1C26] border border-[#C7A15A]/15 rounded-xl p-6 space-y-5">
            <h2 className="text-[10px] uppercase tracking-widest text-[#C7A15A] font-semibold mb-2">
              Location
            </h2>
            <div>
              <label className="block text-[10px] font-semibold text-[#D6B978] tracking-widest uppercase mb-2">
                Address / Location Description
              </label>
              <textarea
                rows={3}
                value={settings.club_address}
                onChange={(e) => setSettings((s) => ({ ...s, club_address: e.target.value }))}
                placeholder="Near Alexander Road, Khanpur Dam, KPK, Pakistan"
                className="w-full bg-[#071116] border border-[#C7A15A]/25 rounded-lg px-4 py-2.5 text-sm text-[#F4F0E8] placeholder-[#F4F0E8]/25 focus:outline-none focus:border-[#C7A15A] focus:ring-1 focus:ring-[#C7A15A] transition-all resize-none"
              />
            </div>
          </div>

          <div className="bg-[#0B1C26] border border-[#C7A15A]/15 rounded-xl p-6 space-y-5">
            <h2 className="text-[10px] uppercase tracking-widest text-[#C7A15A] font-semibold mb-2">
              Membership Defaults
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-[#D6B978] tracking-widest uppercase mb-2">
                  Default Currency
                </label>
                <select
                  value={settings.club_currency}
                  onChange={(e) => setSettings((s) => ({ ...s, club_currency: e.target.value }))}
                  className="w-full bg-[#071116] border border-[#C7A15A]/25 rounded-lg px-4 py-2.5 text-sm text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A] focus:ring-1 focus:ring-[#C7A15A] transition-all"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <InputField label="Default Membership Fee" field="club_default_fee" type="number" placeholder="500000" />
            </div>
            <p className="text-[10px] text-[#F4F0E8]/35 italic">
              This default fee is used for new memberships. Historical member fee snapshots are not affected.
            </p>
          </div>

          {success && (
            <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded-lg px-4 py-3">
              <CheckCircle className="w-4 h-4 shrink-0" />
              {success}
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 text-sm text-rose-400 bg-rose-950/40 border border-rose-500/30 rounded-lg px-4 py-3">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C7A15A] to-[#D6B978] text-[#071116] rounded-xl font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving…' : 'Save Club Profile'}
          </button>
        </form>
      )}
    </div>
  )
}
