import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requirePermission, isSuperAdmin } from '@/lib/rbac'
import { PERMISSIONS, ROLE_LABELS } from '@/lib/permissions'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { error } = await requirePermission(PERMISSIONS.USERS_READ)
  if (error) return error

  const user = await db.adminUser.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      username: true,
      fullName: true,
      email: true,
      phone: true,
      role: true,
      isActive: true,
      requiresPasswordChange: true,
      lastLoginAt: true,
      createdAt: true,
      profileImageUrl: true,
    },
  })

  if (!user) {
    return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 })
  }

  return NextResponse.json({ success: true, user })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { user: actor, error } = await requirePermission(PERMISSIONS.USERS_MANAGE)
  if (error) return error

  if (!isSuperAdmin(actor)) {
    return NextResponse.json(
      { success: false, error: 'Only Super Admins can modify users.' },
      { status: 403 }
    )
  }

  try {
    const body = await request.json()
    const { fullName, email, phone, role, isActive, permissions } = body

    const target = await db.adminUser.findUnique({ where: { id: params.id } })
    if (!target) {
      return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 })
    }

    // Prevent disabling/demoting the last active SUPER_ADMIN
    const isSelfDemoting =
      target.role === 'SUPER_ADMIN' && (role !== 'SUPER_ADMIN' || isActive === false)

    if (isSelfDemoting) {
      const activeSuperAdmins = await db.adminUser.count({
        where: { role: 'SUPER_ADMIN', isActive: true },
      })

      if (activeSuperAdmins <= 1) {
        return NextResponse.json(
          {
            success: false,
            error:
              'Cannot demote or disable the last active Super Admin. Create another Super Admin first.',
          },
          { status: 400 }
        )
      }
    }

    if (role && !Object.keys(ROLE_LABELS).includes(role)) {
      return NextResponse.json({ success: false, error: 'Invalid role.' }, { status: 400 })
    }

    const updateData: Record<string, any> = {}
    if (fullName !== undefined) updateData.fullName = fullName
    if (email !== undefined) updateData.email = email
    if (phone !== undefined) updateData.phone = phone || null
    if (role !== undefined) updateData.role = role
    if (typeof isActive === 'boolean') updateData.isActive = isActive
    if (permissions !== undefined)
      updateData.permissions = Array.isArray(permissions) ? JSON.stringify(permissions) : null

    const updated = await db.adminUser.update({
      where: { id: params.id },
      data: updateData,
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

    // Audit changes
    const changes: Record<string, any> = {}
    if (role !== undefined && role !== target.role) changes.role = { from: target.role, to: role }
    if (typeof isActive === 'boolean' && isActive !== target.isActive)
      changes.isActive = { from: target.isActive, to: isActive }

    await db.auditLog.create({
      data: {
        actorUsername: actor.username,
        action: 'user_updated',
        entityType: 'AdminUser',
        entityId: params.id,
        details: JSON.stringify({ changes, targetUsername: target.username }),
      },
    })

    return NextResponse.json({ success: true, user: updated })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
