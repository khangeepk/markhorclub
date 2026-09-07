'use client'

import React, { useState, useEffect, useRef } from 'react'
import { ArrowLeft, Image as ImageIcon, Upload, RotateCcw, CheckCircle2, AlertCircle, RefreshCw, ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface BrandingLogos {
  brand_logo_url: string
  brand_emblem_url: string
  brand_login_logo_url: string
}

export default function BrandingPage() {
  const router = useRouter()
  const [logos, setLogos] = useState<BrandingLogos>({
    brand_logo_url: '/assets/logos/markhor-logo-gold.png',
    brand_emblem_url: '/assets/logos/markhor-logo-gold.png',
    brand_login_logo_url: '/assets/logos/markhor-logo-gold.png',
  })

  const [loading, setLoading] = useState(true)
  const [uploadingTarget, setUploadingTarget] = useState<string | null>(null)
  const [previews, setPreviews] = useState<Record<string, string>>({})
  const [stagedFiles, setStagedFiles] = useState<Record<string, File>>({})
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const fileInputRefs = {
    brand_logo_url: useRef<HTMLInputElement | null>(null),
    brand_emblem_url: useRef<HTMLInputElement | null>(null),
    brand_login_logo_url: useRef<HTMLInputElement | null>(null),
  }

  const loadSettings = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/settings/branding')
      const json = await res.json()
      if (json.success && json.settings) {
        setLogos({
          brand_logo_url: json.settings.brand_logo_url || '/assets/logos/markhor-logo-gold.png',
          brand_emblem_url: json.settings.brand_emblem_url || '/assets/logos/markhor-logo-gold.png',
          brand_login_logo_url: json.settings.brand_login_logo_url || '/assets/logos/markhor-logo-gold.png',
        })
      }
    } catch {
      setFeedback({ type: 'error', message: 'Failed to load current branding settings' })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadSettings()
  }, [])

  const handleFileSelect = (targetKey: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      setFeedback({
        type: 'error',
        message: `Invalid format (${file.type}). Only PNG, JPG, JPEG, and WEBP images are allowed.`,
      })
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      setFeedback({
        type: 'error',
        message: `File size (${(file.size / 1024 / 1024).toFixed(2)} MB) exceeds 2 MB limit.`,
      })
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPreviews((prev) => ({ ...prev, [targetKey]: objectUrl }))
    setStagedFiles((prev) => ({ ...prev, [targetKey]: file }))
    setFeedback(null)
  }

  const handleUpload = async (targetKey: string) => {
    const file = stagedFiles[targetKey]
    if (!file) return

    setUploadingTarget(targetKey)
    setFeedback(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('targetKey', targetKey)

      const res = await fetch('/api/admin/settings/branding/upload', {
        method: 'POST',
        body: formData,
      })

      const json = await res.json()

      if (json.success) {
        setLogos((prev) => ({ ...prev, [targetKey]: json.url }))
        setPreviews((prev) => {
          const copy = { ...prev }
          delete copy[targetKey]
          return copy
        })
        setStagedFiles((prev) => {
          const copy = { ...prev }
          delete copy[targetKey]
          return copy
        })
        setFeedback({
          type: 'success',
          message: `Updated ${targetKey.replace(/_/g, ' ')} successfully.`,
        })
      } else {
        setFeedback({ type: 'error', message: json.error || 'Upload failed' })
      }
    } catch {
      setFeedback({ type: 'error', message: 'Network failure during upload' })
    } finally {
      setUploadingTarget(null)
    }
  }

  const handleRestoreDefault = async (targetKey: string) => {
    if (!confirm('Restore this branding asset to the official default bundled logo?')) return

    setUploadingTarget(targetKey)
    setFeedback(null)

    try {
      const res = await fetch('/api/admin/settings/branding/restore-default', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ targetKey }),
      })

      const json = await res.json()

      if (json.success) {
        setLogos((prev) => ({ ...prev, [targetKey]: json.url }))
        setPreviews((prev) => {
          const copy = { ...prev }
          delete copy[targetKey]
          return copy
        })
        setStagedFiles((prev) => {
          const copy = { ...prev }
          delete copy[targetKey]
          return copy
        })
        setFeedback({ type: 'success', message: json.message })
      } else {
        setFeedback({ type: 'error', message: json.error || 'Failed to restore default logo' })
      }
    } catch {
      setFeedback({ type: 'error', message: 'Failed to restore default logo' })
    } finally {
      setUploadingTarget(null)
    }
  }

  const logoCards = [
    {
      key: 'brand_logo_url',
      label: 'Admin Portal Header Logo',
      description: 'Main logo displayed in the admin sidebar navigation and header bar.',
      currentUrl: logos.brand_logo_url,
    },
    {
      key: 'brand_emblem_url',
      label: 'Markhor Emblem',
      description: 'Secondary brand mark used for watermark badges and member documents.',
      currentUrl: logos.brand_emblem_url,
    },
    {
      key: 'brand_login_logo_url',
      label: 'Admin Login Screen Logo',
      description: 'Featured logo asset on /admin/login portal screen.',
      currentUrl: logos.brand_login_logo_url,
    },
  ]

  return (
    <div className="p-6 md:p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => router.push('/admin/settings')}
          className="p-2 rounded-lg text-[#F4F0E8]/40 hover:text-[#C7A15A] hover:bg-[#C7A15A]/10 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div className="w-9 h-9 rounded-lg bg-[#C7A15A]/10 flex items-center justify-center">
          <ImageIcon className="w-4 h-4 text-[#C7A15A]" />
        </div>
        <div>
          <h1 className="text-lg font-serif font-bold text-[#F4F0E8] tracking-wide">Branding & Logo Management</h1>
          <p className="text-xs text-[#F4F0E8]/40">Live asset uploads and admin visual identity configuration</p>
        </div>
      </div>

      {/* Notifications Feedback */}
      {feedback && (
        <div
          className={`mb-6 p-4 rounded-xl border flex items-center gap-3 text-xs ${
            feedback.type === 'success'
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Logo Cards Stack */}
      <div className="space-y-6">
        {logoCards.map((card) => {
          const previewUrl = previews[card.key]
          const isStaged = Boolean(stagedFiles[card.key])
          const isUploading = uploadingTarget === card.key

          return (
            <div
              key={card.key}
              className="bg-[#0B1C26] border border-[#C7A15A]/20 rounded-2xl p-6 shadow-xl space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-[#F4F0E8]">{card.label}</h3>
                  <p className="text-xs text-[#F4F0E8]/50 mt-0.5">{card.description}</p>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#C7A15A] bg-[#071116] px-3 py-1 rounded-full border border-[#C7A15A]/30 self-start sm:self-auto">
                  {card.key}
                </span>
              </div>

              {/* Logo Viewport & Preview */}
              <div className="flex items-center gap-5 p-4 rounded-xl bg-[#071116] border border-[#C7A15A]/15">
                <div className="w-20 h-20 rounded-xl bg-[#0B1C26] border border-[#C7A15A]/30 flex items-center justify-center p-2 shrink-0 relative overflow-hidden">
                  <img
                    src={previewUrl || card.currentUrl}
                    alt={card.label}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = '/assets/logos/markhor-logo-gold.png'
                    }}
                  />
                  {previewUrl && (
                    <span className="absolute top-1 right-1 bg-[#C7A15A] text-[#071116] text-[8px] font-bold px-1.5 py-0.5 rounded uppercase">
                      Preview
                    </span>
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <p className="text-xs font-mono text-[#D6B978] truncate">
                    {previewUrl ? 'Staged image file ready to save' : card.currentUrl}
                  </p>
                  <p className="text-[10px] text-[#F4F0E8]/40">
                    Allowed Formats: PNG, JPG, JPEG, WEBP • Max Size: 2 MB
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <input
                  type="file"
                  ref={(el) => {
                    fileInputRefs[card.key as keyof typeof fileInputRefs].current = el
                  }}
                  accept="image/png,image/jpeg,image/jpg,image/webp"
                  className="hidden"
                  onChange={(e) => handleFileSelect(card.key, e)}
                />

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRefs[card.key as keyof typeof fileInputRefs].current?.click()}
                    disabled={isUploading}
                    className="px-4 py-2 rounded-xl bg-[#071116] border border-[#C7A15A]/40 text-[#C7A15A] text-xs font-semibold uppercase tracking-wider hover:border-[#C7A15A] transition flex items-center gap-2"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{previewUrl ? 'Change File' : 'Select New Logo'}</span>
                  </button>

                  {isStaged && (
                    <button
                      type="button"
                      onClick={() => handleUpload(card.key)}
                      disabled={isUploading}
                      className="px-4 py-2 rounded-xl bg-[#C7A15A] text-[#071116] text-xs font-bold uppercase tracking-wider hover:bg-[#D6B978] transition flex items-center gap-2 shadow-lg disabled:opacity-50"
                    >
                      {isUploading ? (
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      )}
                      <span>{isUploading ? 'Uploading...' : 'Save Upload'}</span>
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleRestoreDefault(card.key)}
                  disabled={isUploading}
                  className="px-3.5 py-2 rounded-xl bg-transparent border border-white/10 text-[#F4F0E8]/60 text-xs font-semibold uppercase tracking-wider hover:text-white hover:border-white/20 transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restore Default</span>
                </button>
              </div>
            </div>
          )
        })}

        {/* Security & Production Storage Info Card */}
        <div className="flex items-start gap-3 bg-[#0B1C26] border border-[#C7A15A]/30 rounded-2xl p-5 text-xs">
          <ShieldCheck className="w-5 h-5 text-[#C7A15A] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-semibold text-[#F4F0E8]">Storage Architecture & Security Controls</h4>
            <p className="text-[#F4F0E8]/60 leading-relaxed">
              Uploaded logos are stored securely in local persistent storage (`public/uploads/branding/`) and indexed
              in database settings (`app_settings`). Server-side validation enforces MIME image restrictions, file size limits (max 2 MB), and random storage keys.
            </p>
            <p className="text-[11px] font-mono text-[#C7A15A] pt-1">
              LOCAL PERSISTENT STORAGE ACTIVE — PRODUCTION OBJECT STORE PROVIDER READY
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
