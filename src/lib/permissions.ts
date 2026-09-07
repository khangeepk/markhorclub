/**
 * Markhor Club — Permissions Catalog
 * Server-side RBAC permission strings.
 * Never expose raw permission checks to client-only code.
 */

export const PERMISSIONS = {
  // Member management
  MEMBERS_READ: 'members.read',
  MEMBERS_WRITE: 'members.write',

  // Payment management
  PAYMENTS_READ: 'payments.read',
  PAYMENTS_VERIFY: 'payments.verify',
  PAYMENTS_REVERSE: 'payments.reverse',

  // Income
  INCOME_READ: 'income.read',
  INCOME_WRITE: 'income.write',

  // Expenses
  EXPENSES_READ: 'expenses.read',
  EXPENSES_WRITE: 'expenses.write',

  // Reports
  REPORTS_READ: 'reports.read',

  // Notifications
  NOTIFICATIONS_SEND: 'notifications.send',

  // CRM
  CRM_READ: 'crm.read',
  CRM_WRITE: 'crm.write',

  // Live chat
  CHAT_REPLY: 'chat.reply',

  // Inquiries management
  INQUIRIES_READ: 'inquiries.read',
  INQUIRIES_DELETE: 'inquiries.delete',

  // User management
  USERS_READ: 'users.read',
  USERS_MANAGE: 'users.manage',

  // Settings
  SETTINGS_READ: 'settings.read',
  SETTINGS_MANAGE: 'settings.manage',

  // Audit log
  AUDIT_READ: 'audit.read',
} as const

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS]

/**
 * Default permission set per role.
 * SUPER_ADMIN implicitly has ALL permissions regardless of this map.
 */
export const ROLE_PERMISSIONS: Record<string, Permission[]> = {
  SUPER_ADMIN: Object.values(PERMISSIONS),

  ADMIN: [
    PERMISSIONS.MEMBERS_READ,
    PERMISSIONS.MEMBERS_WRITE,
    PERMISSIONS.PAYMENTS_READ,
    PERMISSIONS.PAYMENTS_VERIFY,
    PERMISSIONS.INCOME_READ,
    PERMISSIONS.INCOME_WRITE,
    PERMISSIONS.EXPENSES_READ,
    PERMISSIONS.EXPENSES_WRITE,
    PERMISSIONS.REPORTS_READ,
    PERMISSIONS.NOTIFICATIONS_SEND,
    PERMISSIONS.CRM_READ,
    PERMISSIONS.CRM_WRITE,
    PERMISSIONS.CHAT_REPLY,
    PERMISSIONS.INQUIRIES_READ,
    PERMISSIONS.INQUIRIES_DELETE,
    PERMISSIONS.USERS_READ,
    PERMISSIONS.SETTINGS_READ,
    PERMISSIONS.AUDIT_READ,
  ],

  FINANCE_MANAGER: [
    PERMISSIONS.PAYMENTS_READ,
    PERMISSIONS.PAYMENTS_VERIFY,
    PERMISSIONS.PAYMENTS_REVERSE,
    PERMISSIONS.INCOME_READ,
    PERMISSIONS.INCOME_WRITE,
    PERMISSIONS.EXPENSES_READ,
    PERMISSIONS.EXPENSES_WRITE,
    PERMISSIONS.REPORTS_READ,
    PERMISSIONS.MEMBERS_READ,
    PERMISSIONS.SETTINGS_READ,
  ],

  MEMBERSHIP_MANAGER: [
    PERMISSIONS.MEMBERS_READ,
    PERMISSIONS.MEMBERS_WRITE,
    PERMISSIONS.PAYMENTS_READ,
    PERMISSIONS.CRM_READ,
    PERMISSIONS.CRM_WRITE,
    PERMISSIONS.INQUIRIES_READ,
    PERMISSIONS.INQUIRIES_DELETE,
    PERMISSIONS.NOTIFICATIONS_SEND,
    PERMISSIONS.REPORTS_READ,
  ],

  CSR_AGENT: [
    PERMISSIONS.MEMBERS_READ,
    PERMISSIONS.CHAT_REPLY,
    PERMISSIONS.CRM_READ,
    PERMISSIONS.INQUIRIES_READ,
    PERMISSIONS.NOTIFICATIONS_SEND,
  ],

  VIEW_ONLY: [
    PERMISSIONS.MEMBERS_READ,
    PERMISSIONS.PAYMENTS_READ,
    PERMISSIONS.INCOME_READ,
    PERMISSIONS.EXPENSES_READ,
    PERMISSIONS.REPORTS_READ,
    PERMISSIONS.INQUIRIES_READ,
  ],
}

export const ALL_ROLES = [
  'SUPER_ADMIN',
  'ADMIN',
  'FINANCE_MANAGER',
  'MEMBERSHIP_MANAGER',
  'CSR_AGENT',
  'VIEW_ONLY',
] as const

export type AdminRole = (typeof ALL_ROLES)[number]

export const ROLE_LABELS: Record<string, string> = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Admin',
  FINANCE_MANAGER: 'Finance Manager',
  MEMBERSHIP_MANAGER: 'Membership Manager',
  CSR_AGENT: 'CSR Agent',
  VIEW_ONLY: 'View Only',
}
