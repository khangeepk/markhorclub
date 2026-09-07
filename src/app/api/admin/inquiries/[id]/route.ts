import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth'
import { requirePermission } from '@/lib/rbac'
import { PERMISSIONS } from '@/lib/permissions'
import { db } from '@/lib/db'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await verifyAdminSession()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params
    const body = await request.json()
    const { status, membershipCategory, message } = body

    const existing = await db.membershipInquiry.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 })
    }

    const updateData: any = {}
    if (status) updateData.status = status
    if (membershipCategory) updateData.membershipCategory = membershipCategory
    if (message !== undefined) updateData.message = message

    const updated = await db.membershipInquiry.update({
      where: { id },
      data: updateData,
    })

    await db.auditLog.create({
      data: {
        actorUsername: session.username,
        action: 'INQUIRY_UPDATED',
        entityType: 'MembershipInquiry',
        entityId: id,
        details: JSON.stringify({ referenceNumber: existing.referenceNumber, changes: updateData }),
      },
    })

    return NextResponse.json({ success: true, inquiry: updated })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message }, { status: 500 })
  }
}

export async function DELETE(
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

    // Perform Soft Delete
    const updated = await db.membershipInquiry.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedBy: user.username,
      },
    })

    await db.auditLog.create({
      data: {
        actorUsername: user.username,
        action: 'INQUIRY_DELETED',
        entityType: 'MembershipInquiry',
        entityId: id,
        details: JSON.stringify({ referenceNumber: existing.referenceNumber, applicant: existing.fullName }),
      },
    })

    return NextResponse.json({
      success: true,
      message: `Inquiry ${existing.referenceNumber} has been archived/soft-deleted.`,
      inquiry: updated,
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 })
  }
}
