import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requirePermission } from '@/lib/rbac'
import { PERMISSIONS } from '@/lib/permissions'
import { verifyAdminSession } from '@/lib/auth'

const CLUB_SETTING_KEYS = [
  'club_name',
  'club_email',
  'club_phone',
  'club_website',
  'club_address',
  'club_currency',
  'club_default_fee',
]

export async function GET() {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const settings = await db.appSetting.findMany({
    where: { key: { in: CLUB_SETTING_KEYS } },
  })

  const result: Record<string, string> = {}
  for (const s of settings) result[s.key] = s.value

  return NextResponse.json({ success: true, settings: result })
}

export async function PUT(request: NextRequest) {
  const { user, error } = await requirePermission(PERMISSIONS.SETTINGS_MANAGE)
  if (error) return error

  try {
    const body = await request.json()

    const allowed: Record<string, string> = {}
    for (const key of CLUB_SETTING_KEYS) {
      if (typeof body[key] === 'string' && body[key].trim() !== '') {
        allowed[key] = body[key].trim()
      }
    }

    for (const [key, value] of Object.entries(allowed)) {
      await db.appSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value, description: key.replace('club_', '').replace('_', ' ') },
      })
    }

    await db.auditLog.create({
      data: {
        actorUsername: user.username,
        action: 'settings_updated',
        entityType: 'Settings',
        details: JSON.stringify({ keys: Object.keys(allowed) }),
      },
    })

    return NextResponse.json({ success: true, message: 'Club profile updated.' })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
