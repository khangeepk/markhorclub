'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Crown, CheckCircle2, AlertCircle, Phone, Mail, Calendar, ArrowRight, Loader2, RefreshCw, ShieldCheck } from 'lucide-react'
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
  { number: '01', title: 'GASTRONOMY', desc: 'Sunset lakeside dining rooms, members tea lounge, and private banquet terraces.' },
  { number: '02', title: 'ATHLETICS', desc: 'State-of-the-art fitness suites, indoor sports halls, and mountain trail access.' },
  { number: '03', title: 'WELLNESS', desc: 'Hydrotherapy plunge pools, thermal baths, and lakeside relaxation decks.' },
  { number: '04', title: 'FAIRWAYS', desc: 'Contoured golf driving grounds, practice greens, and open leisure lawns.' },
  { number: '05', title: 'MARINA', desc: 'Open water boating, jet-ski berths, and lakeside watersports access.' },
  { number: '06', title: 'COMMUNITY', desc: 'Exclusive access to member-only cultural gatherings, banquets, and celebrations.' },
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
        setErrorMessage(data.error || 'Submission failed. Please check your connection or contact us directly.')
      }
    } catch (err) {
      console.error('Submission error:', err)
      setSubmitStatus('error')
      setErrorMessage('Network error. Please try again or call UAN ' + MEMBERSHIP_CONFIG.uanPhone)
    } finally {
      setIsSubmitting(false)
    }
  }

  const scrollToForm = () => {
    const formElement = document.getElementById('membership-application-form')
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' })
      const firstInput = document.getElementById('fullName')
      if (firstInput) firstInput.focus()
    }
  }

  return (
    <SectionWrapper
      id="membership"
      bg="navy"
      padding="md"
      className="relative overflow-hidden bg-[#071116] py-24 text-[#F4F0E8]"
    >
      {/* Calm, Subtle Radial Ambient Glow — Low Motion Intensity */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-[700px] w-[700px] rounded-full bg-[#C7A15A]/5 blur-[180px]" />
      
      <Container>
        {/* SECTION HEADER & UNHURRIED NARRATIVE */}
        <div className="mx-auto mb-16 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 border-b border-[#C7A15A]/30 pb-1 text-[10px] uppercase tracking-[0.25em] text-[#D6B978] font-mono">
            <Crown className="h-3.5 w-3.5 text-[#D6B978]" />
            <span>SECTION 09 &bull; PRIVATE MEMBERSHIP INVITATION</span>
          </div>

          <h2 className="mt-5 font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-[#F4F0E8]">
            AN INVITATION TO BELONG TO <br />
            <span className="italic text-[#D6B978]">PAKISTAN&apos;S PREMIER LAKEFRONT CLUB.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg font-light leading-relaxed text-[#9A9389] max-w-2xl mx-auto">
            Markhor Club membership offers privileged access to 500 Kanals of curated leisure, wellness, equestrian trails, aquatic sport, and lakeview gastronomy along Khanpur Dam.
          </p>
        </div>

        {/* EDITORIAL PRIVATE-CLUB FEE CERTIFICATE (NOT A SAAS CARD) */}
        <div className="relative mb-16 overflow-hidden border border-[#C7A15A]/30 bg-gradient-to-b from-[#0B1C26] via-[#08151D] to-[#071116] p-8 sm:p-14 rounded-sm shadow-2xl">
          {/* Fine Hairline Corner Accents */}
          <div className="pointer-events-none absolute left-3 top-3 font-mono text-[9px] text-[#D6B978]/50">+ PRIVATE INVITATION</div>
          <div className="pointer-events-none absolute right-3 top-3 font-mono text-[9px] text-[#D6B978]/50">LIMITED AVAILABILITY +</div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Fee Anchor Spread */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-block border-b border-[#D6B978]/40 pb-1 text-[10px] font-mono uppercase tracking-[0.25em] text-[#D6B978]">
                {MEMBERSHIP_CONFIG.phaseLabel.toUpperCase()} OPPORTUNITY
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-light text-[#F4F0E8] leading-tight">
                {MEMBERSHIP_CONFIG.phaseLabel} Club Membership
              </h3>

              <div className="border-t border-[#C7A15A]/20 pt-4">
                <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#9A9389]">
                  CURRENT PRE-LAUNCH MEMBERSHIP FEE
                </span>
                <div className="mt-2 font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#D6B978]">
                  {MEMBERSHIP_CONFIG.feeFormatted}
                </div>
                <p className="mt-3 text-xs font-mono text-[#9A9389]">
                  {MEMBERSHIP_CONFIG.qualifier}
                </p>
              </div>
            </div>

            {/* Right Private Privileges Narrative */}
            <div className="lg:col-span-6 border-t border-[#C7A15A]/20 lg:border-t-0 lg:border-l lg:pl-10 pt-6 lg:pt-0 space-y-5 text-sm text-[#9A9389] font-light leading-relaxed">
              <p>
                As a founding pre-launch member, you secure priority access to all club amenities, dining rooms, sports facilities, and lakeside recreation options ahead of full operational launch.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-[11px] font-mono text-[#F4F0E8]">
                <div className="flex items-center gap-2 border-l border-[#D6B978]/40 pl-3">
                  <span className="text-[#D6B978]">&bull;</span> 500 KANAL ESTATE
                </div>
                <div className="flex items-center gap-2 border-l border-[#D6B978]/40 pl-3">
                  <span className="text-[#D6B978]">&bull;</span> LAKEFRONT ACCESS
                </div>
                <div className="flex items-center gap-2 border-l border-[#D6B978]/40 pl-3">
                  <span className="text-[#D6B978]">&bull;</span> MARINA PRIVILEGES
                </div>
                <div className="flex items-center gap-2 border-l border-[#D6B978]/40 pl-3">
                  <span className="text-[#D6B978]">&bull;</span> EQUESTRIAN TRAILS
                </div>
              </div>
            </div>
          </div>

          {/* THREE-TIER CONVERSION CTA HIERARCHY BAR */}
          <div className="mt-10 border-t border-[#C7A15A]/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Primary CTA */}
            <button
              type="button"
              onClick={scrollToForm}
              className="w-full sm:w-auto bg-[#D6B978] px-8 py-4 text-[11px] font-mono uppercase tracking-[0.2em] font-bold text-[#071116] transition-all hover:bg-[#F4F0E8] focus:outline-none"
            >
              Apply for Membership
            </button>

            {/* Secondary & Tertiary CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-mono text-[#D6B978]">
              <a
                href="#contact"
                className="flex items-center gap-2 uppercase tracking-widest text-[#F4F0E8] hover:text-[#D6B978] transition-colors"
              >
                <Calendar className="h-3.5 w-3.5 text-[#D6B978]" />
                <span>Book a VIP Visit</span>
              </a>

              <span className="text-[#9A9389]/40">&bull;</span>

              <a
                href={`tel:${MEMBERSHIP_CONFIG.uanPhone}`}
                className="flex items-center gap-2 uppercase tracking-widest text-[#D6B978] hover:text-[#F4F0E8] transition-colors"
              >
                <Phone className="h-3.5 w-3.5 text-[#D6B978]" />
                <span>Speak to Concierge: UAN {MEMBERSHIP_CONFIG.uanPhone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* 6 LIFESTYLE PILLARS NARRATIVE SPREAD */}
        <div className="mb-20">
          <div className="pb-4 border-b border-[#C7A15A]/20 mb-8 flex items-center justify-between font-mono text-[10px] text-[#9A9389]">
            <span className="uppercase tracking-[0.2em] text-[#D6B978]">MEMBERSHIP PRIVILEGES</span>
            <span>06 EXPERIENCE PILLARS</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MEMBERSHIP_PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="p-6 border border-[#C7A15A]/15 bg-[#0B1C26]/60 space-y-3 rounded-sm group hover:border-[#D6B978]/40 transition-colors duration-500"
              >
                <div className="flex items-center justify-between font-mono text-xs text-[#D6B978]">
                  <span>{pillar.number}</span>
                  <span className="text-[9px] uppercase tracking-widest text-[#9A9389]">PRIVILEGE</span>
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

        {/* MEMBERSHIP APPLICATION WORKBENCH */}
        <div id="membership-application-form" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* LEFT ATMOSPHERIC MEDIA (5 COLS) */}
          <div className="lg:col-span-5 border border-[#C7A15A]/20 overflow-hidden relative min-h-[440px] flex flex-col justify-between p-8 bg-[#0B1C26] rounded-sm">
            <Image
              src="/assets/images/Markhor Lobby.png"
              alt="Markhor Members Lounge Atmosphere"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071116] via-[#071116]/60 to-transparent" />

            <div className="relative z-10 space-y-4">
              <span className="inline-block border border-[#D6B978]/40 bg-[#D6B978]/10 px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[#D6B978]">
                APPLICATION DESK
              </span>
              <h3 className="font-serif text-3xl font-light text-[#F4F0E8]">
                BEGIN YOUR INQUIRY.
              </h3>
              <p className="text-xs text-[#9A9389] font-light leading-relaxed">
                Complete the confidential application form. The Markhor Club advisory desk will contact you regarding membership terms and private visit arrangements.
              </p>
            </div>

            {/* Fee Summary Anchor */}
            <div className="relative z-10 p-5 border border-[#C7A15A]/25 bg-[#071116]/90 backdrop-blur-md space-y-2 mt-8">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#9A9389]">
                <span>PRE-LAUNCH FEE</span>
                <span className="text-[#D6B978]">SUBJECT TO REVISION</span>
              </div>
              <div className="font-serif text-3xl text-[#D6B978] font-light">
                {MEMBERSHIP_CONFIG.feeFormatted}
              </div>
            </div>
          </div>

          {/* RIGHT APPLICATION FORM WORKBENCH (7 COLS) */}
          <div className="lg:col-span-7 border border-[#C7A15A]/25 bg-[#0B1C26]/90 p-8 sm:p-12 backdrop-blur-md relative rounded-sm">
            <div className="mb-8">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#D6B978]">
                CONFIDENTIAL APPLICATION
              </span>
              <h3 className="mt-2 font-serif text-3xl text-[#F4F0E8] font-light">
                MEMBERSHIP INQUIRY FORM
              </h3>
              <p className="mt-2 text-xs text-[#9A9389] font-light">
                Please provide your details below. Our team treats all inquiries with absolute privacy.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="p-8 border border-emerald-500/30 bg-emerald-950/20 text-center space-y-4"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block">
                    INQUIRY RECORDED
                  </span>
                  <h4 className="font-serif text-2xl text-[#F4F0E8] font-light">
                    THANK YOU FOR YOUR INTEREST IN MARKHOR CLUB.
                  </h4>
                  <p className="text-xs text-[#9A9389] font-light leading-relaxed max-w-lg mx-auto">
                    Your membership inquiry has been received. Our advisory team will reach out via your preferred contact method.
                  </p>
                  <div className="pt-4 flex justify-center">
                    <button
                      onClick={() => setSubmitStatus('idle')}
                      className="px-6 py-2.5 border border-emerald-500/40 text-[10px] font-mono uppercase tracking-wider text-emerald-300 hover:bg-emerald-500/10 transition-colors flex items-center gap-2"
                    >
                      <RefreshCw className="w-3.5 h-3.5" /> SUBMIT ANOTHER INQUIRY
                    </button>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                  {/* Honeypot Spam Protection */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex={-1}
                    aria-hidden="true"
                  />

                  {/* Error Notification */}
                  {submitStatus === 'error' && (
                    <div className="p-4 border border-red-500/40 bg-red-950/30 text-xs text-red-200 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold mb-1">Submission Error</p>
                        <p className="font-light leading-relaxed">{errorMessage}</p>
                      </div>
                    </div>
                  )}

                  {/* Full Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-[10px] font-mono uppercase tracking-wider text-[#F4F0E8] mb-2">
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
                        className={`w-full px-4 py-3 bg-[#071116] border text-xs text-[#F4F0E8] placeholder-[#9A9389]/40 focus:outline-none focus:border-[#D6B978] transition-colors ${
                          errors.fullName ? 'border-red-500/80' : 'border-[#C7A15A]/20'
                        }`}
                      />
                      {errors.fullName && <p className="mt-1 text-[10px] text-red-400 font-mono">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-[10px] font-mono uppercase tracking-wider text-[#F4F0E8] mb-2">
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
                        className={`w-full px-4 py-3 bg-[#071116] border text-xs text-[#F4F0E8] placeholder-[#9A9389]/40 focus:outline-none focus:border-[#D6B978] transition-colors ${
                          errors.phone ? 'border-red-500/80' : 'border-[#C7A15A]/20'
                        }`}
                      />
                      {errors.phone && <p className="mt-1 text-[10px] text-red-400 font-mono">{errors.phone}</p>}
                    </div>
                  </div>

                  {/* Email & Preferred Contact */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="email" className="block text-[10px] font-mono uppercase tracking-wider text-[#F4F0E8] mb-2">
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
                        className={`w-full px-4 py-3 bg-[#071116] border text-xs text-[#F4F0E8] placeholder-[#9A9389]/40 focus:outline-none focus:border-[#D6B978] transition-colors ${
                          errors.email ? 'border-red-500/80' : 'border-[#C7A15A]/20'
                        }`}
                      />
                      {errors.email && <p className="mt-1 text-[10px] text-red-400 font-mono">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="preferredContact" className="block text-[10px] font-mono uppercase tracking-wider text-[#F4F0E8] mb-2">
                        PREFERRED CONTACT METHOD
                      </label>
                      <select
                        id="preferredContact"
                        name="preferredContact"
                        value={formData.preferredContact}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#071116] border border-[#C7A15A]/20 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#D6B978] transition-colors"
                      >
                        <option value="Phone">Phone Call</option>
                        <option value="Email">Email</option>
                        <option value="WhatsApp">WhatsApp</option>
                      </select>
                    </div>
                  </div>

                  {/* Interest Category */}
                  <div>
                    <label htmlFor="interestCategory" className="block text-[10px] font-mono uppercase tracking-wider text-[#F4F0E8] mb-2">
                      MEMBERSHIP CATEGORY
                    </label>
                    <select
                      id="interestCategory"
                      name="interestCategory"
                      value={formData.interestCategory}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#071116] border border-[#C7A15A]/20 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#D6B978] transition-colors"
                    >
                      <option value="Individual Membership Enquiry">Individual Membership</option>
                      <option value="Family Membership Enquiry">Family Membership</option>
                      <option value="Corporate / Group Enquiry">Corporate / Group Enquiry</option>
                      <option value="General Information Enquiry">General Membership Inquiry</option>
                    </select>
                  </div>

                  {/* Optional Message */}
                  <div>
                    <label htmlFor="message" className="block text-[10px] font-mono uppercase tracking-wider text-[#F4F0E8] mb-2">
                      NOTES / SPECIFIC INQUIRIES <span className="text-[#9A9389] lowercase font-sans">(optional)</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Specify any questions, preferred time for call, or site visit interest..."
                      className="w-full px-4 py-3 bg-[#071116] border border-[#C7A15A]/20 text-xs text-[#F4F0E8] placeholder-[#9A9389]/40 focus:outline-none focus:border-[#D6B978] transition-colors resize-none"
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
                        className="mt-1 h-4 w-4 border-[#C7A15A]/40 bg-[#071116] text-[#D6B978] focus:ring-[#D6B978]"
                      />
                      <span className="text-xs text-[#9A9389] font-light leading-relaxed group-hover:text-[#F4F0E8] transition-colors">
                        I agree that Markhor Club may contact me regarding my confidential membership inquiry.
                      </span>
                    </label>
                    {errors.consent && <p className="mt-1 text-[10px] text-red-400 font-mono">{errors.consent}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-[#D6B978] px-8 py-4 text-[11px] font-mono uppercase tracking-[0.2em] font-bold text-[#071116] transition-all hover:bg-[#F4F0E8] focus:outline-none disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-[#071116]" /> SUBMITTING APPLICATION...
                        </span>
                      ) : (
                        'SUBMIT MEMBERSHIP APPLICATION'
                      )}
                    </button>
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

