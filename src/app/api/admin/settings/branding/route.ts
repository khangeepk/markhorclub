import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requirePermission } from '@/lib/rbac'
import { PERMISSIONS } from '@/lib/permissions'
import { verifyAdminSession } from '@/lib/auth'

const BRANDING_SETTING_KEYS = [
  'brand_logo_url',
  'brand_logo_dark_url',
  'brand_favicon_url',
  'brand_primary_color',
  'brand_secondary_color',
  'brand_header_slogan',
  'brand_footer_text',
]

export async function GET() {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

  const settings = await db.appSetting.findMany({
    where: { key: { in: BRANDING_SETTING_KEYS } },
  })

  const result: Record<string, string> = {
    brand_primary_color: '#C5A059',
    brand_secondary_color: '#111827',
    brand_header_slogan: 'The Pinnacle of Distinction',
    brand_footer_text: '© 2026 Markhor Club. All rights reserved.',
  }
  for (const s of settings) result[s.key] = s.value

  return NextResponse.json({ success: true, settings: result })
}

export async function PUT(request: NextRequest) {
  const { user, error } = await requirePermission(PERMISSIONS.SETTINGS_MANAGE)
  if (error) return error

  try {
    const body = await request.json()

    const allowed: Record<string, string> = {}
    for (const key of BRANDING_SETTING_KEYS) {
      if (typeof body[key] === 'string') {
        allowed[key] = body[key].trim()
      }
    }

    for (const [key, value] of Object.entries(allowed)) {
      await db.appSetting.upsert({
        where: { key },
        update: { value },
        create: { key, value, description: key.replace('brand_', '').replace('_', ' ') },
      })
    }

    await db.auditLog.create({
      data: {
        actorUsername: user.username,
        action: 'branding_updated',
        entityType: 'Settings',
        details: JSON.stringify({ keys: Object.keys(allowed) }),
      },
    })

    return NextResponse.json({ success: true, message: 'Branding settings updated.' })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
