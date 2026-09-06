import { NextResponse } from 'next/server'
import { clearSessionCookie, verifyAdminSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST() {
  try {
    const session = await verifyAdminSession()
    if (session) {
      await db.auditLog.create({
        data: {
          actorUsername: session.username,
          action: 'logout',
          entityType: 'AdminUser',
          entityId: session.id,
        },
      }).catch(() => {})
    }

    clearSessionCookie()

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully.',
    })
  } catch (error: any) {
    clearSessionCookie()
    return NextResponse.json({ success: true })
  }
}
