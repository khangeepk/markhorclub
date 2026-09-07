'use client'

import React, { useState, useEffect } from 'react'
import {
  ArrowLeft,
  User,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  Shield,
  Key,
} from 'lucide-react'
import { useRouter, useParams } from 'next/navigation'
import { ROLE_LABELS, ALL_ROLES, PERMISSIONS } from '@/lib/permissions'

export default function EditUserPage() {
  const router = useRouter()
  const params = useParams()
  const userId = params?.id as string

  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    role: 'ADMIN',
    isActive: true,
    requiresPasswordChange: false,
  })
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!userId) return
    fetch(`/api/admin/settings/users/${userId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          const u = data.user
          setForm({
            fullName: u.fullName || '',
            username: u.username || '',
            email: u.email || '',
            phone: u.phone || '',
            role: u.role || 'ADMIN',
            isActive: u.isActive !== false,
            requiresPasswordChange: u.requiresPasswordChange || false,
          })
          if (u.permissions) {
            try {
              setSelectedPermissions(JSON.parse(u.permissions))
            } catch {
              setSelectedPermissions([])
            }
          }
        } else {
          setError(data.error || 'Failed to load user details.')
        }
      })
      .finally(() => setLoading(false))
  }, [userId])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setSuccess('')
    try {
      const res = await fetch(`/api/admin/settings/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          permissions: selectedPermissions,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess('User updated successfully.')
      } else {
        setError(data.error || 'Failed to update user.')
      }
    } catch {
      setError('Network error.')
    } finally {
      setSaving(false)
    }
  }

  const togglePermission = (permKey: string) => {
    setSelectedPermissions((prev) =>
      prev.includes(permKey) ? prev.filter((p) => p !== permKey) : [...prev, permKey]
    )
  }

  return (
    <div className="p-6 md:p-8 max-w-3xl">
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => router.push('/admin/settings/users')}
          className="p-2 rounded-lg text-[#F4F0E8]/40 hover:text-[#C7A15A] hover:bg-[#C7A15A]/10 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="w-9 h-9 rounded-lg bg-violet-400/10 flex items-center justify-center">
          <User className="w-4 h-4 text-violet-400" />
        </div>
        <div>
          <h1 className="text-lg font-serif font-bold text-[#F4F0E8] tracking-wide">
            Edit User — @{form.username || '...'}
          </h1>
          <p className="text-xs text-[#F4F0E8]/40">Modify user profile, role, and granular permissions</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center gap-2 text-[#F4F0E8]/40 text-sm">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading user details…
        </div>
      ) : (
        <form onSubmit={handleSave} className="space-y-6">
          <div className="bg-[#0B1C26] border border-[#C7A15A]/15 rounded-xl p-6 space-y-4">
            <h2 className="text-[10px] uppercase tracking-widest text-[#C7A15A] font-semibold mb-2">
              User Profile
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-[#D6B978] tracking-widest uppercase mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                  className="w-full bg-[#071116] border border-[#C7A15A]/25 rounded-lg px-3 py-2 text-sm text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#D6B978] tracking-widest uppercase mb-1.5">
                  Username (Read-only)
                </label>
                <input
                  type="text"
                  disabled
                  value={form.username}
                  className="w-full bg-[#071116]/50 border border-[#F4F0E8]/10 rounded-lg px-3 py-2 text-sm text-[#F4F0E8]/40 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#D6B978] tracking-widest uppercase mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  className="w-full bg-[#071116] border border-[#C7A15A]/25 rounded-lg px-3 py-2 text-sm text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-semibold text-[#D6B978] tracking-widest uppercase mb-1.5">
                  Phone
                </label>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full bg-[#071116] border border-[#C7A15A]/25 rounded-lg px-3 py-2 text-sm text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A]"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#0B1C26] border border-[#C7A15A]/15 rounded-xl p-6 space-y-4">
            <h2 className="text-[10px] uppercase tracking-widest text-[#C7A15A] font-semibold mb-2">
              Role & Status
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-semibold text-[#D6B978] tracking-widest uppercase mb-1.5">
                  Role
                </label>
                <select
                  value={form.role}
                  onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                  className="w-full bg-[#071116] border border-[#C7A15A]/25 rounded-lg px-3 py-2 text-sm text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A]"
                >
                  {ALL_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {ROLE_LABELS[r]}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-6 pt-5">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                    className="w-4 h-4 accent-[#C7A15A]"
                  />
                  <span className="text-xs text-[#F4F0E8]">Account Active</span>
                </label>
              </div>
            </div>
          </div>

          {/* Granular Permissions */}
          <div className="bg-[#0B1C26] border border-[#C7A15A]/15 rounded-xl p-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <Key className="w-4 h-4 text-violet-400" />
              <h2 className="text-[10px] uppercase tracking-widest text-[#C7A15A] font-semibold">
                Extra Granular Permissions
              </h2>
            </div>
            <p className="text-xs text-[#F4F0E8]/40">
              Select additional specific permissions beyond default role permissions:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {Object.entries(PERMISSIONS).map(([key, val]) => {
                const checked = selectedPermissions.includes(val)
                return (
                  <label
                    key={key}
                    onClick={() => togglePermission(val)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-xs cursor-pointer transition-all ${
                      checked
                        ? 'bg-violet-950/40 border-violet-500/40 text-violet-300'
                        : 'bg-[#071116] border-[#C7A15A]/10 text-[#F4F0E8]/50 hover:border-[#C7A15A]/25'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {}}
                      className="w-3.5 h-3.5 accent-violet-500"
                    />
                    <span className="font-mono text-[11px]">{val}</span>
                  </label>
                )
              })}
            </div>
          </div>

          {success && (
            <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded-lg px-4 py-3">
              <CheckCircle className="w-4 h-4 shrink-0" /> {success}
            </div>
          )}
          {error && (
            <div className="flex items-center gap-2 text-sm text-rose-400 bg-rose-950/40 border border-rose-500/30 rounded-lg px-4 py-3">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#C7A15A] to-[#D6B978] text-[#071116] rounded-xl font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
            <button
              type="button"
              onClick={() => router.push('/admin/settings/users')}
              className="px-5 py-3 bg-[#071116] border border-[#C7A15A]/20 text-[#F4F0E8]/60 hover:text-[#F4F0E8] rounded-xl text-xs font-semibold tracking-wide uppercase transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
