'use client'

import React, { useState, useEffect } from 'react'
import {
  ArrowLeft,
  CreditCard,
  Plus,
  Eye,
  EyeOff,
  Pencil,
  PowerOff,
  Loader2,
  CheckCircle,
  AlertCircle,
  X,
  Save,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

type PaymentAccount = {
  id: string
  provider: string
  accountTitle: string
  accountNumber: string
  accountNumberMasked: string
  iban: string | null
  branch: string | null
  currency: string
  isActive: boolean
  displayOnPublicPage: boolean
  verificationMode: string
  description: string | null
  createdAt: string
}

const PROVIDERS = [
  'Easypaisa', 'JazzCash', 'UBL', 'Meezan Bank', 'HBL', 'MCB', 'Bank Alfalah',
  'Safepay', 'NayaPay', 'SadaPay', 'Other',
]

const VERIFICATION_MODES = [
  { value: 'MANUAL', label: 'Manual Verification' },
  { value: 'STATEMENT_RECONCILIATION', label: 'Statement Reconciliation' },
  { value: 'API_WEBHOOK', label: 'API / Webhook' },
]

const EMPTY_FORM = {
  provider: 'Easypaisa',
  accountTitle: '',
  accountNumber: '',
  iban: '',
  branch: '',
  currency: 'PKR',
  isActive: true,
  displayOnPublicPage: false,
  verificationMode: 'MANUAL',
  description: '',
}

export default function PaymentAccountsPage() {
  const router = useRouter()
  const [accounts, setAccounts] = useState<PaymentAccount[]>([])
  const [rawAccounts, setRawAccounts] = useState<PaymentAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showCreate, setShowCreate] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ ...EMPTY_FORM })
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [revealedId, setRevealedId] = useState<string | null>(null)
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const loadAccounts = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/settings/payment-accounts')
      const data = await res.json()
      if (data.success) {
        setAccounts(data.accounts)
        setRawAccounts(data.rawAccounts || [])
      } else {
        setError(data.error || 'Failed to load.')
      }
    } catch {
      setError('Network error.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAccounts()
  }, [])

  const openCreate = () => {
    setForm({ ...EMPTY_FORM })
    setEditingId(null)
    setFormError('')
    setShowCreate(true)
  }

  const openEdit = (account: PaymentAccount) => {
    const raw = rawAccounts.find((a) => a.id === account.id) || account
    setForm({
      provider: raw.provider,
      accountTitle: raw.accountTitle,
      accountNumber: raw.accountNumber,
      iban: raw.iban || '',
      branch: raw.branch || '',
      currency: raw.currency,
      isActive: raw.isActive,
      displayOnPublicPage: raw.displayOnPublicPage,
      verificationMode: raw.verificationMode,
      description: raw.description || '',
    })
    setEditingId(account.id)
    setFormError('')
    setShowCreate(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setFormError('')
    setSuccessMsg('')
    try {
      const url = editingId
        ? `/api/admin/settings/payment-accounts/${editingId}`
        : '/api/admin/settings/payment-accounts'
      const method = editingId ? 'PUT' : 'POST'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setSuccessMsg(editingId ? 'Payment account updated.' : 'Payment account created.')
        setShowCreate(false)
        await loadAccounts()
      } else {
        setFormError(data.error || 'Failed to save.')
      }
    } catch {
      setFormError('Network error.')
    } finally {
      setSaving(false)
    }
  }

  const deactivate = async (id: string) => {
    if (!confirm('Deactivate this payment account?')) return
    setActionLoading(id)
    try {
      const res = await fetch(`/api/admin/settings/payment-accounts/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setSuccessMsg('Account deactivated.')
        await loadAccounts()
      } else {
        setSuccessMsg(data.error || 'Failed.')
      }
    } catch {
      setSuccessMsg('Network error.')
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/admin/settings')}
            className="p-2 rounded-lg text-[#F4F0E8]/40 hover:text-[#C7A15A] hover:bg-[#C7A15A]/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="w-9 h-9 rounded-lg bg-emerald-400/10 flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-lg font-serif font-bold text-[#F4F0E8] tracking-wide">Payment Accounts</h1>
            <p className="text-xs text-[#F4F0E8]/40">Configure payment destinations for membership collection</p>
          </div>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#C7A15A] to-[#D6B978] text-[#071116] rounded-xl font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all"
        >
          <Plus className="w-4 h-4" /> Add Account
        </button>
      </div>

      {/* Success message */}
      {successMsg && (
        <div className="mb-4 flex items-center gap-2 text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded-lg px-4 py-3">
          <CheckCircle className="w-4 h-4 shrink-0" /> {successMsg}
        </div>
      )}

      {/* Create / Edit Modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1C26] border border-[#C7A15A]/30 rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-base font-serif font-bold text-[#F4F0E8]">
                {editingId ? 'Edit Payment Account' : 'Add Payment Account'}
              </h2>
              <button onClick={() => setShowCreate(false)} className="p-1.5 rounded-lg text-[#F4F0E8]/40 hover:text-[#C7A15A]">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-semibold text-[#D6B978] tracking-widest uppercase mb-1.5">Provider</label>
                  <select
                    value={form.provider}
                    onChange={(e) => setForm((f) => ({ ...f, provider: e.target.value }))}
                    className="w-full bg-[#071116] border border-[#C7A15A]/25 rounded-lg px-3 py-2 text-sm text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A] transition-all"
                  >
                    {PROVIDERS.map((p) => <option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-semibold text-[#D6B978] tracking-widest uppercase mb-1.5">Currency</label>
                  <select
                    value={form.currency}
                    onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
                    className="w-full bg-[#071116] border border-[#C7A15A]/25 rounded-lg px-3 py-2 text-sm text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A] transition-all"
                  >
                    {['PKR', 'USD', 'AED', 'EUR', 'GBP'].map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {[
                { label: 'Account Title', field: 'accountTitle', required: true },
                { label: 'Account / Wallet Number', field: 'accountNumber', required: true },
                { label: 'IBAN (optional)', field: 'iban', required: false },
                { label: 'Branch (optional)', field: 'branch', required: false },
                { label: 'Description (optional)', field: 'description', required: false },
              ].map(({ label, field, required }) => (
                <div key={field}>
                  <label className="block text-[10px] font-semibold text-[#D6B978] tracking-widest uppercase mb-1.5">{label}</label>
                  <input
                    type="text"
                    required={required}
                    value={form[field as keyof typeof form] as string}
                    onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                    className="w-full bg-[#071116] border border-[#C7A15A]/25 rounded-lg px-3 py-2 text-sm text-[#F4F0E8] placeholder-[#F4F0E8]/25 focus:outline-none focus:border-[#C7A15A] transition-all"
                  />
                </div>
              ))}

              <div>
                <label className="block text-[10px] font-semibold text-[#D6B978] tracking-widest uppercase mb-1.5">Verification Mode</label>
                <select
                  value={form.verificationMode}
                  onChange={(e) => setForm((f) => ({ ...f, verificationMode: e.target.value }))}
                  className="w-full bg-[#071116] border border-[#C7A15A]/25 rounded-lg px-3 py-2 text-sm text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A] transition-all"
                >
                  {VERIFICATION_MODES.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
              </div>

              <div className="flex items-center gap-6">
                {[
                  { label: 'Active', field: 'isActive' },
                  { label: 'Show on Public Payment Page', field: 'displayOnPublicPage' },
                ].map(({ label, field }) => (
                  <label key={field} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form[field as 'isActive' | 'displayOnPublicPage']}
                      onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.checked }))}
                      className="w-4 h-4 accent-[#C7A15A]"
                    />
                    <span className="text-xs text-[#F4F0E8]/70">{label}</span>
                  </label>
                ))}
              </div>

              {formError && (
                <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-950/40 border border-rose-500/30 rounded-lg px-3 py-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {formError}
                </div>
              )}

              <button
                type="submit"
                disabled={saving}
                className="w-full py-2.5 bg-gradient-to-r from-[#C7A15A] to-[#D6B978] text-[#071116] rounded-lg font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                {saving ? 'Saving…' : editingId ? 'Update Account' : 'Add Account'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Accounts List */}
      {loading ? (
        <div className="flex items-center gap-2 text-[#F4F0E8]/40 text-sm">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading…
        </div>
      ) : error ? (
        <div className="flex items-center gap-2 text-sm text-rose-400 bg-rose-950/40 border border-rose-500/30 rounded-lg px-4 py-3">
          <AlertCircle className="w-4 h-4 shrink-0" /> {error}
        </div>
      ) : (
        <div className="space-y-3">
          {accounts.map((acc) => (
            <div
              key={acc.id}
              className={`bg-[#0B1C26] border rounded-xl p-5 ${acc.isActive ? 'border-[#C7A15A]/20' : 'border-[#F4F0E8]/10 opacity-60'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-[#F4F0E8]">{acc.provider}</h3>
                    {acc.isActive ? (
                      <span className="text-[10px] text-emerald-400 bg-emerald-400/10 border border-emerald-400/30 rounded px-1.5 py-0.5 font-semibold uppercase tracking-wide">Active</span>
                    ) : (
                      <span className="text-[10px] text-rose-400 bg-rose-400/10 border border-rose-400/30 rounded px-1.5 py-0.5 font-semibold uppercase tracking-wide">Inactive</span>
                    )}
                    {acc.displayOnPublicPage && (
                      <span className="text-[10px] text-sky-400 bg-sky-400/10 border border-sky-400/30 rounded px-1.5 py-0.5 font-semibold uppercase tracking-wide">Public</span>
                    )}
                  </div>
                  <p className="text-xs text-[#F4F0E8]/60">{acc.accountTitle}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="font-mono text-xs text-[#C7A15A]">
                      {revealedId === acc.id ? (rawAccounts.find((a) => a.id === acc.id)?.accountNumber || acc.accountNumber) : acc.accountNumberMasked}
                    </span>
                    <button
                      onClick={() => setRevealedId(revealedId === acc.id ? null : acc.id)}
                      className="p-0.5 text-[#F4F0E8]/30 hover:text-[#C7A15A] transition-colors"
                      title={revealedId === acc.id ? 'Hide' : 'Reveal'}
                    >
                      {revealedId === acc.id ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    </button>
                  </div>
                  {acc.iban && <p className="text-[11px] text-[#F4F0E8]/40 mt-1">IBAN: {acc.iban}</p>}
                  <p className="text-[10px] text-[#F4F0E8]/30 mt-1.5">
                    {acc.verificationMode.replace('_', ' ')} • {acc.currency}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => openEdit(acc)}
                    className="p-2 rounded-lg text-[#C7A15A]/60 hover:text-[#C7A15A] hover:bg-[#C7A15A]/10 transition-all"
                    title="Edit"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  {acc.isActive && (
                    <button
                      onClick={() => deactivate(acc.id)}
                      disabled={actionLoading === acc.id}
                      className="p-2 rounded-lg text-rose-400/60 hover:text-rose-400 hover:bg-rose-400/10 transition-all disabled:opacity-40"
                      title="Deactivate"
                    >
                      {actionLoading === acc.id ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <PowerOff className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {accounts.length === 0 && (
            <div className="text-center py-12 text-[#F4F0E8]/30 text-sm">
              No payment accounts configured yet. Add one above.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
