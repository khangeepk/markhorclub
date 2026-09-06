'use client'

import React, { useState, useRef, useEffect } from 'react'
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  PhoneCall,
  Sparkles,
  Calendar,
  CheckCircle2,
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  Mic,
  Globe,
  Clock,
} from 'lucide-react'

interface Message {
  id: string
  sender: 'bot' | 'user'
  text: string
  time: string
  intent?: string
}

export const FaqChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [showOfflineModal, setShowOfflineModal] = useState(false)
  const [modalTab, setModalTab] = useState<'message' | 'callback'>('message')
  const [language, setLanguage] = useState<'en' | 'ur'>('en')

  // Voice playback & recording state
  const [playingMsgId, setPlayingMsgId] = useState<string | null>(null)
  const [isAudioPaused, setIsAudioPaused] = useState(false)
  const [isListeningMic, setIsListeningMic] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Offline message & Callback form state
  const [offlineForm, setOfflineForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    preferredTime: 'Morning (9am - 12pm)',
    message: '',
  })
  const [offlineSubmitting, setOfflineSubmitting] = useState(false)
  const [offlineSuccess, setOfflineSuccess] = useState(false)

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Welcome to Markhor Club Concierge. How may I assist you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])

  const chatEndRef = useRef<HTMLDivElement>(null)

  const gcrmWidgetSrc = process.env.NEXT_PUBLIC_GCRM_CHAT_WIDGET_SRC
  const gcrmWidgetId = process.env.NEXT_PUBLIC_GCRM_CHAT_WIDGET_ID

  useEffect(() => {
    if (gcrmWidgetSrc && gcrmWidgetId) {
      const script = document.createElement('script')
      script.src = gcrmWidgetSrc
      script.async = true
      script.setAttribute('data-[#071116]', gcrmWidgetId)
      document.body.appendChild(script)

      return () => {
        document.body.removeChild(script)
      }
    }
  }, [gcrmWidgetSrc, gcrmWidgetId])

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  // Stop any active audio playback
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current = null
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    setPlayingMsgId(null)
    setIsAudioPaused(false)
  }

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim()
    if (!text || loading) return

    stopAudio()

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    if (!textToSend) setInputMessage('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })
      const data = await res.json()

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: data.reply || "I don't have verified information for that yet. I can connect you with a Markhor Club representative.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        intent: data.intent,
      }

      setMessages((prev) => [...prev, botMsg])

      if (data.intent === 'live_csr' || text.toLowerCase().includes('csr')) {
        setShowOfflineModal(true)
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Our AI Concierge is momentarily busy. Please reach us directly at UAN 0995-111-222-333 or via WhatsApp.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  // Voice TTS Playback Handler (Play / Pause / Replay)
  const handleListenPlay = async (msg: Message) => {
    // If clicking same active message: toggle Pause / Resume
    if (playingMsgId === msg.id && audioRef.current) {
      if (isAudioPaused) {
        audioRef.current.play()
        setIsAudioPaused(false)
      } else {
        audioRef.current.pause()
        setIsAudioPaused(true)
      }
      return
    }

    // Stop any previously playing audio response
    stopAudio()
    setPlayingMsgId(msg.id)
    setIsAudioPaused(false)

    try {
      const res = await fetch('/api/voice/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: msg.text, language }),
      })

      if (res.headers.get('content-type')?.includes('audio/mpeg')) {
        const blob = await res.blob()
        const url = URL.createObjectURL(blob)
        const audio = new Audio(url)
        audioRef.current = audio
        audio.onended = () => stopAudio()
        audio.onerror = () => stopAudio()
        audio.play()
        return
      }

      const data = await res.json()

      if (data.success && data.audioUrl) {
        const audio = new Audio(data.audioUrl)
        audioRef.current = audio
        audio.onended = () => stopAudio()
        audio.onerror = () => stopAudio()
        audio.play()
        return
      }

      // Browser Web Speech Fallback if server returned web_speech
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(msg.text)
        utterance.lang = language === 'ur' ? 'ur-PK' : 'en-US'
        utterance.onend = () => stopAudio()
        utterance.onerror = () => stopAudio()
        window.speechSynthesis.speak(utterance)
      } else {
        stopAudio()
      }
    } catch (err) {
      console.warn('Voice synthesis or playback failed:', err)
      stopAudio()
    }
  }

  const handleListenReplay = (msg: Message) => {
    stopAudio()
    handleListenPlay(msg)
  }

  // Mic Speech Recognition Handler
  const handleMicClick = () => {
    if (typeof window === 'undefined') return
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please type your query.')
      return
    }

    if (isListeningMic) {
      setIsListeningMic(false)
      return
    }

    try {
      const recognition = new SpeechRecognition()
      recognition.lang = language === 'ur' ? 'ur-PK' : 'en-US'
      recognition.interimResults = false

      recognition.onstart = () => setIsListeningMic(true)
      recognition.onend = () => setIsListeningMic(false)

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0]?.transcript
        if (transcript) {
          setInputMessage(transcript)
        }
      }

      recognition.start()
    } catch {
      setIsListeningMic(false)
    }
  }

  // Offline / Callback Submit Handler
  const handleOfflineSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!offlineForm.fullName || !offlineForm.phone) return

    setOfflineSubmitting(true)
    try {
      const actionType = modalTab === 'callback' ? 'requestCallback' : 'leaveMessage'
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: actionType,
          fullName: offlineForm.fullName,
          phone: offlineForm.phone,
          email: offlineForm.email,
          preferredTime: offlineForm.preferredTime,
          message: offlineForm.message || (modalTab === 'callback' ? 'VIP Concierge Callback Request' : 'Offline Message'),
        }),
      })
      const json = await res.json()
      if (json.success) {
        setOfflineSuccess(true)
        setTimeout(() => {
          setShowOfflineModal(false)
          setOfflineSuccess(false)
          setOfflineForm({
            fullName: '',
            phone: '',
            email: '',
            preferredTime: 'Morning (9am - 12pm)',
            message: '',
          })
        }, 2500)
      }
    } catch {
      alert('Submission failed. Please reach us via WhatsApp.')
    } finally {
      setOfflineSubmitting(false)
    }
  }

  const quickActions = [
    'Membership Fee',
    'Location',
    'Amenities',
    'Aqua Theme Park',
    'Book a Visit',
    'Request Callback',
    'Speak to Live CSR',
  ]

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_CONTACT_NUMBER || '+923305230888'
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '')
  const liveCsrUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent('Hello Markhor Club, I would like to speak with a Live CSR.')}`

  return (
    <>
      {/* Floating Chatbot Launcher Button (Bottom Left) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Markhor VIP Concierge Chat"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#071116]/95 border border-[#C7A15A]/40 text-[#F4F0E8] shadow-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-[#C7A15A] hover:shadow-[0_0_25px_rgba(199,161,90,0.3)] group"
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#C7A15A]/15 text-[#C7A15A] group-hover:bg-[#C7A15A] group-hover:text-[#071116] transition-colors duration-300">
          <Bot className="w-5 h-5" />
        </div>
        <div className="hidden sm:flex flex-col text-left pr-1">
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#C7A15A] font-medium">Concierge Bot</span>
          <span className="text-xs font-serif tracking-wide text-[#F4F0E8]">Ask Markhor</span>
        </div>
      </button>

      {/* Main Luxury Concierge Modal */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-[92vw] sm:w-[390px] h-[560px] rounded-2xl bg-[#071116] border border-[#C7A15A]/40 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-[#0B1C26] border-b border-[#C7A15A]/20">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#C7A15A]/20 border border-[#C7A15A]/50 text-[#C7A15A]">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-serif font-medium text-[#F4F0E8] tracking-wide">Markhor Club Concierge</h3>
                <p className="text-[10px] tracking-wider text-[#C7A15A] uppercase">AI Powered • Voice Concierge</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Language Selector */}
              <button
                onClick={() => setLanguage((prev) => (prev === 'en' ? 'ur' : 'en'))}
                title="Toggle Voice Language (EN / UR)"
                className="px-2 py-1 rounded-lg bg-[#071116] border border-[#C7A15A]/30 text-[10px] font-bold tracking-wider text-[#C7A15A] hover:border-[#C7A15A] transition flex items-center gap-1"
              >
                <Globe className="w-3 h-3" />
                <span>{language.toUpperCase()}</span>
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full text-[#F4F0E8]/70 hover:text-[#F4F0E8] hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Action Pills */}
          <div className="px-4 py-2 bg-[#071116] border-b border-[#C7A15A]/10 flex gap-2 overflow-x-auto no-scrollbar scrollbar-none">
            {quickActions.map((act) => (
              <button
                key={act}
                onClick={() => {
                  if (act === 'Speak to Live CSR') {
                    setModalTab('message')
                    setShowOfflineModal(true)
                  } else if (act === 'Request Callback') {
                    setModalTab('callback')
                    setShowOfflineModal(true)
                  } else {
                    handleSend(act)
                  }
                }}
                className="whitespace-nowrap px-3 py-1 rounded-full text-[11px] tracking-wider text-[#D6B978] bg-[#0B1C26] border border-[#C7A15A]/30 hover:border-[#C7A15A] hover:bg-[#C7A15A]/10 transition-all duration-200"
              >
                {act === 'Speak to Live CSR' ? '💬 Live CSR' : act === 'Request Callback' ? '📞 Callback' : act}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-[#071116]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-[#C7A15A]/20 border border-[#C7A15A]/40 flex items-center justify-center text-[#C7A15A] shrink-0 mt-1">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#C7A15A] text-[#071116] font-medium rounded-br-none'
                      : 'bg-[#0B1C26] border border-[#C7A15A]/20 text-[#F4F0E8] rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Contextual Action Trigger */}
                  {msg.intent === 'book_visit' && (
                    <a
                      href="#membership"
                      onClick={() => setIsOpen(false)}
                      className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C7A15A] text-[#071116] font-bold text-[10px] uppercase tracking-wider hover:bg-[#D6B978]"
                    >
                      <Calendar className="w-3 h-3" /> Book Site Visit Now
                    </a>
                  )}

                  <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-white/10">
                    {/* Minimal Audio Player for Voice Output */}
                    {msg.sender === 'bot' ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleListenPlay(msg)}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wider transition border ${
                            playingMsgId === msg.id
                              ? 'bg-[#C7A15A] text-[#071116] border-[#C7A15A]'
                              : 'bg-[#071116] text-[#C7A15A] border-[#C7A15A]/40 hover:border-[#C7A15A]'
                          }`}
                          title={playingMsgId === msg.id ? (isAudioPaused ? 'Resume Voice' : 'Pause Voice') : 'Listen to Voice Answer'}
                        >
                          {playingMsgId === msg.id ? (
                            isAudioPaused ? (
                              <>
                                <Play className="w-2.5 h-2.5 fill-current" />
                                <span>Resume</span>
                              </>
                            ) : (
                              <>
                                <Pause className="w-2.5 h-2.5 fill-current animate-pulse" />
                                <span>Pause</span>
                              </>
                            )
                          ) : (
                            <>
                              <Volume2 className="w-2.5 h-2.5" />
                              <span>Listen</span>
                            </>
                          )}
                        </button>

                        {playingMsgId === msg.id && (
                          <button
                            onClick={() => handleListenReplay(msg)}
                            className="p-1 rounded-full text-[#C7A15A] hover:text-white transition"
                            title="Replay Voice Answer"
                          >
                            <RotateCcw className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ) : (
                      <span />
                    )}

                    <span
                      className={`block text-[9px] ${
                        msg.sender === 'user' ? 'text-[#071116]/70' : 'text-[#F4F0E8]/40'
                      }`}
                    >
                      {msg.time}
                    </span>
                  </div>
                </div>
                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[#C7A15A] flex items-center justify-center text-[#071116] shrink-0 mt-1">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2 items-center text-xs text-[#C7A15A]">
                <Bot className="w-4 h-4 animate-spin" />
                <span>Searching verified Markhor database...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* CSR Connect / Fallback Banner */}
          <div className="px-4 py-2 bg-[#0B1C26]/90 border-t border-[#C7A15A]/20 flex items-center justify-between text-[11px] text-[#F4F0E8]/80">
            <span>Need human support?</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setModalTab('callback')
                  setShowOfflineModal(true)
                }}
                className="text-[#C7A15A] hover:underline font-medium flex items-center gap-1"
              >
                <PhoneCall className="w-3 h-3" /> Callback
              </button>
              <button
                onClick={() => {
                  setModalTab('message')
                  setShowOfflineModal(true)
                }}
                className="text-[#C7A15A] hover:underline font-medium"
              >
                Connect CSR
              </button>
            </div>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="p-3 bg-[#0B1C26] border-t border-[#C7A15A]/20 flex items-center gap-2"
          >
            {/* Microphone Dictation Button */}
            <button
              type="button"
              onClick={handleMicClick}
              title="Dictate message with microphone"
              className={`p-2 rounded-xl border transition-colors ${
                isListeningMic
                  ? 'bg-rose-950 border-rose-500 text-rose-400 animate-pulse'
                  : 'bg-[#071116] border-[#C7A15A]/30 text-[#C7A15A] hover:border-[#C7A15A]'
              }`}
            >
              <Mic className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={isListeningMic ? 'Listening...' : 'Ask about fee, location, amenities...'}
              className="flex-1 bg-[#071116] border border-[#C7A15A]/30 rounded-xl px-3.5 py-2 text-xs text-[#F4F0E8] placeholder-[#F4F0E8]/40 focus:outline-none focus:border-[#C7A15A]"
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="p-2 rounded-xl bg-[#C7A15A] text-[#071116] hover:bg-[#D6B978] disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Offline Message / Callback Modal */}
      {showOfflineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl bg-[#071116] border border-[#C7A15A]/40 p-6 shadow-2xl text-left space-y-4">
            <div className="flex justify-between items-center border-b border-[#C7A15A]/20 pb-3">
              <div>
                <h3 className="text-base font-serif font-semibold text-[#F4F0E8]">
                  {modalTab === 'callback' ? 'Request a Callback' : 'Live CSR Handoff'}
                </h3>
                <p className="text-[10px] text-[#C7A15A] uppercase tracking-wider mt-0.5">
                  {modalTab === 'callback' ? 'Schedule a Call with Concierge' : 'Offline Representative Support'}
                </p>
              </div>
              <button
                onClick={() => setShowOfflineModal(false)}
                className="p-1 rounded text-[#F4F0E8]/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Subtabs */}
            <div className="flex border-b border-[#C7A15A]/20">
              <button
                onClick={() => setModalTab('message')}
                className={`py-2 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition ${
                  modalTab === 'message'
                    ? 'border-[#C7A15A] text-[#C7A15A]'
                    : 'border-transparent text-[#F4F0E8]/50 hover:text-[#F4F0E8]'
                }`}
              >
                Leave Message
              </button>
              <button
                onClick={() => setModalTab('callback')}
                className={`py-2 px-4 text-xs font-semibold uppercase tracking-wider border-b-2 transition ${
                  modalTab === 'callback'
                    ? 'border-[#C7A15A] text-[#C7A15A]'
                    : 'border-transparent text-[#F4F0E8]/50 hover:text-[#F4F0E8]'
                }`}
              >
                Request Callback
              </button>
            </div>

            {offlineSuccess ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-semibold text-[#F4F0E8]">
                  {modalTab === 'callback' ? 'Callback Request Scheduled' : 'Message Logged'}
                </h4>
                <p className="text-xs text-[#F4F0E8]/70">
                  {modalTab === 'callback'
                    ? 'Your request has been saved and synced to GuaranteedCRM. Our concierge will contact you at your preferred time.'
                    : 'Your message has been received. A Markhor Club representative will respond shortly.'}
                </p>
              </div>
            ) : (
              <>
                <div className="flex gap-2">
                  <a
                    href={liveCsrUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-3 rounded-xl bg-[#0B1C26] border border-[#C7A15A]/40 text-[#D6B978] text-xs font-semibold text-center hover:border-[#C7A15A] transition"
                  >
                    💬 Chat on WhatsApp Instant
                  </a>
                </div>

                <form onSubmit={handleOfflineSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#C7A15A] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={offlineForm.fullName}
                      onChange={(e) => setOfflineForm((prev) => ({ ...prev, fullName: e.target.value }))}
                      placeholder="e.g. Tariq Mahmood"
                      className="w-full bg-[#0B1C26] border border-[#C7A15A]/30 rounded-xl px-3 py-2 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#C7A15A] mb-1">Phone Number *</label>
                      <input
                        type="text"
                        required
                        value={offlineForm.phone}
                        onChange={(e) => setOfflineForm((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="+92 300 1234567"
                        className="w-full bg-[#0B1C26] border border-[#C7A15A]/30 rounded-xl px-3 py-2 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#C7A15A] mb-1">Email Address</label>
                      <input
                        type="email"
                        value={offlineForm.email}
                        onChange={(e) => setOfflineForm((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="client@example.com"
                        className="w-full bg-[#0B1C26] border border-[#C7A15A]/30 rounded-xl px-3 py-2 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A]"
                      />
                    </div>
                  </div>

                  {modalTab === 'callback' && (
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#C7A15A] mb-1">Preferred Time *</label>
                      <select
                        value={offlineForm.preferredTime}
                        onChange={(e) => setOfflineForm((prev) => ({ ...prev, preferredTime: e.target.value }))}
                        className="w-full bg-[#0B1C26] border border-[#C7A15A]/30 rounded-xl px-3 py-2 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A]"
                      >
                        <option value="Morning (9am - 12pm)">Morning (9:00 AM - 12:00 PM)</option>
                        <option value="Afternoon (12pm - 5pm)">Afternoon (12:00 PM - 5:00 PM)</option>
                        <option value="Evening (5pm - 8pm)">Evening (5:00 PM - 8:00 PM)</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-[#C7A15A] mb-1">
                      {modalTab === 'callback' ? 'Notes / Questions (Optional)' : 'Message *'}
                    </label>
                    <textarea
                      required={modalTab === 'message'}
                      rows={2}
                      value={offlineForm.message}
                      onChange={(e) => setOfflineForm((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder={modalTab === 'callback' ? 'Specify any topic you wish to discuss...' : 'Your message or question...'}
                      className="w-full bg-[#0B1C26] border border-[#C7A15A]/30 rounded-xl px-3 py-2 text-xs text-[#F4F0E8] focus:outline-none focus:border-[#C7A15A]"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={offlineSubmitting}
                    className="w-full py-2.5 rounded-xl bg-[#C7A15A] text-[#071116] font-bold text-xs uppercase tracking-wider hover:bg-[#D6B978] transition"
                  >
                    {offlineSubmitting
                      ? 'Submitting...'
                      : modalTab === 'callback'
                      ? 'Schedule Callback Request'
                      : 'Send Message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
