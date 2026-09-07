'use client'

import React, { useState, useEffect } from 'react'
import {
  ArrowLeft,
  FileSpreadsheet,
  Upload,
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  RefreshCw,
  Loader2,
  Building2,
  Check,
  X,
  FileCheck,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

type MatchItem = {
  claim: any
  matchedTransaction: any
  matchStatus: 'EXACT_MATCH' | 'POSSIBLE_MATCH' | 'CONFLICT' | 'NO_MATCH'
}

const MATCH_BADGES: Record<string, { label: string; style: string }> = {
  EXACT_MATCH: { label: 'Exact Match', style: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30' },
  POSSIBLE_MATCH: { label: 'Possible Match', style: 'text-amber-400 bg-amber-400/10 border-amber-400/30' },
  CONFLICT: { label: 'Conflict (Amount Mismatch)', style: 'text-rose-400 bg-rose-400/10 border-rose-400/30' },
  NO_MATCH: { label: 'No Match Found', style: 'text-[#F4F0E8]/40 bg-[#F4F0E8]/5 border-[#F4F0E8]/20' },
}

export default function PaymentReconciliationPage() {
  const router = useRouter()
  const [matches, setMatches] = useState<MatchItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [importing, setImporting] = useState(false)
  const [importMsg, setImportMsg] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [provider, setProvider] = useState('Easypaisa')
  const [paymentAccounts, setPaymentAccounts] = useState<any[]>([])
  const [selectedAccountId, setSelectedAccountId] = useState('')

  const loadData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/payment-reconciliation')
      const data = await res.json()
      if (data.success) {
        setMatches(data.matches || [])
      } else {
        setError(data.error || 'Failed to load reconciliation data.')
      }
    } catch {
      setError('Network error.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
    fetch('/api/admin/settings/payment-accounts')
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setPaymentAccounts(data.accounts || [])
          if (data.accounts?.length > 0) setSelectedAccountId(data.accounts[0].id)
        }
      })
      .catch(() => {})
  }, [])

  const handleImport = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!csvFile) return
    setImporting(true)
    setImportMsg('')
    try {
      const formData = new FormData()
      formData.append('file', csvFile)
      formData.append('provider', provider)
      formData.append('destinationAccountId', selectedAccountId)

      const res = await fetch('/api/admin/payment-reconciliation/import', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setImportMsg(data.message)
        setCsvFile(null)
        await loadData()
      } else {
        setImportMsg(data.error || 'Import failed.')
      }
    } catch {
      setImportMsg('Network error during import.')
    } finally {
      setImporting(false)
    }
  }

  const verifyClaim = async (claimId: string, amount: number) => {
    setActionLoading(claimId)
    try {
      const res = await fetch('/api/admin/payment-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: claimId,
          action: 'verify',
          verifiedAmount: amount,
          remarks: 'Verified via bank statement reconciliation match.',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setImportMsg(`Verified payment submission! Receipt ${data.receiptNumber} generated.`)
        await loadData()
      } else {
        setError(data.error || 'Failed to verify.')
      }
    } catch {
      setError('Network error.')
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <div className="p-6 md:p-8 max-w-6xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push('/admin')}
            className="p-2 rounded-lg text-[#F4F0E8]/40 hover:text-[#C7A15A] hover:bg-[#C7A15A]/10 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="w-9 h-9 rounded-lg bg-emerald-400/10 flex items-center justify-center">
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-lg font-serif font-bold text-[#F4F0E8] tracking-wide">
              Bank Statement Reconciliation
            </h1>
            <p className="text-xs text-[#F4F0E8]/40">
              Match customer payment claims against imported bank & wallet transaction statements
            </p>
          </div>
        </div>
        <button
          onClick={loadData}
          className="flex items-center gap-2 px-3.5 py-2 bg-[#0B1C26] border border-[#C7A15A]/20 text-[#C7A15A] rounded-xl text-xs font-semibold hover:bg-[#C7A15A]/10 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Refresh
        </button>
      </div>

      {/* CSV Import Box */}
      <div className="bg-[#0B1C26] border border-[#C7A15A]/20 rounded-2xl p-6 mb-8 shadow-xl">
        <h2 className="text-xs uppercase tracking-widest text-[#C7A15A] font-bold mb-3 flex items-center gap-2">
          <Upload className="w-4 h-4" /> Import Bank / Wallet Statement (CSV)
        </h2>
        <form onSubmit={handleImport} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
          <div>
            <label className="block text-[10px] font-semibold text-[#D6B978] tracking-widest uppercase mb-1.5">
              Provider
            </label>
            <select
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              className="w-full bg-[#071116] border border-[#C7A15A]/25 rounded-lg px-3 py-2 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A]"
            >
              <option value="Easypaisa">Easypaisa</option>
              <option value="UBL">United Bank Limited (UBL)</option>
              <option value="JazzCash">JazzCash</option>
              <option value="Meezan Bank">Meezan Bank</option>
              <option value="Other">Other Bank</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-[#D6B978] tracking-widest uppercase mb-1.5">
              Destination Account
            </label>
            <select
              value={selectedAccountId}
              onChange={(e) => setSelectedAccountId(e.target.value)}
              className="w-full bg-[#071116] border border-[#C7A15A]/25 rounded-lg px-3 py-2 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A]"
            >
              {paymentAccounts.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.provider} — {a.accountNumberMasked}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-semibold text-[#D6B978] tracking-widest uppercase mb-1.5">
              CSV Statement File
            </label>
            <input
              type="file"
              accept=".csv"
              required
              onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
              className="w-full text-xs text-[#F4F0E8]/70 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#C7A15A]/20 file:text-[#C7A15A] hover:file:bg-[#C7A15A]/30"
            />
          </div>
          <button
            type="submit"
            disabled={importing || !csvFile}
            className="w-full py-2.5 bg-gradient-to-r from-[#C7A15A] to-[#D6B978] text-[#071116] rounded-xl font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {importing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
            {importing ? 'Importing…' : 'Import Statement'}
          </button>
        </form>

        {importMsg && (
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 rounded-lg px-3.5 py-2.5">
            <CheckCircle className="w-4 h-4 shrink-0" />
            {importMsg}
          </div>
        )}
      </div>

      {/* Side-by-Side Match Matrix */}
      {loading ? (
        <div className="flex items-center gap-2 text-[#F4F0E8]/40 text-sm">
          <Loader2 className="w-4 h-4 animate-spin" /> Running candidate matching engine…
        </div>
      ) : matches.length === 0 ? (
        <div className="text-center py-16 bg-[#0B1C26] border border-[#C7A15A]/15 rounded-2xl text-[#F4F0E8]/40 text-sm">
          No pending payment claims awaiting statement reconciliation.
        </div>
      ) : (
        <div className="space-y-4">
          {matches.map(({ claim, matchedTransaction, matchStatus }) => {
            const badge = MATCH_BADGES[matchStatus] || MATCH_BADGES.NO_MATCH
            return (
              <div
                key={claim.id}
                className="bg-[#0B1C26] border border-[#C7A15A]/20 rounded-2xl p-5 shadow-lg space-y-4"
              >
                <div className="flex items-center justify-between border-b border-[#C7A15A]/15 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-[#C7A15A] font-bold">
                      {claim.submissionReference}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${badge.style}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <span className="text-[11px] text-[#F4F0E8]/40">
                    {new Date(claim.createdAt).toLocaleDateString('en-PK', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                  {/* Left Column: Customer Claim */}
                  <div className="bg-[#071116] border border-[#C7A15A]/15 rounded-xl p-4 space-y-2">
                    <span className="text-[10px] text-[#C7A15A] uppercase tracking-widest font-bold block mb-2">
                      Customer Reported Claim
                    </span>
                    <div className="flex justify-between">
                      <span className="text-[#F4F0E8]/50">Applicant:</span>
                      <span className="font-semibold text-[#F4F0E8]">{claim.fullName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#F4F0E8]/50">Provider / Account:</span>
                      <span className="text-[#F4F0E8]">{claim.providerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#F4F0E8]/50">Reported TID:</span>
                      <span className="font-mono text-[#D6B978] font-bold">
                        {claim.transactionReference}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#F4F0E8]/50">Claim Amount:</span>
                      <span className="font-bold text-emerald-400">
                        PKR {claim.amount.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Statement Transaction */}
                  <div className="bg-[#071116] border border-[#C7A15A]/15 rounded-xl p-4 space-y-2">
                    <span className="text-[10px] text-sky-400 uppercase tracking-widest font-bold block mb-2">
                      Bank / Wallet Statement Entry
                    </span>
                    {matchedTransaction ? (
                      <>
                        <div className="flex justify-between">
                          <span className="text-[#F4F0E8]/50">Bank Provider:</span>
                          <span className="text-[#F4F0E8]">{matchedTransaction.provider}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#F4F0E8]/50">Statement TID:</span>
                          <span className="font-mono text-[#D6B978] font-bold">
                            {matchedTransaction.externalTransactionId}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#F4F0E8]/50">Statement Amount:</span>
                          <span className="font-bold text-emerald-400">
                            PKR {matchedTransaction.amount.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#F4F0E8]/50">Transaction Date:</span>
                          <span className="text-[#F4F0E8]/60">
                            {new Date(matchedTransaction.transactionDate).toLocaleDateString('en-PK')}
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="py-6 text-center text-[#F4F0E8]/35 italic">
                        No matching transaction row found in imported statements yet. Import a CSV statement above.
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-[#C7A15A]/10">
                  <span className="text-[10px] text-[#F4F0E8]/40">
                    Status: <strong className="text-[#F4F0E8]">{claim.verificationStatus}</strong>
                  </span>
                  <div className="flex items-center gap-2">
                    {matchStatus === 'EXACT_MATCH' && (
                      <button
                        onClick={() => verifyClaim(claim.id, claim.amount)}
                        disabled={actionLoading === claim.id}
                        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-[#071116] rounded-xl font-bold text-xs tracking-wider uppercase hover:bg-emerald-400 transition-all disabled:opacity-40"
                      >
                        {actionLoading === claim.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Check className="w-3.5 h-3.5" />
                        )}
                        Verify Match & Issue Receipt
                      </button>
                    )}
                    {matchStatus === 'CONFLICT' && (
                      <span className="text-[11px] text-rose-400 font-semibold bg-rose-950/40 border border-rose-500/30 px-3 py-1.5 rounded-lg">
                        ⚠ Amount mismatch — Manual Finance review required
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
