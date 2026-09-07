import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requirePermission, isSuperAdmin } from '@/lib/rbac'
import { PERMISSIONS } from '@/lib/permissions'
import { hashPassword } from '@/lib/auth'

function generateTempPassword(): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#$!'
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user: actor, error } = await requirePermission(PERMISSIONS.USERS_MANAGE)
  if (error) return error

  if (!isSuperAdmin(actor)) {
    return NextResponse.json(
      { success: false, error: 'Only Super Admins can reset passwords.' },
      { status: 403 }
    )
  }

  try {
    const body = await request.json().catch(() => ({}))
    const tempPassword = body.tempPassword || generateTempPassword()

    const target = await db.adminUser.findUnique({ where: { id: params.id } })
    if (!target) {
      return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 })
    }

    // Cannot reset own password via this endpoint (use change-password)
    if (target.id === actor.id) {
      return NextResponse.json(
        { success: false, error: 'Use the Change Password form to update your own password.' },
        { status: 400 }
      )
    }

    const passwordHash = await hashPassword(tempPassword)

    await db.adminUser.update({
      where: { id: params.id },
      data: { passwordHash, requiresPasswordChange: true },
    })

    await db.auditLog.create({
      data: {
        actorUsername: actor.username,
        action: 'PASSWORD_RESET_BY_ADMIN',
        entityType: 'AdminUser',
        entityId: params.id,
        details: JSON.stringify({ targetUsername: target.username }),
      },
    })

    return NextResponse.json({
      success: true,
      temporaryPassword: tempPassword,
      message: 'Password reset. Share the temporary password securely with the user.',
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
