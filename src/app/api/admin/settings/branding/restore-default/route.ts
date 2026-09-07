import { NextRequest, NextResponse } from 'next/server'
import { requirePermission } from '@/lib/rbac'
import { PERMISSIONS } from '@/lib/permissions'
import { db } from '@/lib/db'

const DEFAULT_LOGOS: Record<string, string> = {
  brand_logo_url: '/assets/logos/markhor-logo-gold.png',
  brand_emblem_url: '/assets/logos/markhor-logo-gold.png',
  brand_login_logo_url: '/assets/logos/markhor-logo-gold.png',
}

export async function POST(request: NextRequest) {
  const { user, error } = await requirePermission(PERMISSIONS.SETTINGS_MANAGE)
  if (error) return error

  try {
    const body = await request.json()
    const { targetKey } = body

    if (!targetKey || !DEFAULT_LOGOS[targetKey]) {
      return NextResponse.json(
        { success: false, error: 'Invalid target key specified.' },
        { status: 400 }
      )
    }

    const defaultUrl = DEFAULT_LOGOS[targetKey]

    await db.appSetting.upsert({
      where: { key: targetKey },
      update: { value: defaultUrl },
      create: { key: targetKey, value: defaultUrl, description: `Default logo asset for ${targetKey}` },
    })

    await db.auditLog.create({
      data: {
        actorUsername: user.username,
        action: 'BRANDING_LOGO_RESTORED',
        entityType: 'Settings',
        details: JSON.stringify({ targetKey, restoredUrl: defaultUrl }),
      },
    })

    return NextResponse.json({
      success: true,
      url: defaultUrl,
      targetKey,
      message: 'Restored to official default bundled logo asset.',
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 })
  }
}
