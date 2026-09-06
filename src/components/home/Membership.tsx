'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Crown, Sparkles, CheckCircle2, ShieldCheck, AlertCircle, Phone, Mail, ArrowRight, Loader2, RefreshCw } from 'lucide-react'
import Container from '../ui/Container'
import SectionWrapper from '../ui/SectionWrapper'
import { SectionEyebrow } from '../ui/Typography'
import LuxuryButton from '../ui/LuxuryButton'
import { MEMBERSHIP_CONFIG } from '../../config/membership'

interface FormState {
  fullName: string
  email: string
  phone: string
  preferredContact: string
  interestCategory: string
  message: string
  consent: boolean
  honeypot: string
}

interface FormErrors {
  fullName?: string
  email?: string
  phone?: string
  consent?: string
}

const MEMBERSHIP_PILLARS = [
  { number: '01', title: 'DINE', subtitle: 'Gastronomy & Lounges', desc: 'Experience fine dining, sunset terraces, and private members lounges.' },
  { number: '02', title: 'MOVE', subtitle: 'Fitness & Sports', desc: 'Access state-of-the-art gym, indoor sports courts, and equestrian trails.' },
  { number: '03', title: 'RESTORE', subtitle: 'Wellness & Spa', desc: 'Rejuvenate with hydrotherapy jacuzzi, thermal suites, and shoreline pools.' },
  { number: '04', title: 'PLAY', subtitle: 'Golf & Leisure', desc: 'Enjoy scenic fairway landscapes, practice greens, and recreational grounds.' },
  { number: '05', title: 'EXPLORE', subtitle: 'Water & Adventure', desc: 'Embrace open-water boating, jet-ski excursions, and mountain ziplines.' },
  { number: '06', title: 'CONNECT', subtitle: 'Community & Events', desc: 'Share moments at grand banquet lawns, celebrations, and outdoor gatherings.' },
]

export default function Membership() {
  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    email: '',
    phone: '',
    preferredContact: 'Phone',
    interestCategory: 'Individual Membership Enquiry',
    message: '',
    consent: false,
    honeypot: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value

    setFormData((prev) => ({ ...prev, [name]: val }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name.'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.'
    }

    if (!formData.phone || formData.phone.trim().length < 7) {
      newErrors.phone = 'Please enter a valid contact phone number.'
    }

    if (!formData.consent) {
      newErrors.consent = 'You must agree to be contacted regarding your enquiry.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      const response = await fetch('/api/membership-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setSubmitStatus('success')
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          preferredContact: 'Phone',
          interestCategory: 'Individual Membership Enquiry',
          message: '',
          consent: false,
          honeypot: '',
        })
      } else {
        setSubmitStatus('error')
        setErrorMessage(data.error || 'Submission failed. Please check your network or contact us directly.')
      }
    } catch (err) {
      console.error('Submission error:', err)
      setSubmitStatus('error')
      setErrorMessage('Network request error. Please try again or call UAN ' + MEMBERSHIP_CONFIG.uanPhone)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SectionWrapper
      id="membership"
      bg="navy"
      padding="md"
      className="relative overflow-hidden bg-gradient-to-b from-[#071116] via-[#0B1C26] to-[#04090C] text-white"
    >
      {/* Decorative Radial Lighting */}
      <div className="pointer-events-none absolute -top-40 right-1/4 w-[700px] h-[700px] bg-[#C7A15A]/10 rounded-full blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-900/10 rounded-full blur-[150px]" />

      <Container>
        {/* SECTION INTRO */}
        <div className="mb-12 max-w-4xl">
          <SectionEyebrow>
            MEMBERSHIP
          </SectionEyebrow>

          <h2 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-[#F4F0E8]">
            BECOME PART <br />
            <span className="italic font-normal text-[#D6B978]">OF MARKHOR.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg md:text-xl font-light leading-relaxed text-[#9A9389]">
            Membership at Markhor Club is an invitation to experience a destination shaped around leisure, wellness, 
            sport, adventure and community along Khanpur Dam.
          </p>

          <p className="mt-3 text-sm sm:text-base font-light text-[#9A9389]/80 italic">
            Begin with our current pre-launch membership opportunity.
          </p>
        </div>

        {/* EDITORIAL MEMBERSHIP FEE COMPOSITION */}
        <div className="mb-14 rounded-2xl border border-[#D6B978]/30 bg-gradient-to-r from-[#0B1C26] via-[#0E2533] to-[#0B1C26] p-7 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 bg-[#D6B978]/5 rounded-full blur-[100px]" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Fee Anchor */}
            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#D6B978]" />
                <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#D6B978]">
                  {MEMBERSHIP_CONFIG.phaseLabel} OPPORTUNITY
                </span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl text-[#F4F0E8] font-light">
                {MEMBERSHIP_CONFIG.phaseLabel.toUpperCase()} MEMBERSHIP
              </h3>

              <div className="pt-2">
                <span className="text-xs font-mono text-[#9A9389] uppercase tracking-widest block mb-1">
                  CURRENT MEMBERSHIP FEE
                </span>
                <div className="font-serif text-5xl sm:text-7xl font-light text-[#D6B978] tracking-tight">
                  {MEMBERSHIP_CONFIG.feeFormatted}
                </div>
              </div>

              <p className="text-xs sm:text-sm font-mono text-[#9A9389] pt-2 border-t border-white/10">
                {MEMBERSHIP_CONFIG.qualifier}
              </p>
            </div>

            {/* Right Lifestyle Promise */}
            <div className="lg:col-span-6 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-10 space-y-4 text-sm text-[#9A9389] font-light leading-relaxed">
                <p>
                Markhor Club membership is an invitation to stay close to dining, wellness, outdoor sport, aquatic activity and the wider Khanpur Dam destination.
              </p>
              <div className="flex flex-wrap gap-3 pt-2 text-xs font-mono text-[#F4F0E8]">
                <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[#D6B978]">CLUB DESTINATION</span>
                <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[#D6B978]">500 KANAL ESTATE</span>
                <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[#D6B978]">KHANPUR LAKEFRONT</span>
              </div>
            </div>
          </div>
        </div>

        {/* 6 LIFESTYLE PILLARS GRID */}
        <div className="mb-20">
          <div className="pb-4 border-b border-white/10 mb-8 flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#D6B978]">WHAT MEMBERSHIP REPRESENTS</span>
            <span className="text-xs font-mono text-[#9A9389]">6 LIFESTYLE PILLARS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MEMBERSHIP_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="p-6 rounded-xl border border-white/10 bg-[#071116]/80 backdrop-blur-md space-y-2 group hover:border-[#D6B978]/40 transition-all duration-300"
              >
                <div className="flex items-center justify-between font-mono text-xs text-[#D6B978]">
                  <span>{pillar.number}</span>
                  <span className="text-[10px] uppercase text-[#9A9389]">{pillar.subtitle}</span>
                </div>
                <h4 className="font-serif text-2xl text-[#F4F0E8] font-light group-hover:text-[#D6B978] transition-colors">
                  {pillar.title}
                </h4>
                <p className="text-xs text-[#9A9389] font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* MAIN MEMBERSHIP APPLICATION / ENQUIRY FORM WORKBENCH */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* LEFT ATMOSPHERIC MEDIA & STICKY FEE PANEL (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-white/10 overflow-hidden relative min-h-[460px] flex flex-col justify-between p-8 bg-[#0B1C26]/90 shadow-2xl">
            <Image
              src="/assets/images/Markhor Lobby.png"
              alt="Markhor Members Lounge Atmosphere"
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071116] via-[#071116]/70 to-transparent" />

            <div className="relative z-10 space-y-4">
              <span className="px-3 py-1 rounded bg-[#D6B978]/20 border border-[#D6B978]/40 text-xs font-mono text-[#D6B978] uppercase tracking-wider">
                PRE-LAUNCH MEMBERSHIP
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#F4F0E8] font-light">
                MAKE ROOM FOR THE MARKHOR LIFE.
              </h3>
              <p className="text-sm text-[#9A9389] font-light leading-relaxed">
                Connect with the Markhor Club team for current membership information and site visit options.
              </p>
            </div>

            {/* Desktop Sticky Fee Summary Card */}
            <div className="relative z-10 p-6 rounded-xl border border-white/10 bg-black/60 backdrop-blur-md space-y-2 mt-8">
              <div className="flex items-center justify-between text-xs font-mono text-[#9A9389]">
                <span>PRE-LAUNCH FEE</span>
                <span className="text-[#D6B978]">CURRENT PHASE</span>
              </div>
              <div className="font-serif text-3xl text-[#F4F0E8] font-light">
                {MEMBERSHIP_CONFIG.feeFormatted}
              </div>
              <p className="text-[11px] font-mono text-[#9A9389]/80">
                {MEMBERSHIP_CONFIG.qualifier}
              </p>
            </div>
          </div>

          {/* RIGHT APPLICATION FORM (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-white/15 bg-[#071116]/90 p-8 sm:p-12 shadow-2xl backdrop-blur-md relative">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#D6B978]">
                MEMBERSHIP ENQUIRY
              </span>
              <h3 className="mt-2 font-serif text-3xl sm:text-4xl text-[#F4F0E8] font-light">
                START YOUR MEMBERSHIP JOURNEY.
              </h3>
              <p className="mt-2 text-sm text-[#9A9389] font-light">
                Share your details and the Markhor Club team can contact you with current membership information and next steps.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 rounded-xl border border-emerald-500/30 bg-emerald-950/40 text-center space-y-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 block">
                    ENQUIRY RECEIVED
                  </span>
                  <h4 className="font-serif text-2xl text-[#F4F0E8] font-light">
                    THANK YOU FOR YOUR INTEREST IN MARKHOR CLUB.
                  </h4>
                  <p className="text-sm text-[#9A9389] font-light leading-relaxed max-w-lg mx-auto">
                    Your membership enquiry has been successfully recorded. The Markhor Club team can follow up using the contact details you provided.
                  </p>
                  <div className="pt-4 flex justify-center">
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="px-6 py-2.5 rounded border border-emerald-500/40 text-xs font-mono uppercase tracking-wider text-emerald-300 hover:bg-emerald-500/10 transition-colors flex items-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> SUBMIT ANOTHER ENQUIRY
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Honeypot Spam Protection Field */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex={-1}
                    aria-hidden="true"
                  />

                  {/* Error Notification Banner */}
                  {submitStatus === 'error' && (
                    <div className="p-4 rounded-lg border border-red-500/40 bg-red-950/40 text-xs text-red-200 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold mb-1">Submission Could Not Complete</p>
                        <p className="font-light leading-relaxed">{errorMessage}</p>
                        <div className="mt-2 pt-2 border-t border-red-500/20 text-[11px] font-mono text-red-300">
                          Direct Contact Options: UAN {MEMBERSHIP_CONFIG.uanPhone} &bull; {MEMBERSHIP_CONFIG.contactEmail}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Full Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-xs font-mono uppercase tracking-wider text-[#F4F0E8] mb-2">
                        FULL NAME <span className="text-[#D6B978]">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Tariq Khan"
                        aria-required="true"
                        aria-invalid={!!errors.fullName}
                        className={`w-full px-4 py-3 rounded.lg bg-[#0B1C26] border text-sm text-[#F4F0E8] placeholder-[#9A9389]/50 focus:outline-none focus:ring-2 focus:ring-[#D6B978] transition-all ${
                          errors.fullName ? 'border-red-500/80' : 'border-white/10 hover:border-white/20'
                        }`}
                      />
                      {errors.fullName && <p className="mt-1 text-xs text-red-400 font-mono">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-xs font-mono uppercase tracking-wider text-[#F4F0E8] mb-2">
                        MOBILE NUMBER <span className="text-[#D6B978]">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+92 300 1234567"
                        aria-required="true"
                        aria-invalid={!!errors.phone}
                        className={`w-full px-4 py-3 rounded-lg bg-[#0B1C26] border text-sm text-[#F4F0E8] placeholder-[#9A9389]/50 focus:outline-none focus:ring-2 focus:ring-[#D6B978] transition-all ${
                          errors.phone ? 'border-red-500/80' : 'border-white/10 hover:border-white/20'
                        }`}
                      />
                      {errors.phone && <p className="mt-1 text-xs text-red-400 font-mono">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Email & Preferred Contact Method */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-[#F4F0E8] mb-2">
                        EMAIL ADDRESS <span className="text-[#D6B978]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="tariq@example.com"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        className={`w-full px-4 py-3 rounded-lg bg-[#0B1C26] border text-sm text-[#F4F0E8] placeholder-[#9A9389]/50 focus:outline-none focus:ring-2 focus:ring-[#D6B978] transition-all ${
                          errors.email ? 'border-red-500/80' : 'border-white/10 hover:border-white/20'
                        }`}
                      />
                      {errors.email && <p className="mt-1 text-xs text-red-400 font-mono">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="preferredContact" className="block text-xs font-mono uppercase tracking-wider text-[#F4F0E8] mb-2">
                        PREFERRED CONTACT METHOD
                      </label>
                      <select
                        id="preferredContact"
                        name="preferredContact"
                        value={formData.preferredContact}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-[#0B1C26] border border-white/10 text-sm text-[#F4F0E8] focus:outline-none focus:ring-2 focus:ring-[#D6B978] transition-all"
                      >
                        <option value="Phone">Phone Call</option>
                        <option value="Email">Email</option>
                        <option value="WhatsApp">WhatsApp</option>
                      </select>
                    </div>
                  </div>

                  {/* Interest Category */}
                  <div>
                    <label htmlFor="interestCategory" className="block text-xs font-mono uppercase tracking-wider text-[#F4F0E8] mb-2">
                      MEMBERSHIP ENQUIRY CATEGORY
                    </label>
                    <select
                      id="interestCategory"
                      name="interestCategory"
                      value={formData.interestCategory}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-[#0B1C26] border border-white/10 text-sm text-[#F4F0E8] focus:outline-none focus:ring-2 focus:ring-[#D6B978] transition-all"
                    >
                      <option value="Individual Membership Enquiry">Individual Membership</option>
                      <option value="Family Membership Enquiry">Family Membership</option>
                      <option value="Corporate / Group Enquiry">Corporate / Group Enquiry</option>
                      <option value="General Information Enquiry">General Membership Information</option>
                    </select>
                  </div>

                  {/* Optional Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-[#F4F0E8] mb-2">
                      MESSAGE / SPECIAL REQUESTS <span className="text-[#9A9389] lowercase font-sans">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Specify any questions, preferred time for call, or site visit interest..."
                      className="w-full px-4 py-3 rounded-lg bg-[#0B1C26] border border-white/10 text-sm text-[#F4F0E8] placeholder-[#9A9389]/50 focus:outline-none focus:ring-2 focus:ring-[#D6B978] transition-all resize-none"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 rounded border-white/20 bg-[#0B1C26] text-[#D6B978] focus:ring-[#D6B978]"
                      />
                      <span className="text-xs text-[#9A9389] font-light leading-relaxed group-hover:text-[#F4F0E8] transition-colors">
                        I agree that Markhor Club may contact me regarding my membership enquiry.
                      </span>
                    </label>
                    {errors.consent && <p className="mt-1 text-xs text-red-400 font-mono">{errors.consent}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <LuxuryButton
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-[#071116]" /> SUBMITTING ENQUIRY...
                        </span>
                      ) : (
                        'REQUEST MEMBERSHIP DETAILS'
                      )}
                    </LuxuryButton>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </SectionWrapper>
  )
}
