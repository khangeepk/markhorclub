import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth'
import { db } from '@/lib/db'

const COOKIE_NAME = 'markhor_admin_session'

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

    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully.',
    })

    // Clear cookie directly on response
    response.cookies.set(COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    })

    return response
  } catch (error: any) {
    const response = NextResponse.json({ success: true })
    response.cookies.set(COOKIE_NAME, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0,
    })
    return response
  }
}
