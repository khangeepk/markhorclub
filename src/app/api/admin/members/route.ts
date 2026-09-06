import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const session = await verifyAdminSession()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { action, fullName, phone, email, address, nicCnic, membershipFee, inquiryId } = body

    if (action === 'convert_inquiry' && inquiryId) {
      const inquiry = await db.membershipInquiry.findUnique({ where: { id: inquiryId } })
      if (!inquiry) return NextResponse.json({ success: false, error: 'Inquiry not found' }, { status: 404 })

      const count = await db.member.count()
      const membershipNumber = `MC-2026-${String(count + 1).padStart(4, '0')}`

      const member = await db.member.create({
        data: {
          membershipNumber,
          fullName: inquiry.fullName,
          phone: inquiry.phone,
          email: inquiry.email,
          membershipFeeSnapshot: inquiry.membershipFeeSnapshotPkr || 500000,
          membershipStatus: 'active',
          crmContactId: inquiry.crmContactId,
          crmOpportunityId: inquiry.crmOpportunityId,
          crmSyncStatus: inquiry.crmSyncStatus,
        },
      })

      await db.membershipInquiry.update({
        where: { id: inquiryId },
        data: { status: 'converted' },
      })

      await db.auditLog.create({
        data: {
          actorUsername: session.username,
          action: 'convert_inquiry_to_member',
          entityType: 'Member',
          entityId: member.id,
          details: JSON.stringify({ membershipNumber, inquiryId }),
        },
      })

      return NextResponse.json({ success: true, member })
    }

    if (!fullName || !phone || !email) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 })
    }

    const count = await db.member.count()
    const membershipNumber = `MC-2026-${String(count + 1).padStart(4, '0')}`

    const newMember = await db.member.create({
      data: {
        membershipNumber,
        fullName: fullName.trim(),
        phone: String(phone).trim(),
        email: email.trim().toLowerCase(),
        address: address ? address.trim() : null,
        nicCnic: nicCnic ? nicCnic.trim() : null,
        membershipFeeSnapshot: membershipFee ? Number(membershipFee) : 500000,
        membershipStatus: 'active',
      },
    })

    await db.auditLog.create({
      data: {
        actorUsername: session.username,
        action: 'create_member',
        entityType: 'Member',
        entityId: newMember.id,
        details: JSON.stringify({ membershipNumber }),
      },
    })

    return NextResponse.json({ success: true, member: newMember })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Member action failed' }, { status: 500 })
  }
}
