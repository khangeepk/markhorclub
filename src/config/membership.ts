export interface MembershipConfig {
  phaseLabel: string
  feePkr: number
  feeFormatted: string
  currency: string
  qualifier: string
  contactEmail: string
  uanPhone: string
  websiteUrl: string
  lastUpdated: string
}

export const MEMBERSHIP_CONFIG: MembershipConfig = {
  phaseLabel: 'Pre-launch',
  feePkr: 500000,
  feeFormatted: 'PKR 500,000',
  currency: 'PKR',
  qualifier: 'Current pre-launch membership fee. Subject to revision.',
  contactEmail: 'info@markhourgroup.com',
  uanPhone: '0995-111-222-333',
  websiteUrl: 'www.markhourgroup.com',
  lastUpdated: '2026-09-05',
}
