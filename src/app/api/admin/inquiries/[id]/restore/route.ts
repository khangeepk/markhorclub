import { NextRequest, NextResponse } from 'next/server'
import { requirePermission } from '@/lib/rbac'
import { PERMISSIONS } from '@/lib/permissions'
import { db } from '@/lib/db'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { user, error } = await requirePermission(PERMISSIONS.INQUIRIES_DELETE)
    if (error) return error

    const { id } = params
    const existing = await db.membershipInquiry.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 })
    }

    const restored = await db.membershipInquiry.update({
      where: { id },
      data: {
        deletedAt: null,
        deletedBy: null,
      },
    })

    await db.auditLog.create({
      data: {
        actorUsername: user.username,
        action: 'INQUIRY_RESTORED',
        entityType: 'MembershipInquiry',
        entityId: id,
        details: JSON.stringify({ referenceNumber: existing.referenceNumber, applicant: existing.fullName }),
      },
    })

    return NextResponse.json({
      success: true,
      message: `Inquiry ${existing.referenceNumber} restored to active list.`,
      inquiry: restored,
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 })
  }
}
