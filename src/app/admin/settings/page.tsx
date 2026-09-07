'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import {
  Building2,
  Image as ImageIcon,
  User,
  Users,
  CreditCard,
  Bell,
  Wifi,
  Shield,
  ChevronRight,
} from 'lucide-react'

const SECTIONS = [
  {
    id: 'club',
    label: 'Club Profile',
    description: 'Display name, email, phone, address, currency, membership fee',
    icon: Building2,
    href: '/admin/settings/club',
    color: 'text-[#C7A15A]',
    bg: 'bg-[#C7A15A]/10',
  },
  {
    id: 'branding',
    label: 'Branding & Logo',
    description: 'Upload admin portal logo, club logo, profile image',
    icon: ImageIcon,
    href: '/admin/settings/branding',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
  },
  {
    id: 'account',
    label: 'My Account',
    description: 'Update your profile and change your password',
    icon: User,
    href: '/admin/settings/account',
    color: 'text-sky-400',
    bg: 'bg-sky-400/10',
  },
  {
    id: 'users',
    label: 'Users & Permissions',
    description: 'Create users, assign roles, manage access permissions (RBAC)',
    icon: Users,
    href: '/admin/settings/users',
    color: 'text-violet-400',
    bg: 'bg-violet-400/10',
  },
  {
    id: 'payment-accounts',
    label: 'Payment Accounts',
    description: 'Configure Easypaisa, UBL, bank accounts for membership payments',
    icon: CreditCard,
    href: '/admin/settings/payment-accounts',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
  },
  {
    id: 'notifications',
    label: 'Notifications',
    description: 'WhatsApp, email notification templates and delivery settings',
    icon: Bell,
    href: '/admin/notifications',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10',
  },
  {
    id: 'integration',
    label: 'Integration Status',
    description: 'CRM, payment gateway, WhatsApp and API integration health',
    icon: Wifi,
    href: '/admin/integration-status',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
  },
  {
    id: 'security',
    label: 'Security',
    description: 'Active sessions, session management, security settings',
    icon: Shield,
    href: '/admin/settings/security',
    color: 'text-rose-400',
    bg: 'bg-rose-400/10',
  },
]

export default function SettingsPage() {
  const router = useRouter()

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-serif font-bold text-[#F4F0E8] tracking-wide">Settings</h1>
        <p className="text-sm text-[#F4F0E8]/50 mt-1">
          Administrative control center — Markhor Club Portal
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SECTIONS.map((section) => {
          const Icon = section.icon
          return (
            <button
              key={section.id}
              onClick={() => router.push(section.href)}
              className="group text-left w-full bg-[#0B1C26] border border-[#C7A15A]/15 rounded-xl p-5 hover:border-[#C7A15A]/40 hover:bg-[#0B1C26]/80 transition-all duration-200 flex items-start gap-4"
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-lg ${section.bg} flex items-center justify-center mt-0.5`}
              >
                <Icon className={`w-5 h-5 ${section.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#F4F0E8] tracking-wide group-hover:text-[#C7A15A] transition-colors">
                    {section.label}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-[#F4F0E8]/30 group-hover:text-[#C7A15A] flex-shrink-0 transition-colors" />
                </div>
                <p className="text-xs text-[#F4F0E8]/50 mt-1 leading-relaxed line-clamp-2">
                  {section.description}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Version note */}
      <div className="mt-10 pt-6 border-t border-[#C7A15A]/10 text-center text-[10px] tracking-widest text-[#F4F0E8]/25 uppercase font-mono">
        Markhor Club Admin Portal • All changes are audit-logged
      </div>
    </div>
  )
}
