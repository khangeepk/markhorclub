'use client'

import React, { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Bot, User, PhoneCall, Sparkles } from 'lucide-react'

interface Message {
  id: string
  sender: 'bot' | 'user'
  text: string
  time: string
}

export const FaqChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Welcome to Markhor Club Concierge. How may I assist you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])

  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim()
    if (!text || loading) return

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
        text: data.reply || "I don't have verified information for that yet. Would you like to speak with a Markhor Club representative?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }

      setMessages((prev) => [...prev, botMsg])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: 'Our AI Concierge is momentarily busy. Please reach us directly at UAN 0995-111-222-333.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const quickActions = [
    'Membership Fee',
    'Location',
    'Amenities',
    'Aqua Theme Park',
    'Book a Visit',
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
        aria-label="Open Markhor FAQ Assistant"
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

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-[92vw] sm:w-[380px] h-[520px] rounded-2xl bg-[#071116] border border-[#C7A15A]/40 shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 bg-[#0B1C26] border-b border-[#C7A15A]/20">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#C7A15A]/20 border border-[#C7A15A]/50 text-[#C7A15A]">
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
              <div>
                <h3 className="text-sm font-serif font-medium text-[#F4F0E8] tracking-wide">Markhor Concierge</h3>
                <p className="text-[10px] tracking-wider text-[#C7A15A] uppercase">AI Powered • Verified Facts</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-[#F4F0E8]/70 hover:text-[#F4F0E8] hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Action Pills */}
          <div className="px-4 py-2.5 bg-[#071116] border-b border-[#C7A15A]/10 flex gap-2 overflow-x-auto no-scrollbar scrollbar-none">
            {quickActions.map((act) => (
              <button
                key={act}
                onClick={() => {
                  if (act === 'Speak to Live CSR') {
                    window.open(liveCsrUrl, '_blank')
                  } else {
                    handleSend(act)
                  }
                }}
                className="whitespace-nowrap px-3 py-1 rounded-full text-[11px] tracking-wider text-[#D6B978] bg-[#0B1C26] border border-[#C7A15A]/30 hover:border-[#C7A15A] hover:bg-[#C7A15A]/10 transition-all duration-200"
              >
                {act === 'Speak to Live CSR' ? '💬 Live CSR' : act}
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
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#C7A15A] text-[#071116] font-medium rounded-br-none'
                      : 'bg-[#0B1C26] border border-[#C7A15A]/20 text-[#F4F0E8] rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-[#071116]/70' : 'text-[#F4F0E8]/40'
                    }`}
                  >
                    {msg.time}
                  </span>
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

          {/* Direct CSR Connect Banner */}
          <div className="px-4 py-1.5 bg-[#0B1C26]/90 border-t border-[#C7A15A]/20 flex items-center justify-between text-[11px] text-[#F4F0E8]/80">
            <span>Need human assistance?</span>
            <a
              href={liveCsrUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#C7A15A] hover:underline font-medium"
            >
              <PhoneCall className="w-3 h-3" /> Connect to CSR
            </a>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
            className="p-3 bg-[#0B1C26] border-t border-[#C7A15A]/20 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask about membership, location, fee..."
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
    </>
  )
}
