import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { db } from './db'

const JWT_SECRET = process.env.JWT_SECRET || 'markhor_club_admin_secret_key_2026'
const COOKIE_NAME = 'markhor_admin_session'

export interface SessionUser {
  id: string
  username: string
  fullName: string
  email: string
  phone?: string | null
  role: string
  permissions?: string | null // JSON array of extra granular permissions
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function createSessionToken(user: SessionUser): string {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: '12h' }
  )
}

export async function verifyAdminSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get(COOKIE_NAME)?.value

    if (!token) return null

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string; username: string }
    if (!decoded || !decoded.username) return null

    const user = await db.adminUser.findUnique({
      where: { username: decoded.username },
    })

    if (!user || !user.isActive) return null

    return {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone ?? null,
      role: user.role,
      permissions: user.permissions ?? null,
    }
  } catch {
    return null
  }
}

export function setSessionCookie(token: string) {
  const cookieStore = cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 12 * 60 * 60, // 12 hours
  })
}

export function clearSessionCookie() {
  const cookieStore = cookies()
  cookieStore.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
}
