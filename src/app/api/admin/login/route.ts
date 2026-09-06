import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSessionToken, setSessionCookie, verifyPassword } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Please enter both username and password.' },
        { status: 400 }
      )
    }

    const user = await db.adminUser.findUnique({
      where: { username: username.trim() },
    })

    if (!user || !user.isActive) {
      // Record failed attempt audit
      await db.auditLog.create({
        data: {
          actorUsername: username || 'unknown',
          action: 'login_failed',
          entityType: 'AdminUser',
          details: JSON.stringify({ reason: 'Invalid username or inactive user' }),
        },
      }).catch(() => {})

      return NextResponse.json(
        { success: false, error: 'Invalid credentials.' },
        { status: 401 }
      )
    }

    const isValid = await verifyPassword(password, user.passwordHash)

    if (!isValid) {
      await db.auditLog.create({
        data: {
          actorUsername: username,
          action: 'login_failed',
          entityType: 'AdminUser',
          details: JSON.stringify({ reason: 'Invalid password' }),
        },
      }).catch(() => {})

      return NextResponse.json(
        { success: false, error: 'Invalid credentials.' },
        { status: 401 }
      )
    }

    // Update last login
    await db.adminUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    })

    // Create session token and set HTTP-only cookie
    const token = createSessionToken({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    })

    setSessionCookie(token)

    // Log audit
    await db.auditLog.create({
      data: {
        actorUsername: user.username,
        action: 'login_success',
        entityType: 'AdminUser',
        entityId: user.id,
        details: JSON.stringify({ role: user.role }),
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Login successful.',
      user: {
        username: user.username,
        fullName: user.fullName,
        role: user.role,
      },
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Authentication error.' },
      { status: 500 }
    )
  }
}
