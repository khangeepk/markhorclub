import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requirePermission } from '@/lib/rbac'
import { PERMISSIONS } from '@/lib/permissions'
import { verifyAdminSession } from '@/lib/auth'

export async function GET() {
  const { user, error } = await requirePermission(PERMISSIONS.SETTINGS_READ)
  if (error) return error

  const accounts = await db.paymentAccount.findMany({
    orderBy: { createdAt: 'asc' },
  })

  // Mask account numbers in list view
  const masked = accounts.map((a) => ({
    ...a,
    accountNumberMasked:
      a.accountNumber.length > 4
        ? '••••' + a.accountNumber.slice(-4)
        : a.accountNumber,
  }))

  return NextResponse.json({ success: true, accounts: masked, rawAccounts: accounts })
}

export async function POST(request: NextRequest) {
  const { user: actor, error } = await requirePermission(PERMISSIONS.SETTINGS_MANAGE)
  if (error) return error

  try {
    const body = await request.json()
    const {
      provider,
      accountTitle,
      accountNumber,
      iban,
      branch,
      currency,
      isActive,
      displayOnPublicPage,
      verificationMode,
      description,
    } = body

    if (!provider || !accountTitle || !accountNumber) {
      return NextResponse.json(
        { success: false, error: 'Provider, account title, and account number are required.' },
        { status: 400 }
      )
    }

    const account = await db.paymentAccount.create({
      data: {
        provider,
        accountTitle,
        accountNumber,
        iban: iban || null,
        branch: branch || null,
        currency: currency || 'PKR',
        isActive: isActive !== false,
        displayOnPublicPage: displayOnPublicPage === true,
        verificationMode: verificationMode || 'MANUAL',
        description: description || null,
        createdBy: actor.username,
      },
    })

    await db.auditLog.create({
      data: {
        actorUsername: actor.username,
        action: 'payment_account_created',
        entityType: 'PaymentAccount',
        entityId: account.id,
        details: JSON.stringify({ provider, accountTitle }),
      },
    })

    return NextResponse.json({ success: true, account })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
