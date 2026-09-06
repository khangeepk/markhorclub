import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const session = await verifyAdminSession()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { type } = body

    // 1. Record Membership Payment
    if (type === 'payment') {
      const { memberId, amount, paymentMethod, reference, remarks } = body
      if (!memberId || !amount || Number(amount) <= 0) {
        return NextResponse.json({ success: false, error: 'Member ID and valid amount required' }, { status: 400 })
      }

      const receiptCount = await db.membershipPayment.count()
      const receiptNumber = `RCP-2026-${String(receiptCount + 1).padStart(4, '0')}`

      const payment = await db.membershipPayment.create({
        data: {
          memberId,
          amount: Number(amount),
          paymentMethod: paymentMethod || 'bank_transfer',
          reference: reference || null,
          receiptNumber,
          remarks: remarks || null,
          createdBy: session.username,
        },
      })

      await db.auditLog.create({
        data: {
          actorUsername: session.username,
          action: 'record_payment',
          entityType: 'MembershipPayment',
          entityId: payment.id,
          details: JSON.stringify({ memberId, amount, receiptNumber }),
        },
      })

      return NextResponse.json({ success: true, payment })
    }

    // 2. Record Income
    if (type === 'income') {
      const { category, description, amount, paymentMethod, reference, remarks } = body
      if (!description || !amount || Number(amount) <= 0) {
        return NextResponse.json({ success: false, error: 'Description and valid amount required' }, { status: 400 })
      }

      const income = await db.incomeEntry.create({
        data: {
          category: category || 'Other',
          description,
          amount: Number(amount),
          paymentMethod: paymentMethod || 'bank_transfer',
          reference: reference || null,
          remarks: remarks || null,
          createdBy: session.username,
        },
      })

      await db.auditLog.create({
        data: {
          actorUsername: session.username,
          action: 'record_income',
          entityType: 'IncomeEntry',
          entityId: income.id,
          details: JSON.stringify({ amount, category }),
        },
      })

      return NextResponse.json({ success: true, income })
    }

    // 3. Record Expense
    if (type === 'expense') {
      const { category, vendorPayee, description, amount, paymentMethod, reference, remarks } = body
      if (!description || !amount || Number(amount) <= 0) {
        return NextResponse.json({ success: false, error: 'Description and valid amount required' }, { status: 400 })
      }

      const expense = await db.expense.create({
        data: {
          category: category || 'Operations',
          vendorPayee: vendorPayee || 'General Vendor',
          description,
          amount: Number(amount),
          paymentMethod: paymentMethod || 'bank_transfer',
          reference: reference || null,
          remarks: remarks || null,
          createdBy: session.username,
        },
      })

      await db.auditLog.create({
        data: {
          actorUsername: session.username,
          action: 'record_expense',
          entityType: 'Expense',
          entityId: expense.id,
          details: JSON.stringify({ amount, category, vendorPayee }),
        },
      })

      return NextResponse.json({ success: true, expense })
    }

    return NextResponse.json({ success: false, error: 'Invalid financial type' }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Financial action failed' }, { status: 500 })
  }
}
