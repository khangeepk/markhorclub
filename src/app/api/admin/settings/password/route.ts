import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdminSession, hashPassword, verifyPassword } from '@/lib/auth'

const MIN_LENGTH = 8

function isStrongPassword(pwd: string): string | null {
  if (pwd.length < MIN_LENGTH) return `Password must be at least ${MIN_LENGTH} characters.`
  if (!/[A-Z]/.test(pwd)) return 'Password must contain at least one uppercase letter.'
  if (!/[a-z]/.test(pwd)) return 'Password must contain at least one lowercase letter.'
  if (!/[0-9]/.test(pwd)) return 'Password must contain at least one number.'
  if (!/[^A-Za-z0-9]/.test(pwd)) return 'Password must contain at least one special character.'
  return null
}

export async function POST(request: NextRequest) {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const { currentPassword, newPassword, confirmPassword } = await request.json()

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'All fields are required.' },
        { status: 400 }
      )
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { success: false, error: 'New passwords do not match.' },
        { status: 400 }
      )
    }

    const strengthError = isStrongPassword(newPassword)
    if (strengthError) {
      return NextResponse.json({ success: false, error: strengthError }, { status: 400 })
    }

    const user = await db.adminUser.findUnique({ where: { id: session.id } })
    if (!user) {
      return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 })
    }

    const valid = await verifyPassword(currentPassword, user.passwordHash)
    if (!valid) {
      return NextResponse.json(
        { success: false, error: 'Current password is incorrect.' },
        { status: 401 }
      )
    }

    const newHash = await hashPassword(newPassword)

    await db.adminUser.update({
      where: { id: session.id },
      data: { passwordHash: newHash, requiresPasswordChange: false },
    })

    // Audit log — never log password content
    await db.auditLog.create({
      data: {
        actorUsername: session.username,
        action: 'PASSWORD_CHANGED',
        entityType: 'AdminUser',
        entityId: session.id,
        details: JSON.stringify({ note: 'Self-service password change' }),
      },
    })

    return NextResponse.json({ success: true, message: 'Password changed successfully.' })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
