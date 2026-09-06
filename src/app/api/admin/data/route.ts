import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const session = await verifyAdminSession()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    // 1. Members
    const members = await db.member.findMany({
      orderBy: { createdAt: 'desc' },
      include: { payments: true },
    })

    const totalMembers = members.length
    const activeMembers = members.filter((m: any) => m.membershipStatus === 'active').length

    let totalContractValue = 0
    let totalFeesReceived = 0

    const formattedMembers = members.map((m: any) => {
      totalContractValue += m.membershipFeeSnapshot
      const paid = m.payments.reduce((sum: number, p: any) => sum + (p.isReversed ? 0 : p.amount), 0)
      totalFeesReceived += paid
      const balance = Math.max(0, m.membershipFeeSnapshot - paid)

      return {
        id: m.id,
        membershipNumber: m.membershipNumber,
        fullName: m.fullName,
        phone: m.phone,
        email: m.email,
        address: m.address || '',
        nicCnicMasked: m.nicCnic ? `${m.nicCnic.substring(0, 5)}-*****${m.nicCnic.slice(-1)}` : 'N/A',
        nicCnicFull: m.nicCnic || 'N/A',
        membershipFee: m.membershipFeeSnapshot,
        feePaid: paid,
        balance,
        status: m.membershipStatus,
        joinedAt: m.joinedAt.toISOString().split('T')[0],
        crmSyncStatus: m.crmSyncStatus,
      }
    })

    const outstandingBalance = Math.max(0, totalContractValue - totalFeesReceived)

    // 2. Inquiries
    const inquiries = await db.membershipInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    })

    // 3. Payments
    const payments = await db.membershipPayment.findMany({
      orderBy: { paymentDate: 'desc' },
      include: { member: true },
    })

    // 4. Income
    const incomeEntries = await db.incomeEntry.findMany({
      orderBy: { date: 'desc' },
    })

    const otherIncomeTotal = incomeEntries.reduce((sum: number, i: any) => sum + i.amount, 0)
    const totalIncome = totalFeesReceived + otherIncomeTotal

    // 5. Expenses
    const expenses = await db.expense.findMany({
      orderBy: { date: 'desc' },
    })

    const totalExpenses = expenses.reduce((sum: number, e: any) => sum + e.amount, 0)
    const netResult = totalIncome - totalExpenses

    // 6. FAQs
    const faqs = await db.fAQ.findMany({
      orderBy: { sortOrder: 'asc' },
    })

    // 7. Notification Logs
    const notificationLogs = await db.notificationLog.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
    })

    // 8. CRM Sync Jobs
    const syncJobs = await db.crmSyncJob.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
    })

    // 9. Audit Logs
    const auditLogs = await db.auditLog.findMany({
      take: 20,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      success: true,
      currentUser: session,
      kpis: {
        totalMembers,
        activeMembers,
        totalContractValue,
        totalFeesReceived,
        outstandingBalance,
        otherIncomeTotal,
        totalIncome,
        totalExpenses,
        netResult,
      },
      members: formattedMembers,
      inquiries,
      payments,
      incomeEntries,
      expenses,
      faqs,
      notificationLogs,
      syncJobs,
      auditLogs,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch admin data' },
      { status: 500 }
    )
  }
}
