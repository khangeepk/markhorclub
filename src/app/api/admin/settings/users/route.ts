import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requirePermission, isSuperAdmin } from '@/lib/rbac'
import { PERMISSIONS } from '@/lib/permissions'
import { hashPassword } from '@/lib/auth'
import { ROLE_LABELS } from '@/lib/permissions'

function generateTempPassword(): string {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789@#$!'
  return Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export async function GET() {
  const { user, error } = await requirePermission(PERMISSIONS.USERS_READ)
  if (error) return error

  const users = await db.adminUser.findMany({
    select: {
      id: true,
      username: true,
      fullName: true,
      email: true,
      phone: true,
      role: true,
      isActive: true,
      lastLoginAt: true,
      createdAt: true,
      requiresPasswordChange: true,
      profileImageUrl: true,
      // Never select passwordHash or permissions raw
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json({ success: true, users })
}

export async function POST(request: NextRequest) {
  const { user: actor, error } = await requirePermission(PERMISSIONS.USERS_MANAGE)
  if (error) return error

  // Only SUPER_ADMIN can create users
  if (!isSuperAdmin(actor)) {
    return NextResponse.json(
      { success: false, error: 'Only Super Admins can create new users.' },
      { status: 403 }
    )
  }

  try {
    const body = await request.json()
    const { fullName, username, email, phone, role, tempPassword } = body

    if (!fullName || !username || !email || !role) {
      return NextResponse.json(
        { success: false, error: 'Full name, username, email, and role are required.' },
        { status: 400 }
      )
    }

    if (!Object.keys(ROLE_LABELS).includes(role)) {
      return NextResponse.json({ success: false, error: 'Invalid role.' }, { status: 400 })
    }

    const existing = await db.adminUser.findUnique({ where: { username } })
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Username already exists.' },
        { status: 409 }
      )
    }

    const pwd = tempPassword || generateTempPassword()
    const passwordHash = await hashPassword(pwd)

    const newUser = await db.adminUser.create({
      data: {
        username,
        passwordHash,
        fullName,
        email,
        phone: phone || null,
        role,
        isActive: true,
        requiresPasswordChange: true,
      },
      select: {
        id: true,
        username: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    })

    await db.auditLog.create({
      data: {
        actorUsername: actor.username,
        action: 'user_created',
        entityType: 'AdminUser',
        entityId: newUser.id,
        details: JSON.stringify({ username: newUser.username, role: newUser.role }),
      },
    })

    return NextResponse.json({
      success: true,
      user: newUser,
      temporaryPassword: pwd, // Returned once only — admin must relay securely
      message: 'User created. Share the temporary password securely.',
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
