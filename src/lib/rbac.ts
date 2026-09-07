/**
 * Markhor Club — RBAC Engine
 * Server-side only. Import only from API routes or Server Components.
 */
import { PERMISSIONS, ROLE_PERMISSIONS, Permission } from './permissions'
import { verifyAdminSession, SessionUser } from './auth'
import { NextResponse } from 'next/server'

export function normalizeRole(role?: string): string {
  if (!role) return 'VIEW_ONLY'
  const cleaned = role.toUpperCase().replace(/[\s_-]/g, '')
  if (cleaned === 'SUPERADMIN') return 'SUPER_ADMIN'
  if (cleaned === 'ADMIN') return 'ADMIN'
  if (cleaned === 'FINANCEMANAGER' || cleaned === 'FINANCE') return 'FINANCE_MANAGER'
  if (cleaned === 'MEMBERSHIPMANAGER' || cleaned === 'MEMBERSHIP') return 'MEMBERSHIP_MANAGER'
  if (cleaned === 'CSRAGENT' || cleaned === 'CSR') return 'CSR_AGENT'
  return 'VIEW_ONLY'
}

/**
 * Check if a user session has a specific permission.
 * SUPER_ADMIN always returns true.
 */
export function hasPermission(user: SessionUser, permission: Permission): boolean {
  const role = normalizeRole(user.role)
  if (role === 'SUPER_ADMIN') return true

  const rolePerms = ROLE_PERMISSIONS[role] ?? []

  // Also check extra granular permissions stored on the user
  const extraPerms: Permission[] = []
  if ('permissions' in user && user.permissions) {
    try {
      const parsed = JSON.parse(user.permissions as string)
      if (Array.isArray(parsed)) extraPerms.push(...parsed)
    } catch {
      // ignore malformed
    }
  }

  return rolePerms.includes(permission) || extraPerms.includes(permission)
}

/**
 * Check if a user has ANY of the listed permissions.
 */
export function hasAnyPermission(user: SessionUser, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(user, p))
}

/**
 * Check if a user has ALL of the listed permissions.
 */
export function hasAllPermissions(user: SessionUser, permissions: Permission[]): boolean {
  return permissions.every((p) => hasPermission(user, p))
}

/**
 * Route Handler guard: validates session and required permission.
 * Returns { user, error } — if error is set, return it immediately.
 */
export async function requirePermission(
  permission: Permission
): Promise<{ user: SessionUser; error: null } | { user: null; error: NextResponse }> {
  const session = await verifyAdminSession()

  if (!session) {
    return {
      user: null,
      error: NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 }),
    }
  }

  if (!hasPermission(session, permission)) {
    return {
      user: null,
      error: NextResponse.json(
        { success: false, error: 'Forbidden: insufficient permissions' },
        { status: 403 }
      ),
    }
  }

  return { user: session, error: null }
}

/**
 * Check if a user is SUPER_ADMIN
 */
export function isSuperAdmin(user: SessionUser): boolean {
  return normalizeRole(user.role) === 'SUPER_ADMIN'
}

/**
 * Get the effective permissions list for sidebar/UI visibility hints.
 * These are only hints — real enforcement must happen server-side.
 */
export function getEffectivePermissions(user: SessionUser): Permission[] {
  const role = normalizeRole(user.role)
  if (role === 'SUPER_ADMIN') return Object.values(PERMISSIONS)

  const rolePerms = [...(ROLE_PERMISSIONS[role] ?? [])]

  if ('permissions' in user && user.permissions) {
    try {
      const extra = JSON.parse(user.permissions as string)
      if (Array.isArray(extra)) {
        for (const p of extra) {
          if (!rolePerms.includes(p)) rolePerms.push(p)
        }
      }
    } catch {
      // ignore
    }
  }

  return rolePerms
}

