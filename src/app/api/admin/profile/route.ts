import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { verifyAdminSession } from '@/lib/auth'

export async function GET() {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const user = await db.adminUser.findUnique({
    where: { id: session.id },
    select: {
      id: true,
      username: true,
      fullName: true,
      email: true,
      phone: true,
      role: true,
      profileImageUrl: true,
    },
  })

  if (!user) return NextResponse.json({ success: false, error: 'User not found.' }, { status: 404 })

  return NextResponse.json({ success: true, user })
}

export async function PUT(request: NextRequest) {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  try {
    const body = await request.json()
    const { fullName, email, phone } = body

    // Never allow self-role escalation
    const updateData: Record<string, any> = {}
    if (fullName?.trim()) updateData.fullName = fullName.trim()
    if (email?.trim()) updateData.email = email.trim()
    if (phone !== undefined) updateData.phone = phone?.trim() || null

    const updated = await db.adminUser.update({
      where: { id: session.id },
      data: updateData,
      select: {
        id: true,
        username: true,
        fullName: true,
        email: true,
        phone: true,
        role: true,
      },
    })

    await db.auditLog.create({
      data: {
        actorUsername: session.username,
        action: 'profile_updated',
        entityType: 'AdminUser',
        entityId: session.id,
        details: JSON.stringify({ fields: Object.keys(updateData) }),
      },
    })

    return NextResponse.json({ success: true, user: updated })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
