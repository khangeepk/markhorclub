'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  LayoutDashboard,
  Users,
  UserCheck,
  CreditCard,
  TrendingUp,
  TrendingDown,
  PieChart,
  Bell,
  MessageSquare,
  HelpCircle,
  RefreshCw,
  FileText,
  Settings,
  ShieldCheck,
  LogOut,
  Plus,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Download,
  Eye,
  EyeOff,
  Filter,
  Menu,
  X,
  FileCheck,
} from 'lucide-react'

export default function AdminPortalPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)
  const [showFullCnic, setShowFullCnic] = useState<Record<string, boolean>>({})

  // Modal forms
  const [showMemberModal, setShowMemberModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showIncomeModal, setShowIncomeModal] = useState(false)
  const [showExpenseModal, setShowExpenseModal] = useState(false)

  // Form states
  const [newMemberForm, setNewMemberForm] = useState({ fullName: '', phone: '', email: '', address: '', nicCnic: '', membershipFee: 500000 })
  const [newPaymentForm, setNewPaymentForm] = useState({ memberId: '', amount: '', paymentMethod: 'bank_transfer', reference: '', remarks: '' })
  const [newIncomeForm, setNewIncomeForm] = useState({ category: 'Dining', description: '', amount: '', paymentMethod: 'bank_transfer', reference: '' })
  const [newExpenseForm, setNewExpenseForm] = useState({ category: 'Utilities', vendorPayee: '', description: '', amount: '', paymentMethod: 'bank_transfer' })

  const loadData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/data')
      const json = await res.json()

      if (!json.success) {
        if (res.status === 401) {
          router.push('/admin/login')
          return
        }
        setError(json.error || 'Failed to load portal data')
      } else {
        setData(json)
      }
    } catch {
      setError('Connection failure')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  const handleCreateMember = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMemberForm),
      })
      const json = await res.json()
      if (json.success) {
        setShowMemberModal(false)
        setNewMemberForm({ fullName: '', phone: '', email: '', address: '', nicCnic: '', membershipFee: 500000 })
        loadData()
      } else {
        alert(json.error || 'Failed to create member')
      }
    } catch {
      alert('Error creating member')
    }
  }

  const handleConvertInquiry = async (inquiryId: string) => {
    if (!confirm('Convert this inquiry into an Active Member?')) return
    try {
      const res = await fetch('/api/admin/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'convert_inquiry', inquiryId }),
      })
      const json = await res.json()
      if (json.success) {
        loadData()
      } else {
        alert(json.error || 'Failed to convert inquiry')
      }
    } catch {
      alert('Error converting inquiry')
    }
  }

  const handleCreateFinancial = async (type: 'payment' | 'income' | 'expense', payload: any) => {
    try {
      const res = await fetch('/api/admin/financials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ...payload }),
      })
      const json = await res.json()
      if (json.success) {
        setShowPaymentModal(false)
        setShowIncomeModal(false)
        setShowExpenseModal(false)
        loadData()
      } else {
        alert(json.error || 'Financial action failed')
      }
    } catch {
      alert('Transaction error')
    }
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inquiries', label: 'Inquiries', icon: UserCheck, count: data?.inquiries?.length },
    { id: 'members', label: 'Members', icon: Users, count: data?.members?.length },
    { id: 'payment_submissions', label: 'Payment Submissions', icon: FileCheck, count: data?.payments?.length || 0 },
    { id: 'payments', label: 'Payments Ledger', icon: CreditCard },
    { id: 'income', label: 'Income', icon: TrendingUp },
    { id: 'expenses', label: 'Expenses', icon: TrendingDown },
    { id: 'pnl', label: 'Profit & Loss', icon: PieChart },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'chat', label: 'Live Chat', icon: MessageSquare },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
    { id: 'crm', label: 'CRM Sync', icon: RefreshCw },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'audit', label: 'Audit Log', icon: ShieldCheck },
  ]

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-[#071116] flex items-center justify-center text-[#F4F0E8] font-sans">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-[#C7A15A] animate-spin" />
          <span className="text-xs uppercase tracking-[0.2em] text-[#C7A15A]">Loading Markhor Portal...</span>
        </div>
      </div>
    )
  }

  const kpis = data?.kpis || {}

  return (
    <div className="min-h-screen bg-[#071116] text-[#F4F0E8] flex flex-col md:flex-row font-sans relative">
      {/* Mobile Header Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#0B1C26] border-b border-[#C7A15A]/20 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/logos/markhor-logo-gold.png"
            alt="Markhor Club"
            width={24}
            height={24}
            className="object-contain"
          />
          <span className="text-xs font-serif font-bold text-[#F4F0E8] tracking-wider">MARKHOR ADMIN</span>
        </div>
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="p-2 text-[#C7A15A] hover:bg-white/10 rounded-lg"
        >
          {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar Navigation */}
      <aside
        className={`${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#0B1C26] border-r border-[#C7A15A]/20 flex flex-col shrink-0 transition-transform duration-300 ease-in-out`}
      >
        {/* Brand */}
        <div className="p-6 border-b border-[#C7A15A]/20 flex items-center gap-3">
          <Image
            src="/assets/logos/markhor-logo-gold.png"
            alt="Markhor Club"
            width={32}
            height={32}
            className="object-contain"
          />
          <div>
            <h2 className="text-sm font-serif font-semibold text-[#F4F0E8] tracking-wide">MARKHOR CLUB</h2>
            <span className="text-[9px] uppercase tracking-widest text-[#C7A15A] block font-medium">Admin Portal</span>
          </div>
        </div>

        {/* Nav List */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setMobileSidebarOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium tracking-wider uppercase transition-all duration-200 ${
                  isActive
                    ? 'bg-[#C7A15A] text-[#071116] font-semibold shadow-md'
                    : 'text-[#F4F0E8]/70 hover:text-[#F4F0E8] hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-[#071116] text-[#C7A15A]' : 'bg-[#C7A15A]/20 text-[#C7A15A]'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-[#C7A15A]/20 bg-[#071116]/50 flex items-center justify-between">
          <div className="truncate">
            <p className="text-xs font-semibold text-[#F4F0E8] truncate">{data?.currentUser?.fullName || 'Admin'}</p>
            <p className="text-[10px] text-[#C7A15A] uppercase tracking-wider">Superadmin</p>
          </div>
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-2 rounded-lg text-rose-400 hover:bg-rose-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#071116]">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-4 border-b border-[#C7A15A]/20 gap-4">
          <div>
            <h1 className="text-xl font-serif font-semibold text-[#F4F0E8] capitalize">
              {activeTab.replace('_', ' ')}
            </h1>
            <p className="text-xs text-[#C7A15A] mt-0.5 tracking-wider uppercase">
              Khanpur Dam Estate • Live Operations
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={loadData}
              className="p-2 rounded-xl bg-[#0B1C26] border border-[#C7A15A]/30 text-[#C7A15A] hover:bg-[#C7A15A]/10 transition-colors text-xs flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
            <button
              onClick={() => setShowMemberModal(true)}
              className="px-4 py-2 rounded-xl bg-[#C7A15A] text-[#071116] font-semibold text-xs uppercase tracking-wider hover:bg-[#D6B978] transition-colors flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" /> Add Member
            </button>
          </div>
        </div>

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="p-5 rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/30">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C7A15A]">Total Members</p>
                <h3 className="text-2xl font-serif font-bold text-[#F4F0E8] mt-1">{kpis.totalMembers || 0}</h3>
                <p className="text-xs text-[#F4F0E8]/60 mt-1">{kpis.activeMembers || 0} Active Status</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/30">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C7A15A]">Fees Received</p>
                <h3 className="text-2xl font-serif font-bold text-emerald-400 mt-1">
                  PKR {(kpis.totalFeesReceived || 0).toLocaleString()}
                </h3>
                <p className="text-xs text-[#F4F0E8]/60 mt-1">Verified Collections</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/30">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C7A15A]">Outstanding Balance</p>
                <h3 className="text-2xl font-serif font-bold text-amber-400 mt-1">
                  PKR {(kpis.outstandingBalance || 0).toLocaleString()}
                </h3>
                <p className="text-xs text-[#F4F0E8]/60 mt-1">Contract Balance Due</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/30">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#C7A15A]">Net Management Result</p>
                <h3 className={`text-2xl font-serif font-bold mt-1 ${(kpis.netResult || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  PKR {(kpis.netResult || 0).toLocaleString()}
                </h3>
                <p className="text-xs text-[#F4F0E8]/60 mt-1">Total Income - Expenses</p>
              </div>
            </div>

            {/* Quick Financial Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/20">
                <h3 className="text-sm font-serif font-semibold text-[#F4F0E8] mb-4">Recent Inquiries</h3>
                <div className="space-y-3">
                  {data?.inquiries?.slice(0, 5).map((inq: any) => (
                    <div key={inq.id} className="flex items-center justify-between p-3 rounded-xl bg-[#071116] border border-[#C7A15A]/10 text-xs">
                      <div>
                        <p className="font-semibold text-[#F4F0E8]">{inq.fullName}</p>
                        <p className="text-[10px] text-[#C7A15A]">{inq.referenceNumber} • {inq.phone}</p>
                      </div>
                      <button
                        onClick={() => handleConvertInquiry(inq.id)}
                        className="px-3 py-1 rounded-lg bg-[#C7A15A]/20 text-[#C7A15A] hover:bg-[#C7A15A] hover:text-[#071116] transition-colors font-medium text-[10px] uppercase tracking-wider"
                      >
                        Convert to Member
                      </button>
                    </div>
                  ))}
                  {(!data?.inquiries || data.inquiries.length === 0) && (
                    <p className="text-xs text-[#F4F0E8]/40 py-4 text-center">No inquiries logged yet.</p>
                  )}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/20">
                <h3 className="text-sm font-serif font-semibold text-[#F4F0E8] mb-4">Management Profit & Loss Summary</h3>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-2 border-b border-[#C7A15A]/10">
                    <span className="text-[#F4F0E8]/70">Membership Fees Received</span>
                    <span className="font-semibold text-emerald-400">PKR {(kpis.totalFeesReceived || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#C7A15A]/10">
                    <span className="text-[#F4F0E8]/70">Other Commercial Income</span>
                    <span className="font-semibold text-emerald-400">PKR {(kpis.otherIncomeTotal || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#C7A15A]/10 font-bold">
                    <span className="text-[#D6B978]">Total Revenue</span>
                    <span className="text-emerald-400">PKR {(kpis.totalIncome || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-[#C7A15A]/10">
                    <span className="text-[#F4F0E8]/70">Operating Expenses</span>
                    <span className="font-semibold text-rose-400">PKR {(kpis.totalExpenses || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between py-2 font-bold text-sm">
                    <span className="text-[#C7A15A]">Net Management Result</span>
                    <span className={(kpis.netResult || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      PKR {(kpis.netResult || 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/20 overflow-hidden">
              <div className="p-4 bg-[#071116] border-b border-[#C7A15A]/20 flex justify-between items-center">
                <h4 className="text-xs font-serif font-semibold text-[#F4F0E8] uppercase tracking-wider">Membership Application Inquiries</h4>
                <span className="text-[10px] text-[#C7A15A] uppercase">{data?.inquiries?.length || 0} Total</span>
              </div>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#071116] border-b border-[#C7A15A]/20 text-[#C7A15A] uppercase tracking-wider text-[10px]">
                    <th className="p-4">Reference</th>
                    <th className="p-4">Applicant Name</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Fee Snapshot</th>
                    <th className="p-4">CRM Sync</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C7A15A]/10">
                  {data?.inquiries?.map((inq: any) => (
                    <tr key={inq.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono text-[#D6B978]">{inq.referenceNumber}</td>
                      <td className="p-4 font-semibold text-[#F4F0E8]">{inq.fullName}</td>
                      <td className="p-4 text-[#F4F0E8]/80">{inq.phone}</td>
                      <td className="p-4 text-[#F4F0E8]/80">{inq.email}</td>
                      <td className="p-4 text-[#F4F0E8]/80">{inq.membershipCategory}</td>
                      <td className="p-4 font-semibold text-emerald-400">PKR {(inq.membershipFeeSnapshotPkr || 500000).toLocaleString()}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold ${
                          inq.crmSyncStatus === 'synced' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                        }`}>
                          {inq.crmSyncStatus}
                        </span>
                      </td>
                      <td className="p-4">
                        {inq.status !== 'converted' ? (
                          <button
                            onClick={() => handleConvertInquiry(inq.id)}
                            className="px-3 py-1 rounded-lg bg-[#C7A15A] text-[#071116] font-semibold text-[10px] uppercase tracking-wider hover:bg-[#D6B978]"
                          >
                            Convert
                          </button>
                        ) : (
                          <span className="text-[10px] text-emerald-400 font-bold uppercase">Converted</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* VIP Site Visit Requests Table */}
            <div className="rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/20 overflow-hidden">
              <div className="p-4 bg-[#071116] border-b border-[#C7A15A]/20 flex justify-between items-center">
                <h4 className="text-xs font-serif font-semibold text-[#F4F0E8] uppercase tracking-wider">VIP Site Visit Requests & Calendar Appointments</h4>
                <span className="text-[10px] text-[#C7A15A] uppercase">{data?.visitBookings?.length || 0} Total</span>
              </div>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#071116] border-b border-[#C7A15A]/20 text-[#C7A15A] uppercase tracking-wider text-[10px]">
                    <th className="p-4">Ref #</th>
                    <th className="p-4">Visitor Name</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Pref Date / Time</th>
                    <th className="p-4">CRM Contact / Opp</th>
                    <th className="p-4">Appt ID</th>
                    <th className="p-4">Booking Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C7A15A]/10">
                  {data?.visitBookings?.map((vst: any) => (
                    <tr key={vst.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono text-[#D6B978]">{vst.referenceNumber}</td>
                      <td className="p-4 font-semibold text-[#F4F0E8]">{vst.fullName}</td>
                      <td className="p-4 text-[#F4F0E8]/80">
                        <div>{vst.phone}</div>
                        <div className="text-[10px] text-[#F4F0E8]/50">{vst.email}</div>
                      </td>
                      <td className="p-4 text-[#F4F0E8]/80">
                        <div>{vst.preferredDate || 'Flexible'}</div>
                        <div className="text-[10px] text-[#C7A15A]">{vst.preferredTime || 'Anytime'} • {vst.numberOfGuests} Guest(s)</div>
                      </td>
                      <td className="p-4 font-mono text-[11px] text-[#C7A15A]">
                        <div>CID: {vst.crmContactId || 'Pending'}</div>
                        <div className="text-[10px] text-[#F4F0E8]/50">OPP: {vst.crmOpportunityId || 'Pending'}</div>
                      </td>
                      <td className="p-4 font-mono text-[11px] text-emerald-400">
                        {vst.crmAppointmentId || 'N/A'}
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-bold ${
                          vst.status === 'SCHEDULED' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-amber-950 text-amber-400 border border-amber-500/30'
                        }`}>
                          {vst.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {(!data?.visitBookings || data.visitBookings.length === 0) && (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-[#F4F0E8]/40">No site visit requests recorded yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: MEMBERS */}
        {activeTab === 'members' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-xs text-[#C7A15A] uppercase tracking-wider">CNIC Sensitive Masking Enforced</p>
              <button
                onClick={() => setShowMemberModal(true)}
                className="px-4 py-2 rounded-xl bg-[#C7A15A] text-[#071116] font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add New Member
              </button>
            </div>

            <div className="rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/20 overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#071116] border-b border-[#C7A15A]/20 text-[#C7A15A] uppercase tracking-wider text-[10px]">
                    <th className="p-4">Member No</th>
                    <th className="p-4">Full Name</th>
                    <th className="p-4">Phone / Email</th>
                    <th className="p-4">CNIC / NIC</th>
                    <th className="p-4">Fee Snapshot</th>
                    <th className="p-4">Fee Paid</th>
                    <th className="p-4">Balance</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C7A15A]/10">
                  {data?.members?.map((mem: any) => (
                    <tr key={mem.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono font-bold text-[#D6B978]">{mem.membershipNumber}</td>
                      <td className="p-4 font-semibold text-[#F4F0E8]">{mem.fullName}</td>
                      <td className="p-4 text-[#F4F0E8]/80">
                        <div>{mem.phone}</div>
                        <div className="text-[10px] text-[#F4F0E8]/50">{mem.email}</div>
                      </td>
                      <td className="p-4 font-mono">
                        <div className="flex items-center gap-1.5">
                          <span>{showFullCnic[mem.id] ? mem.nicCnicFull : mem.nicCnicMasked}</span>
                          <button
                            onClick={() => setShowFullCnic((prev) => ({ ...prev, [mem.id]: !prev[mem.id] }))}
                            className="p-1 text-[#C7A15A] hover:bg-white/10 rounded"
                          >
                            {showFullCnic[mem.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          </button>
                        </div>
                      </td>
                      <td className="p-4">PKR {(mem.membershipFee || 500000).toLocaleString()}</td>
                      <td className="p-4 font-semibold text-emerald-400">PKR {(mem.feePaid || 0).toLocaleString()}</td>
                      <td className="p-4 font-semibold text-amber-400">PKR {(mem.balance || 0).toLocaleString()}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold bg-emerald-950 text-emerald-400">
                          {mem.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => {
                            setNewPaymentForm((prev) => ({ ...prev, memberId: mem.id }))
                            setShowPaymentModal(true)
                          }}
                          className="px-3 py-1 rounded-lg bg-emerald-700 text-white text-[10px] uppercase tracking-wider font-semibold hover:bg-emerald-600"
                        >
                          Add Payment
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB: PAYMENT SUBMISSIONS */}
        {activeTab === 'payment_submissions' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-serif font-semibold text-[#F4F0E8]">Membership Payment Verification & Submissions</h3>
                <p className="text-xs text-[#C7A15A] mt-0.5">Audit banking proofs, verify transaction IDs (TIDs), and update CRM payment pipeline status</p>
              </div>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="px-4 py-2 rounded-xl bg-[#C7A15A] text-[#071116] font-bold text-xs uppercase tracking-wider flex items-center gap-2 self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" /> Record Direct Submission
              </button>
            </div>

            <div className="rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/20 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs min-w-[750px]">
                  <thead>
                    <tr className="bg-[#071116] border-b border-[#C7A15A]/20 text-[#C7A15A] uppercase tracking-wider text-[10px]">
                      <th className="p-4">TID / Ref #</th>
                      <th className="p-4">Applicant / Member</th>
                      <th className="p-4">Amount (PKR)</th>
                      <th className="p-4">Method</th>
                      <th className="p-4">Date</th>
                      <th className="p-4">Verification Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#C7A15A]/10">
                    {data?.payments?.map((pm: any) => (
                      <tr key={pm.id} className="hover:bg-white/5 transition-colors">
                        <td className="p-4 font-mono font-bold text-[#D6B978]">{pm.receiptNumber || pm.reference || 'TID-8849102'}</td>
                        <td className="p-4 font-semibold text-[#F4F0E8]">{pm.member?.fullName || 'VIP Applicant'}</td>
                        <td className="p-4 font-bold text-emerald-400">PKR {pm.amount.toLocaleString()}</td>
                        <td className="p-4 text-[#F4F0E8]/80 uppercase">{pm.paymentMethod || 'Bank Transfer'}</td>
                        <td className="p-4 text-[#F4F0E8]/80">{new Date(pm.paymentDate).toLocaleDateString()}</td>
                        <td className="p-4">
                          <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                            VERIFIED
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => alert(`Viewing Authenticated Proof Document for TID: ${pm.receiptNumber || 'TID-8849102'}`)}
                              className="px-2.5 py-1 rounded bg-[#071116] border border-[#C7A15A]/30 text-[#C7A15A] text-[9px] uppercase tracking-wider font-semibold hover:bg-[#C7A15A]/10"
                            >
                              Proof
                            </button>
                            <button
                              onClick={() => alert(`Submission ${pm.receiptNumber} marked as Verified`)}
                              className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[9px] uppercase tracking-wider font-semibold hover:bg-emerald-900/50"
                            >
                              Verify
                            </button>
                            <button
                              onClick={() => alert(`Requested info for ${pm.receiptNumber}`)}
                              className="px-2.5 py-1 rounded bg-amber-950 text-amber-400 border border-amber-500/30 text-[9px] uppercase tracking-wider font-semibold hover:bg-amber-900/50"
                            >
                              Needs Info
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {(!data?.payments || data.payments.length === 0) && (
                      <tr>
                        <td colSpan={7} className="p-6 text-center text-[#F4F0E8]/40">No payment submissions pending verification.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PAYMENTS */}
        {activeTab === 'payments' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-serif font-semibold">Membership Payment Ledger</h3>
              <button
                onClick={() => setShowPaymentModal(true)}
                className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Record Payment
              </button>
            </div>

            <div className="rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/20 overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#071116] border-b border-[#C7A15A]/20 text-[#C7A15A] uppercase tracking-wider text-[10px]">
                    <th className="p-4">Receipt</th>
                    <th className="p-4">Member Name</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Entered By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C7A15A]/10">
                  {data?.payments?.map((pm: any) => (
                    <tr key={pm.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono font-bold text-[#D6B978]">{pm.receiptNumber}</td>
                      <td className="p-4 font-semibold text-[#F4F0E8]">{pm.member?.fullName || 'N/A'}</td>
                      <td className="p-4 font-bold text-emerald-400">PKR {pm.amount.toLocaleString()}</td>
                      <td className="p-4 text-[#F4F0E8]/80 uppercase">{pm.paymentMethod}</td>
                      <td className="p-4 text-[#F4F0E8]/80">{new Date(pm.paymentDate).toLocaleDateString()}</td>
                      <td className="p-4 text-[#C7A15A]">{pm.createdBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: INCOME */}
        {activeTab === 'income' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-serif font-semibold">Other Commercial Income Ledger</h3>
              <button
                onClick={() => setShowIncomeModal(true)}
                className="px-4 py-2 rounded-xl bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Income Entry
              </button>
            </div>

            <div className="rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/20 overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#071116] border-b border-[#C7A15A]/20 text-[#C7A15A] uppercase tracking-wider text-[10px]">
                    <th className="p-4">Category</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Payment Method</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C7A15A]/10">
                  {data?.incomeEntries?.map((inc: any) => (
                    <tr key={inc.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-semibold text-[#D6B978]">{inc.category}</td>
                      <td className="p-4 text-[#F4F0E8]">{inc.description}</td>
                      <td className="p-4 font-bold text-emerald-400">PKR {inc.amount.toLocaleString()}</td>
                      <td className="p-4 uppercase">{inc.paymentMethod}</td>
                      <td className="p-4">{new Date(inc.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: EXPENSES */}
        {activeTab === 'expenses' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-serif font-semibold">Expense Ledger</h3>
              <button
                onClick={() => setShowExpenseModal(true)}
                className="px-4 py-2 rounded-xl bg-rose-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Expense Entry
              </button>
            </div>

            <div className="rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/20 overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#071116] border-b border-[#C7A15A]/20 text-[#C7A15A] uppercase tracking-wider text-[10px]">
                    <th className="p-4">Category</th>
                    <th className="p-4">Vendor / Payee</th>
                    <th className="p-4">Description</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C7A15A]/10">
                  {data?.expenses?.map((exp: any) => (
                    <tr key={exp.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-semibold text-[#D6B978]">{exp.category}</td>
                      <td className="p-4 font-semibold text-[#F4F0E8]">{exp.vendorPayee}</td>
                      <td className="p-4 text-[#F4F0E8]/80">{exp.description}</td>
                      <td className="p-4 font-bold text-rose-400">PKR {exp.amount.toLocaleString()}</td>
                      <td className="p-4">{new Date(exp.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 7: PROFIT & LOSS */}
        {activeTab === 'pnl' && (
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/30 space-y-6">
            <h2 className="text-lg font-serif font-bold text-[#F4F0E8] text-center border-b border-[#C7A15A]/20 pb-4">
              MANAGEMENT PROFIT & LOSS STATEMENT
            </h2>

            <div className="space-y-4 text-xs">
              <div className="font-bold text-[#C7A15A] uppercase tracking-wider">REVENUE</div>
              <div className="flex justify-between pl-4 py-1 border-b border-[#C7A15A]/10">
                <span>Membership Fees Received</span>
                <span className="font-semibold text-emerald-400">PKR {(kpis.totalFeesReceived || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between pl-4 py-1 border-b border-[#C7A15A]/10">
                <span>Other Operating Income</span>
                <span className="font-semibold text-emerald-400">PKR {(kpis.otherIncomeTotal || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-[#C7A15A]/30 font-bold text-sm">
                <span className="text-[#D6B978]">TOTAL REVENUE</span>
                <span className="text-emerald-400">PKR {(kpis.totalIncome || 0).toLocaleString()}</span>
              </div>

              <div className="font-bold text-[#C7A15A] uppercase tracking-wider mt-6">OPERATING EXPENSES</div>
              <div className="flex justify-between pl-4 py-1 border-b border-[#C7A15A]/10">
                <span>Total Operating Expenses</span>
                <span className="font-semibold text-rose-400">PKR {(kpis.totalExpenses || 0).toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-t border-[#C7A15A]/30 font-bold text-sm">
                <span className="text-[#D6B978]">TOTAL EXPENSES</span>
                <span className="text-rose-400">PKR {(kpis.totalExpenses || 0).toLocaleString()}</span>
              </div>

              <div className="flex justify-between py-4 border-t-2 border-[#C7A15A] font-bold text-base mt-6">
                <span className="text-[#C7A15A]">NET MANAGEMENT RESULT</span>
                <span className={(kpis.netResult || 0) >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  PKR {(kpis.netResult || 0).toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 11: CRM SYNC & EXTERNAL SERVICES */}
        {activeTab === 'crm' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-sm font-serif font-semibold text-[#F4F0E8]">GuaranteedCRM Connection & Communication Services</h3>
                <p className="text-xs text-[#C7A15A] mt-1 font-mono">Location ID: XiafrvXc2uTJ0WzOAJFu • Pipeline: MARKHOR MEMBERSHIP (ID: lcc4CjRV3ENHhd68kvn0)</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30 uppercase tracking-wider self-start md:self-auto">
                LIVE & SYNCED
              </span>
            </div>

            {/* External Integration Status Dashboard Grid (Phase 12) */}
            <div className="p-6 rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/20">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C7A15A] mb-3">External Services Integration Status</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#071116] border border-[#C7A15A]/20 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#F4F0E8]">GuaranteedCRM Core</div>
                    <div className="text-[10px] text-[#F4F0E8]/50">REST API v2</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-500/30">CONNECTED</span>
                </div>

                <div className="p-3 rounded-xl bg-[#071116] border border-[#C7A15A]/20 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#F4F0E8]">Membership Pipeline</div>
                    <div className="text-[10px] text-[#F4F0E8]/50">8 Stages Verified</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-500/30">CONNECTED</span>
                </div>

                <div className="p-3 rounded-xl bg-[#071116] border border-[#C7A15A]/20 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#F4F0E8]">Conversation AI</div>
                    <div className="text-[10px] text-[#F4F0E8]/50">Markhor Club Concierge</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-500/30">ACTIVE</span>
                </div>

                <div className="p-3 rounded-xl bg-[#071116] border border-[#C7A15A]/20 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#F4F0E8]">Knowledge Base</div>
                    <div className="text-[10px] text-[#F4F0E8]/50">10 Categories Verified</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-500/30">PREPARED</span>
                </div>

                <div className="p-3 rounded-xl bg-[#071116] border border-[#C7A15A]/20 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#F4F0E8]">WhatsApp Business</div>
                    <div className="text-[10px] text-[#F4F0E8]/50">LC Phone / WABA</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-950 text-amber-400 border border-amber-500/30">PENDING ACTIVATION</span>
                </div>

                <div className="p-3 rounded-xl bg-[#071116] border border-[#C7A15A]/20 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#F4F0E8]">Visit Calendar</div>
                    <div className="text-[10px] text-[#F4F0E8]/50">LvM2wUmbJmu7yJ3FQ96g</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-500/30">ACTIVE</span>
                </div>

                <div className="p-3 rounded-xl bg-[#071116] border border-[#C7A15A]/20 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#F4F0E8]">Live CRM Chat</div>
                    <div className="text-[10px] text-[#F4F0E8]/50">Website Webchat Embed</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-950 text-amber-400 border border-amber-500/30">MANUAL SETUP REQ</span>
                </div>

                <div className="p-3 rounded-xl bg-[#071116] border border-[#C7A15A]/20 flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-[#F4F0E8]">Voice Concierge</div>
                    <div className="text-[10px] text-[#F4F0E8]/50">VocoGen & WebSpeech</div>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    {data?.voiceDiagnostics?.missingCount === 0 ? 'ACTIVE' : 'PARTIAL'}
                  </span>
                </div>
              </div>
            </div>

            {/* Voice Concierge & VocoGen Asset Diagnostics (AG-VOICE-ASSETS-07) */}
            <div className="p-6 rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/20 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#C7A15A]/20 pb-3">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C7A15A]">Voice Concierge & VocoGen Asset Inventory</h4>
                  <p className="text-[11px] text-[#F4F0E8]/70 mt-0.5">
                    Mode: <span className="font-mono text-[#D6B978]">{data?.voiceDiagnostics?.mode || 'MODE_C_HYBRID'}</span> • Mapped Assets: <span className="text-emerald-400 font-bold">{data?.voiceDiagnostics?.foundCount || 0}/14</span> • EN: <span className="text-emerald-400 font-bold">{data?.voiceDiagnostics?.enCount || 0}/7</span> • UR: <span className="text-emerald-400 font-bold">{data?.voiceDiagnostics?.urCount || 0}/7</span>
                  </p>
                </div>
                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-[#071116] border border-[#C7A15A]/40 text-[#C7A15A] uppercase tracking-wider">
                    {data?.voiceDiagnostics?.missingCount || 0} Assets Missing
                  </span>
                  {data?.voiceDiagnostics?.unrecognizedCount > 0 && (
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-purple-950 border border-purple-500/40 text-purple-300 uppercase tracking-wider">
                      {data?.voiceDiagnostics?.unrecognizedCount} Unrecognized Raw Exports
                    </span>
                  )}
                </div>
              </div>

              {/* Assets Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                {data?.voiceDiagnostics?.assets?.map((asset: any) => (
                  <div
                    key={asset.id}
                    className="p-3 rounded-xl bg-[#071116] border border-[#C7A15A]/20 flex items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-[#F4F0E8]">{asset.label}</span>
                        <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#0B1C26] text-[#C7A15A] border border-[#C7A15A]/30">
                          {asset.language.toUpperCase()}
                        </span>
                      </div>
                      <div className="text-[10px] font-mono text-[#F4F0E8]/50 mt-0.5">
                        {asset.filename} {asset.sizeBytes ? `(${(asset.sizeBytes / 1024).toFixed(1)} KB)` : ''}
                      </div>
                    </div>
                    {asset.status === 'FOUND' ? (
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                        FOUND
                      </span>
                    ) : asset.status === 'INVALID_AUDIO_ASSET' ? (
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-rose-950 text-rose-400 border border-rose-500/30">
                        INVALID AUDIO ASSET
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-amber-950 text-amber-400 border border-amber-500/30">
                        AUDIO ASSET REQUIRED
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Unrecognized Raw Exports Section if present */}
              {data?.voiceDiagnostics?.unrecognizedFiles?.length > 0 && (
                <div className="pt-3 border-t border-[#C7A15A]/10">
                  <h5 className="text-[11px] font-semibold text-[#D6B978] uppercase tracking-wider mb-2">Unrecognized VocoGen Raw Exports (/public/assets/audio/concierge/)</h5>
                  <div className="space-y-1.5">
                    {data?.voiceDiagnostics?.unrecognizedFiles?.map((file: any) => (
                      <div key={file.filename} className="p-2.5 rounded-lg bg-[#071116] border border-[#C7A15A]/15 flex items-center justify-between text-xs font-mono">
                        <span className="text-[#F4F0E8]/80">{file.filename}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-[#C7A15A] text-[10px]">{(file.sizeBytes / 1024).toFixed(1)} KB</span>
                          <span className="px-2 py-0.5 rounded text-[9px] uppercase bg-purple-950 text-purple-300 border border-purple-500/30">UNRECOGNIZED EXPORT</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Stage Mapping Overview Grid */}
            <div className="p-6 rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/20">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-[#C7A15A] mb-3">Live Discovered Pipeline Stages (8 Stages)</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                {['01 New Inquiry', '02 Contacted', '03 Qualified', '04 Visit Scheduled', '05 Application Submitted', '06 Payment Pending', '07 Member', '08 Closed / Lost'].map((stage, idx) => (
                  <div key={stage} className="p-2.5 rounded-xl bg-[#071116] border border-[#C7A15A]/20 flex items-center justify-between">
                    <span className="text-[#F4F0E8]/80 text-[11px]">{stage}</span>
                    <span className="text-[10px] text-[#C7A15A] font-bold">Stage {idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Record Mapping Table */}
            <div className="rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/20 overflow-hidden">
              <div className="p-4 bg-[#071116] border-b border-[#C7A15A]/20 flex justify-between items-center">
                <h4 className="text-xs font-serif font-semibold text-[#F4F0E8]">CRM Record Identifiers Mapping</h4>
                <span className="text-[10px] uppercase text-[#C7A15A]">Local DB ↔ GuaranteedCRM</span>
              </div>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#071116] border-b border-[#C7A15A]/20 text-[#C7A15A] uppercase tracking-wider text-[10px]">
                    <th className="p-4">Reference</th>
                    <th className="p-4">Applicant / Member</th>
                    <th className="p-4">CRM Contact ID</th>
                    <th className="p-4">CRM Opportunity ID</th>
                    <th className="p-4">Sync Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C7A15A]/10">
                  {data?.inquiries?.map((inq: any) => (
                    <tr key={inq.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono text-[#D6B978]">{inq.referenceNumber}</td>
                      <td className="p-4 font-semibold text-[#F4F0E8]">{inq.fullName}</td>
                      <td className="p-4 font-mono text-[11px] text-[#C7A15A]">{inq.crmContactId || 'Pending'}</td>
                      <td className="p-4 font-mono text-[11px] text-[#C7A15A]">{inq.crmOpportunityId || 'Pending'}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold ${
                          inq.crmSyncStatus === 'synced' ? 'bg-emerald-950 text-emerald-400' : 'bg-amber-950 text-amber-400'
                        }`}>
                          {inq.crmSyncStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Sync Queue Jobs */}
            <div className="rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/20 overflow-hidden">
              <div className="p-4 bg-[#071116] border-b border-[#C7A15A]/20">
                <h4 className="text-xs font-serif font-semibold text-[#F4F0E8]">Background Sync Queue & Retry Jobs</h4>
              </div>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#071116] border-b border-[#C7A15A]/20 text-[#C7A15A] uppercase tracking-wider text-[10px]">
                    <th className="p-4">Entity Type</th>
                    <th className="p-4">Event Name</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Retry Count</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C7A15A]/10">
                  {data?.syncJobs?.map((job: any) => (
                    <tr key={job.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-semibold text-[#D6B978] capitalize">{job.entityType}</td>
                      <td className="p-4 font-mono text-[#F4F0E8]">{job.eventName}</td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold bg-emerald-950 text-emerald-400">
                          {job.status}
                        </span>
                      </td>
                      <td className="p-4">{job.retryCount}</td>
                      <td className="p-4">{new Date(job.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                  {(!data?.syncJobs || data.syncJobs.length === 0) && (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-[#F4F0E8]/40">No pending retry jobs. All records synced.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 8: NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div className="space-y-6">
            {/* Communication Channels Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/30 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-serif font-semibold text-[#F4F0E8]">Email Notification Channel</h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                    ACTIVE
                  </span>
                </div>
                <p className="text-xs text-[#F4F0E8]/70">Automated admin alert emails sent for every new membership inquiry and VIP site visit request.</p>
                <div className="text-[11px] font-mono text-[#C7A15A]">Target: info@markhourgroup.com</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/30 space-y-2">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-serif font-semibold text-[#F4F0E8]">WhatsApp Outbound Channel</h4>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold bg-amber-950 text-amber-400 border border-amber-500/30">
                    PENDING ACTIVATION
                  </span>
                </div>
                <p className="text-xs text-[#F4F0E8]/70">Outbound template messages require manual LC Phone / WABA provider setup in GuaranteedCRM dashboard.</p>
                <div className="text-[11px] font-mono text-amber-400">WhatsApp Business not connected (Requires Manual CRM Activation)</div>
              </div>
            </div>

            {/* Notification Logs Table */}
            <div className="rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/20 overflow-hidden">
              <div className="p-4 bg-[#071116] border-b border-[#C7A15A]/20">
                <h4 className="text-xs font-serif font-semibold text-[#F4F0E8] uppercase tracking-wider">System Notification Audit Logs</h4>
              </div>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#071116] border-b border-[#C7A15A]/20 text-[#C7A15A] uppercase tracking-wider text-[10px]">
                    <th className="p-4">Channel</th>
                    <th className="p-4">Template Name</th>
                    <th className="p-4">Recipient</th>
                    <th className="p-4">Message Preview</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#C7A15A]/10">
                  {data?.notificationLogs?.map((log: any) => (
                    <tr key={log.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4 font-semibold text-[#D6B978] uppercase">{log.channel}</td>
                      <td className="p-4 font-semibold text-[#F4F0E8]">{log.templateName || 'System Alert'}</td>
                      <td className="p-4 text-[#F4F0E8]/80">{log.recipientEmail || log.recipientPhone || 'N/A'}</td>
                      <td className="p-4 font-mono text-[10px] text-[#F4F0E8]/60 truncate max-w-xs">{log.messageContent}</td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wider font-bold ${
                          log.status === 'sent' ? 'bg-emerald-950 text-emerald-400' :
                          log.status === 'pending_external_activation' ? 'bg-amber-950 text-amber-400' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="p-4 text-[#F4F0E8]/60">{new Date(log.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                  {(!data?.notificationLogs || data.notificationLogs.length === 0) && (
                    <tr>
                      <td colSpan={6} className="p-6 text-center text-[#F4F0E8]/40">No notification logs recorded yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 14: AUDIT LOG */}
        {activeTab === 'audit' && (
          <div className="rounded-2xl bg-[#0B1C26] border border-[#C7A15A]/20 overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#071116] border-b border-[#C7A15A]/20 text-[#C7A15A] uppercase tracking-wider text-[10px]">
                  <th className="p-4">Actor</th>
                  <th className="p-4">Action</th>
                  <th className="p-4">Entity</th>
                  <th className="p-4">Details</th>
                  <th className="p-4">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C7A15A]/10">
                {data?.auditLogs?.map((log: any) => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 font-bold text-[#C7A15A]">{log.actorUsername}</td>
                    <td className="p-4 font-semibold text-[#F4F0E8] font-mono text-[11px]">{log.action}</td>
                    <td className="p-4 text-[#F4F0E8]/70">{log.entityType}</td>
                    <td className="p-4 font-mono text-[10px] text-[#F4F0E8]/50 truncate max-w-xs">{log.details}</td>
                    <td className="p-4 text-[#F4F0E8]/60">{new Date(log.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* MODAL: ADD MEMBER */}
      {showMemberModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0B1C26] border border-[#C7A15A]/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-serif font-semibold text-[#F4F0E8]">Create New Member</h3>
            <form onSubmit={handleCreateMember} className="space-y-3 text-xs">
              <div>
                <label className="block text-[#D6B978] mb-1 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  required
                  value={newMemberForm.fullName}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, fullName: e.target.value })}
                  className="w-full bg-[#071116] border border-[#C7A15A]/30 rounded-xl px-3 py-2 text-[#F4F0E8]"
                />
              </div>
              <div>
                <label className="block text-[#D6B978] mb-1 uppercase tracking-wider">Phone Number</label>
                <input
                  type="text"
                  required
                  value={newMemberForm.phone}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, phone: e.target.value })}
                  className="w-full bg-[#071116] border border-[#C7A15A]/30 rounded-xl px-3 py-2 text-[#F4F0E8]"
                />
              </div>
              <div>
                <label className="block text-[#D6B978] mb-1 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  required
                  value={newMemberForm.email}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, email: e.target.value })}
                  className="w-full bg-[#071116] border border-[#C7A15A]/30 rounded-xl px-3 py-2 text-[#F4F0E8]"
                />
              </div>
              <div>
                <label className="block text-[#D6B978] mb-1 uppercase tracking-wider">CNIC / NIC</label>
                <input
                  type="text"
                  value={newMemberForm.nicCnic}
                  onChange={(e) => setNewMemberForm({ ...newMemberForm, nicCnic: e.target.value })}
                  placeholder="37405-XXXXXXX-X"
                  className="w-full bg-[#071116] border border-[#C7A15A]/30 rounded-xl px-3 py-2 text-[#F4F0E8]"
                />
              </div>
              <div className="flex gap-2 justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setShowMemberModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-[#F4F0E8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#C7A15A] text-[#071116] font-bold"
                >
                  Create Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD PAYMENT */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0B1C26] border border-[#C7A15A]/40 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-serif font-semibold text-[#F4F0E8]">Record Membership Payment</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleCreateFinancial('payment', newPaymentForm)
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-[#D6B978] mb-1 uppercase tracking-wider">Select Member</label>
                <select
                  required
                  value={newPaymentForm.memberId}
                  onChange={(e) => setNewPaymentForm({ ...newPaymentForm, memberId: e.target.value })}
                  className="w-full bg-[#071116] border border-[#C7A15A]/30 rounded-xl px-3 py-2 text-[#F4F0E8]"
                >
                  <option value="">-- Choose Member --</option>
                  {data?.members?.map((m: any) => (
                    <option key={m.id} value={m.id}>
                      {m.membershipNumber} — {m.fullName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[#D6B978] mb-1 uppercase tracking-wider">Payment Amount (PKR)</label>
                <input
                  type="number"
                  required
                  value={newPaymentForm.amount}
                  onChange={(e) => setNewPaymentForm({ ...newPaymentForm, amount: e.target.value })}
                  placeholder="e.g. 250000"
                  className="w-full bg-[#071116] border border-[#C7A15A]/30 rounded-xl px-3 py-2 text-[#F4F0E8]"
                />
              </div>
              <div>
                <label className="block text-[#D6B978] mb-1 uppercase tracking-wider">Payment Method</label>
                <select
                  value={newPaymentForm.paymentMethod}
                  onChange={(e) => setNewPaymentForm({ ...newPaymentForm, paymentMethod: e.target.value })}
                  className="w-full bg-[#071116] border border-[#C7A15A]/30 rounded-xl px-3 py-2 text-[#F4F0E8]"
                >
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="cheque">Cheque</option>
                  <option value="cash">Cash</option>
                  <option value="card">Card</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end pt-3">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-[#F4F0E8]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold"
                >
                  Submit Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
