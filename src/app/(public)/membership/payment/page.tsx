'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  CreditCard,
  Upload,
  CheckCircle,
  AlertCircle,
  Lock,
  ArrowRight,
  ShieldCheck,
  Building2,
  Receipt,
  FileCheck,
} from 'lucide-react'

export default function MembershipPaymentSubmissionPage() {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [membershipNumber, setMembershipNumber] = useState('')
  const [inquiryReference, setInquiryReference] = useState('')
  const [amount, setAmount] = useState('500000')
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer')
  const [providerName, setProviderName] = useState('Easypaisa')
  const [destinationAccountId, setDestinationAccountId] = useState('')
  const [paymentAccounts, setPaymentAccounts] = useState<any[]>([])
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split('T')[0])
  const [transactionReference, setTransactionReference] = useState('')
  const [remarks, setRemarks] = useState('')
  const [consent, setConsent] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successData, setSuccessData] = useState<any>(null)

  React.useEffect(() => {
    fetch('/api/payment-accounts')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.accounts)) {
          setPaymentAccounts(data.accounts)
          if (data.accounts.length > 0) {
            setDestinationAccountId(data.accounts[0].id)
            setProviderName(data.accounts[0].provider)
          }
        }
      })
      .catch(() => {})
  }, [])


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('Payment proof file size must not exceed 5MB.')
        return
      }
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Only PDF, JPG, JPEG, and PNG files are accepted.')
        return
      }
      setError(null)
      setFile(selectedFile)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!consent) {
      setError('Please check the accuracy consent box before submitting.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('fullName', fullName)
      formData.append('phone', phone)
      formData.append('email', email)
      formData.append('membershipNumber', membershipNumber)
      formData.append('inquiryReference', inquiryReference)
      formData.append('amount', amount)
      formData.append('paymentMethod', paymentMethod)
      formData.append('providerName', providerName)
      formData.append('destinationAccountId', destinationAccountId)
      formData.append('paymentDate', paymentDate)
      formData.append('transactionReference', transactionReference)
      formData.append('remarks', remarks)
      if (file) {
        formData.append('file', file)
      }

      const res = await fetch('/api/membership/payment-submission', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (data.success) {
        setSuccessData(data)
      } else {
        setError(data.error || 'Failed to submit payment details. Please try again.')
      }
    } catch {
      setError('Network connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#071116] text-[#F4F0E8] py-16 px-4 sm:px-6 font-sans relative overflow-hidden">
      {/* Vignette background */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_rgba(199,161,90,0.12)_0%,_transparent_70%)]" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-4">
            <Image
              src="/assets/logos/markhor-logo-gold.png"
              alt="Markhor Club"
              width={56}
              height={56}
              className="object-contain mx-auto"
            />
          </Link>
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#C7A15A] block font-semibold">
            ESTATE TREASURY • SECURE TRANSMISSION
          </span>
          <h1 className="text-3xl font-serif font-bold text-[#F4F0E8] mt-1">
            Membership Payment Submission
          </h1>
          <p className="text-xs text-[#F4F0E8]/70 mt-2 max-w-lg mx-auto">
            Report an executed bank transfer, online deposit, or mobile wallet settlement. All submissions undergo administrative verification before ledger entry.
          </p>
        </div>

        {/* Banking Details Box */}
        <div className="mb-8 p-6 rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/30 shadow-xl space-y-4">
          <div className="flex items-center gap-3 border-b border-[#C7A15A]/20 pb-3">
            <Building2 className="w-5 h-5 text-[#C7A15A]" />
            <div>
              <h2 className="text-sm font-serif font-semibold text-[#F4F0E8]">Markhor Club Official Payment Destinations</h2>
              <p className="text-[10px] text-[#C7A15A] uppercase tracking-wider">Authorized Bank & Wallet Accounts</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            {paymentAccounts.length > 0 ? (
              paymentAccounts.map((acc: any) => (
                <div key={acc.id} className="p-4 rounded-xl bg-[#071116] border border-[#C7A15A]/20 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#C7A15A] uppercase font-bold">{acc.provider}</span>
                    <span className="text-[9px] text-[#F4F0E8]/40">{acc.currency || 'PKR'}</span>
                  </div>
                  <div className="text-[#F4F0E8] font-bold text-sm">{acc.accountTitle}</div>
                  <div className="text-[#D6B978] font-mono text-sm tracking-wider">{acc.accountNumber}</div>
                  {acc.iban && <div className="text-[10px] text-[#F4F0E8]/50">IBAN: {acc.iban}</div>}
                  {acc.description && <div className="text-[10px] text-[#F4F0E8]/35 pt-1 italic">{acc.description}</div>}
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-4 text-xs text-[#F4F0E8]/50">
                Loading authorized payment destinations…
              </div>
            )}
          </div>
        </div>

        {/* Success Screen */}
        {successData ? (
          <div className="p-8 rounded-2xl bg-[#0B1C26] border border-emerald-500/40 text-center space-y-6 shadow-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-500/40">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block">SUBMISSION RECORDED</span>
              <h2 className="text-2xl font-serif font-bold text-[#F4F0E8] mt-1">Payment Proof Under Verification</h2>
              <p className="text-xs text-[#F4F0E8]/70 mt-2">
                Reference Number: <span className="font-mono text-[#C7A15A] font-bold">{successData.submissionReference}</span>
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#071116] border border-[#C7A15A]/20 text-xs space-y-2 text-left font-mono">
              <div className="flex justify-between">
                <span className="text-[#F4F0E8]/60">Applicant:</span>
                <span className="text-[#F4F0E8]">{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4F0E8]/60">Transaction ID (TID):</span>
                <span className="text-[#D6B978]">{transactionReference}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4F0E8]/60">Reported Amount:</span>
                <span className="text-emerald-400 font-bold">PKR {Number(amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F4F0E8]/60">Status:</span>
                <span className="text-amber-400 font-bold uppercase">{successData.status}</span>
              </div>
            </div>

            <p className="text-xs text-[#F4F0E8]/60 italic">
              Our accounts team will verify your settlement against bank statements. Official confirmation and ledger receipt will be dispatched upon verified settlement.
            </p>

            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#C7A15A] text-[#071116] font-bold text-xs uppercase tracking-widest hover:bg-[#D6B978] transition-colors"
            >
              Return to Homepage
            </Link>
          </div>
        ) : (
          /* Submission Form */
          <div className="p-8 rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/30 shadow-2xl space-y-6">
            {error && (
              <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/40 flex items-center gap-3 text-xs text-rose-200">
                <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-[#D6B978] uppercase tracking-widest mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full bg-[#071116] border border-[#C7A15A]/30 rounded-xl px-4 py-3 text-sm text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#D6B978] uppercase tracking-widest mb-1.5">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+923000000000"
                    className="w-full bg-[#071116] border border-[#C7A15A]/30 rounded-xl px-4 py-3 text-sm text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-[#D6B978] uppercase tracking-widest mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="applicant@domain.com"
                    className="w-full bg-[#071116] border border-[#C7A15A]/30 rounded-xl px-4 py-3 text-sm text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#D6B978] uppercase tracking-widest mb-1.5">
                    Membership No. (If already issued)
                  </label>
                  <input
                    type="text"
                    value={membershipNumber}
                    onChange={(e) => setMembershipNumber(e.target.value)}
                    placeholder="MC-2026-0001 (Optional)"
                    className="w-full bg-[#071116] border border-[#C7A15A]/30 rounded-xl px-4 py-3 text-sm text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-[#D6B978] uppercase tracking-widest mb-1.5">
                    Amount Paid (PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="500000"
                    className="w-full bg-[#071116] border border-[#C7A15A]/30 rounded-xl px-4 py-3 text-sm text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#D6B978] uppercase tracking-widest mb-1.5">
                    Payment Method *
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full bg-[#071116] border border-[#C7A15A]/30 rounded-xl px-4 py-3 text-sm text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A]"
                  >
                    <option value="bank_transfer">Bank Transfer (IBFT)</option>
                    <option value="jazzcash">JazzCash</option>
                    <option value="easypaisa">EasyPaisa</option>
                    <option value="card">Credit / Debit Card</option>
                    <option value="online">Online Banking</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#D6B978] uppercase tracking-widest mb-1.5">
                    Destination Account *
                  </label>
                  <select
                    value={destinationAccountId}
                    onChange={(e) => {
                      const id = e.target.value
                      setDestinationAccountId(id)
                      const sel = paymentAccounts.find((a: any) => a.id === id)
                      if (sel) setProviderName(sel.provider)
                    }}
                    className="w-full bg-[#071116] border border-[#C7A15A]/30 rounded-xl px-4 py-3 text-sm text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A]"
                  >
                    {paymentAccounts.map((acc: any) => (
                      <option key={acc.id} value={acc.id}>
                        {acc.provider} — {acc.accountNumber} ({acc.accountTitle})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-semibold text-[#D6B978] uppercase tracking-widest mb-1.5">
                    Transaction ID / TID / Ref # *
                  </label>
                  <input
                    type="text"
                    required
                    value={transactionReference}
                    onChange={(e) => setTransactionReference(e.target.value)}
                    placeholder="e.g. 88491029384"
                    className="w-full bg-[#071116] border border-[#C7A15A]/30 rounded-xl px-4 py-3 text-sm text-[#F4F0E8] font-mono focus:outline-none focus:border-[#C7A15A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-[#D6B978] uppercase tracking-widest mb-1.5">
                    Payment Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={paymentDate}
                    onChange={(e) => setPaymentDate(e.target.value)}
                    className="w-full bg-[#071116] border border-[#C7A15A]/30 rounded-xl px-4 py-3 text-sm text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A]"
                  />
                </div>
              </div>

              {/* Upload Proof */}
              <div>
                <label className="block text-[10px] font-semibold text-[#D6B978] uppercase tracking-widest mb-1.5">
                  Payment Slip / Evidence Upload (PDF, JPG, PNG - Max 5MB)
                </label>
                <div className="border-2 border-dashed border-[#C7A15A]/30 rounded-xl p-6 text-center bg-[#071116]/60 hover:border-[#C7A15A] transition-colors relative">
                  <Upload className="w-8 h-8 text-[#C7A15A] mx-auto mb-2" />
                  <p className="text-xs text-[#F4F0E8]">
                    {file ? <span className="text-emerald-400 font-semibold">{file.name} ({(file.size / 1024).toFixed(1)} KB)</span> : 'Click or drop payment receipt screenshot / PDF'}
                  </p>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-[#D6B978] uppercase tracking-widest mb-1.5">
                  Remarks / Notes (Optional)
                </label>
                <textarea
                  rows={2}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Additional payment details or notes"
                  className="w-full bg-[#071116] border border-[#C7A15A]/30 rounded-xl px-4 py-3 text-sm text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A]"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-[#071116] border border-[#C7A15A]/20">
                <input
                  type="checkbox"
                  id="consent"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 rounded border-[#C7A15A] text-[#C7A15A] focus:ring-[#C7A15A]"
                />
                <label htmlFor="consent" className="text-xs text-[#F4F0E8]/80 cursor-pointer select-none">
                  I confirm that all submitted banking details, transaction references, and payment slips are authentic and accurately represent funds transferred to Markhor Group.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#C7A15A] to-[#D6B978] text-[#071116] font-bold text-xs tracking-widest uppercase hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(199,161,90,0.25)] disabled:opacity-50"
              >
                {loading ? 'Transmitting Evidence...' : 'Submit Payment Proof'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
