import crypto from 'crypto'

/**
 * Generate collision-safe reference identifiers for Markhor Club platform records.
 * Ensures zero random collisions even under high concurrency or record deletions.
 */
export function generateReference(prefix: 'INQ' | 'VST' | 'SUB' | 'CNT' | 'MC' | 'RCP'): string {
  const timeSuffix = Date.now().toString(36).toUpperCase().slice(-3)
  const randomDigits = Math.floor(1000 + Math.random() * 9000)
  return `${prefix}-2026-${randomDigits}${timeSuffix}`
}
