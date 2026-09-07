'use client'

import React, { useState, useEffect } from 'react'
import {
  ArrowLeft,
  Users,
  Plus,
  UserCheck,
  UserX,
  RefreshCw,
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
  Copy,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { ROLE_LABELS, ALL_ROLES } from '@/lib/permissions'

type AdminUser = {
  id: string
  username: string
  fullName: string
  email: string
  phone: string | null
  role: string
  isActive: boolean
  lastLoginAt: string | null
  createdAt: string
  requiresPasswordChange: boolean
}

const ROLE_COLORS: Record<string, string> = {
  SUPER_ADMIN: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  ADMIN: 'text-sky-400 bg-sky-400/10 border-sky-400/30',
  FINANCE_MANAGER: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  MEMBERSHIP_MANAGER: 'text-violet-400 bg-violet-400/10 border-violet-400/30',
  CSR_AGENT: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  VIEW_ONLY: 'text-[#F4F0E8]/50 bg-[#F4F0E8]/5 border-[#F4F0E8]/20',
}

export default function UsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [creating, setCreating] = useState(false)
  const [createError, setCreateError] = useState('')
  const [tempPasswordResult, setTempPasswordResult] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [actionMsg, setActionMsg] = useState('')

  const [form, setForm] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    role: 'ADMIN',
  })

  const loadUsers = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/settings/users')
      const data = await res.json()
      if (data.success) setUsers(data.users)
      else setError(data.error || 'Failed to load users.')
    } catch {
      setError('Network error.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    setCreating(true)
    setCreateError('')
    setTempPasswordResult('')
    try {
      const res = await fetch('/api/admin/settings/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setTempPasswordResult(data.temporaryPassword)
        setForm({ fullName: '', username: '', email: '', phone: '', role: 'ADMIN' })
        await loadUsers()
      } else {
        setCreateError(data.error || 'Failed to create user.')
      }
    } catch {
      setCreateError('Network error.')
    } finally {
      setCreating(false)
    }
  }

  const toggleActive = async (userId: string, currentActive: boolean) => {
    setActionLoading(userId)
    setActionMsg('')
    try {
      const res = await fetch(`/api/admin/settings/users/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive: !currentActive }),
      })
      const data = await res.json()
      if (data.success) {
        setActionMsg(!currentActive ? 'User activated.' : 'User disabled.')
        await loadUsers()
      } else {
        setActionMsg(data.error || 'Failed.')
      }
    } catch {
      setActionMsg('Network error.')
    } finally {
      setActionLoading(null)
    }
  }

  const resetPassword = async (userId: string) => {
    setActionLoading(userId + '_reset')
    setActionMsg('')
    try {
      const res = await fetch(`/api/admin/settings/users/${userId}/password`, {
        method: 'POST',
      })
      const data = await res.json()
      if (data.success) {
        setActionMsg(`Password reset. Temp: ${data.temporaryPassword}`)
      } else {
        setActionMsg(data.error || 'Failed.')
      }
    } catch {
      setActionMsg('Network error.')
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/admin/settings')}
            className="p-2 rounded-lg text-[#F4F0E8]/40 hover:text-[#C7A15A] hover:bg-[#C7A15A]/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="w-9 h-9 rounded-lg bg-violet-400/10 flex items-center justify-center">
            <Users className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <h1 className="text-lg font-serif font-bold text-[#F4F0E8] tracking-wide">Users & Permissions</h1>
            <p className="text-xs text-[#F4F0E8]/40">Role-based access control (RBAC)</p>
          </div>
        </div>
        <button
          onClick={() => { setShowCreate(true); setTempPasswordResult(''); setCreateError('') }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#C7A15A] to-[#D6B978] text-[#071116] rounded-xl font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      {/* Action message */}
      {actionMsg && (
        <div className="mb-4 flex items-center gap-2 text-sm text-[#F4F0E8]/70 bg-[#0B1C26] border border-[#C7A15A]/20 rounded-lg px-4 py-3">
          <CheckCircle className="w-4 h-4 text-[#C7A15A] shrink-0" />
          {actionMsg}
        </div>
      )}

      {/* Create User Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1C26] border border-[#C7A15A]/30 rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-base font-serif font-bold text-[#F4F0E8]">Create New User</h2>
              <button
                onClick={() => setShowCreate(false)}
                className="p-1.5 rounded-lg text-[#F4F0E8]/40 hover:text-[#C7A15A] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {tempPasswordResult ? (
              <div className="space-y-4">
                <div className="flex items-start gap-2 text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded-lg px-4 py-3">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  User created. Share the temporary password securely.
                </div>
                <div className="bg-[#071116] rounded-lg px-4 py-3 border border-[#C7A15A]/20">
                  <p className="text-[10px] text-[#C7A15A] uppercase tracking-widest mb-1">Temporary Password</p>
                  <div className="flex items-center gap-2">
                    <code className="text-sm text-[#F4F0E8] font-mono flex-1">{tempPasswordResult}</code>
                    <button
                      onClick={() => navigator.clipboard.writeText(tempPasswordResult)}
                      className="p-1.5 text-[#C7A15A]/60 hover:text-[#C7A15A] transition-colors"
                      title="Copy"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-[10px] text-[#F4F0E8]/35">
                  This password is shown only once. The user will be required to change it on first login.
                </p>
                <button
                  onClick={() => { setShowCreate(false); setTempPasswordResult('') }}
                  className="w-full py-2.5 bg-[#C7A15A]/20 border border-[#C7A15A]/30 text-[#C7A15A] rounded-lg text-xs font-semibold tracking-wide uppercase hover:bg-[#C7A15A]/30 transition-all"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleCreate} className="space-y-4">
                {[
                  { label: 'Full Name', field: 'fullName', required: true },
                  { label: 'Username', field: 'username', required: true },
                  { label: 'Email', field: 'email', required: true },
                  { label: 'Phone (optional)', field: 'phone', required: false },
                ].map(({ label, field, required }) => (
                  <div key={field}>
                    <label className="block text-[10px] font-semibold text-[#D6B978] tracking-widest uppercase mb-1.5">
                      {label}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      required={required}
                      value={form[field as keyof typeof form]}
                      onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                      className="w-full bg-[#071116] border border-[#C7A15A]/25 rounded-lg px-3 py-2 text-sm text-[#F4F0E8] placeholder-[#F4F0E8]/25 focus:outline-none focus:border-[#C7A15A] transition-all"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-[10px] font-semibold text-[#D6B978] tracking-widest uppercase mb-1.5">
                    Role
                  </label>
                  <select
                    value={form.role}
                    onChange={(e) => setForm((f) => ({ ...f, role: e.target.value }))}
                    className="w-full bg-[#071116] border border-[#C7A15A]/25 rounded-lg px-3 py-2 text-sm text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A] transition-all"
                  >
                    {ALL_ROLES.map((r) => (
                      <option key={r} value={r}>{ROLE_LABELS[r]}</option>
                    ))}
                  </select>
                </div>

                {createError && (
                  <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/40 border border-rose-500/30 rounded-lg px-3 py-2">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {createError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={creating}
                  className="w-full py-2.5 bg-gradient-to-r from-[#C7A15A] to-[#D6B978] text-[#071116] rounded-lg font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {creating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  {creating ? 'Creating…' : 'Create User'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Users Table */}
      {loading ? (
        <div className="flex items-center gap-2 text-[#F4F0E8]/40 text-sm">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading users…
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 text-sm text-rose-400 bg-rose-950/40 border border-rose-500/30 rounded-lg px-4 py-3">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      ) : (
        <div className="bg-[#0B1C26] border border-[#C7A15A]/15 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#C7A15A]/15">
                  {['User', 'Role', 'Status', 'Last Login', 'Actions'].map((h) => (
                    <th
                      key={h}
                      className="text-left text-[10px] font-semibold text-[#C7A15A] tracking-widest uppercase px-4 py-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-[#C7A15A]/8 hover:bg-[#C7A15A]/5 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-[#F4F0E8]">{u.fullName}</div>
                      <div className="text-[11px] text-[#F4F0E8]/50">@{u.username}</div>
                      <div className="text-[10px] text-[#F4F0E8]/35">{u.email}</div>
                      {u.requiresPasswordChange && (
                        <span className="text-[10px] text-amber-400">⚠ Password change required</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-semibold tracking-wide uppercase ${ROLE_COLORS[u.role] || 'text-[#F4F0E8]/50 bg-[#F4F0E8]/5 border-[#F4F0E8]/20'}`}
                      >
                        {ROLE_LABELS[u.role] || u.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium ${u.isActive ? 'text-emerald-400' : 'text-rose-400'}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${u.isActive ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                        {u.isActive ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#F4F0E8]/40">
                      {u.lastLoginAt
                        ? new Date(u.lastLoginAt).toLocaleDateString('en-PK', {
                            day: 'numeric', month: 'short', year: 'numeric',
                          })
                        : 'Never'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => toggleActive(u.id, u.isActive)}
                          disabled={actionLoading === u.id}
                          className={`p-1.5 rounded-lg transition-all ${
                            u.isActive
                              ? 'text-rose-400/70 hover:bg-rose-400/10 hover:text-rose-400'
                              : 'text-emerald-400/70 hover:bg-emerald-400/10 hover:text-emerald-400'
                          } disabled:opacity-40`}
                          title={u.isActive ? 'Disable user' : 'Activate user'}
                        >
                          {actionLoading === u.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : u.isActive ? (
                            <UserX className="w-3.5 h-3.5" />
                          ) : (
                            <UserCheck className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          onClick={() => resetPassword(u.id)}
                          disabled={actionLoading === u.id + '_reset'}
                          className="p-1.5 rounded-lg text-amber-400/70 hover:bg-amber-400/10 hover:text-amber-400 transition-all disabled:opacity-40"
                          title="Reset password"
                        >
                          {actionLoading === u.id + '_reset' ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <RefreshCw className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Roles Reference */}
      <div className="mt-8 bg-[#0B1C26] border border-[#C7A15A]/15 rounded-xl p-5">
        <h3 className="text-xs font-semibold text-[#C7A15A] tracking-widest uppercase mb-3">Role Permissions Reference</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ALL_ROLES.map((role) => (
            <div key={role} className="bg-[#071116] rounded-lg p-3">
              <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-semibold tracking-wide uppercase mb-2 ${ROLE_COLORS[role]}`}>
                {ROLE_LABELS[role]}
              </span>
              <p className="text-[11px] text-[#F4F0E8]/40 leading-relaxed">
                {role === 'SUPER_ADMIN' && 'Full access: users, roles, settings, financials, CRM, audit logs'}
                {role === 'ADMIN' && 'Full operations: members, payments, income, expenses, CRM, notifications'}
                {role === 'FINANCE_MANAGER' && 'Finance only: payments, income, expenses, P&L, reports'}
                {role === 'MEMBERSHIP_MANAGER' && 'Membership: inquiries, members, cards, CRM, notifications'}
                {role === 'CSR_AGENT' && 'Customer service: inquiries, live chat, CRM, notifications (no financials)'}
                {role === 'VIEW_ONLY' && 'Read-only access to permitted modules'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
