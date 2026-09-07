import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requirePermission } from '@/lib/rbac'
import { PERMISSIONS } from '@/lib/permissions'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const existing = await db.paymentAccount.findUnique({ where: { id: params.id } })
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Payment account not found.' }, { status: 404 })
    }

    const updated = await db.paymentAccount.update({
      where: { id: params.id },
      data: {
        ...(provider !== undefined && { provider }),
        ...(accountTitle !== undefined && { accountTitle }),
        ...(accountNumber !== undefined && { accountNumber }),
        ...(iban !== undefined && { iban: iban || null }),
        ...(branch !== undefined && { branch: branch || null }),
        ...(currency !== undefined && { currency }),
        ...(typeof isActive === 'boolean' && { isActive }),
        ...(typeof displayOnPublicPage === 'boolean' && { displayOnPublicPage }),
        ...(verificationMode !== undefined && { verificationMode }),
        ...(description !== undefined && { description: description || null }),
      },
    })

    await db.auditLog.create({
      data: {
        actorUsername: actor.username,
        action: 'payment_account_updated',
        entityType: 'PaymentAccount',
        entityId: params.id,
        details: JSON.stringify({ provider: updated.provider, accountTitle: updated.accountTitle }),
      },
    })

    return NextResponse.json({ success: true, account: updated })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user: actor, error } = await requirePermission(PERMISSIONS.SETTINGS_MANAGE)
  if (error) return error

  try {
    const existing = await db.paymentAccount.findUnique({ where: { id: params.id } })
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Payment account not found.' }, { status: 404 })
    }

    // Soft delete — deactivate instead of hard delete
    await db.paymentAccount.update({
      where: { id: params.id },
      data: { isActive: false, displayOnPublicPage: false },
    })

    await db.auditLog.create({
      data: {
        actorUsername: actor.username,
        action: 'payment_account_deactivated',
        entityType: 'PaymentAccount',
        entityId: params.id,
        details: JSON.stringify({ provider: existing.provider }),
      },
    })

    return NextResponse.json({ success: true, message: 'Payment account deactivated.' })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
