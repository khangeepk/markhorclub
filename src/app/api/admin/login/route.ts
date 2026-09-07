import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { createSessionToken, verifyPassword } from '@/lib/auth'

// In-memory rate limiting map for admin login (IP/key -> { count, resetAt })
const loginAttempts = new Map<string, { count: number; resetAt: number }>()
const MAX_FAILED_ATTEMPTS = 5
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes

function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || '127.0.0.1'
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request)
    const now = Date.now()

    // Check rate limit status for IP
    const record = loginAttempts.get(ip)
    if (record) {
      if (now > record.resetAt) {
        loginAttempts.delete(ip)
      } else if (record.count >= MAX_FAILED_ATTEMPTS) {
        const remainingSecs = Math.ceil((record.resetAt - now) / 1000)
        return NextResponse.json(
          {
            success: false,
            error: `Too many failed login attempts. Please try again in ${remainingSecs} seconds.`,
          },
          { status: 429 }
        )
      }
    }

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

    function recordFailure() {
      const cur = loginAttempts.get(ip)
      if (cur) {
        cur.count += 1
      } else {
        loginAttempts.set(ip, { count: 1, resetAt: Date.now() + LOCKOUT_WINDOW_MS })
      }
    }

    if (!user || !user.isActive) {
      recordFailure()
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
      recordFailure()
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

    // Success -> Clear failed attempts for IP
    loginAttempts.delete(ip)

    // Update last login
    await db.adminUser.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    })

    // Create session token and set HTTP-only cookie on the response
    const token = createSessionToken({
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    })

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

    const response = NextResponse.json({
      success: true,
      message: 'Login successful.',
      user: {
        username: user.username,
        fullName: user.fullName,
        role: user.role,
      },
    })

    // Set cookie directly on response (cookies().set() silently fails in Route Handlers)
    response.cookies.set('markhor_admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 12 * 60 * 60, // 12 hours
    })

    return response
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Authentication error.' },
      { status: 500 }
    )
  }
}
