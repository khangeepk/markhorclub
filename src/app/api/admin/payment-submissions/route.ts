import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import crypto from 'crypto'
import { requirePermission } from '@/lib/rbac'
import { PERMISSIONS } from '@/lib/permissions'

export async function GET(request: Request) {
  try {
    const { user, error } = await requirePermission(PERMISSIONS.PAYMENTS_READ)
    if (error) return error

    const { searchParams } = new URL(request.url)
    const statusFilter = searchParams.get('status')

    const where: any = {}
    if (statusFilter && statusFilter !== 'all') {
      where.verificationStatus = statusFilter
    }

    const submissions = await db.paymentSubmission.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ success: true, submissions })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { user, error } = await requirePermission(PERMISSIONS.PAYMENTS_VERIFY)
    if (error) return error

    const body = await request.json()
    const { id, action, verifiedAmount, remarks } = body

    if (!id || !action) {
      return NextResponse.json({ success: false, error: 'Missing submission ID or action.' }, { status: 400 })
    }

    const submission = await db.paymentSubmission.findUnique({ where: { id } })
    if (!submission) {
      return NextResponse.json({ success: false, error: 'Payment submission not found.' }, { status: 404 })
    }

    if (action === 'verify') {
      if (submission.verificationStatus === 'MANUALLY_VERIFIED' || submission.verificationStatus === 'AUTO_VERIFIED') {
        return NextResponse.json({ success: false, error: 'Submission has already been verified.' }, { status: 400 })
      }

      const finalVerifiedAmount = verifiedAmount ? parseFloat(verifiedAmount) : submission.amount

      // 1. Transactionally update submission
      const updatedSubmission = await db.paymentSubmission.update({
        where: { id },
        data: {
          verificationStatus: 'MANUALLY_VERIFIED',
          verifiedAmount: finalVerifiedAmount,
          verifiedAt: new Date(),
          verifiedBy: user.username,
          remarks: remarks || submission.remarks,
        },
      })

      // 2. Locate or convert member
      let member = null
      if (submission.memberId) {
        member = await db.member.findUnique({ where: { id: submission.memberId } })
      } else if (submission.membershipNumber) {
        member = await db.member.findUnique({ where: { membershipNumber: submission.membershipNumber } })
      } else if (submission.email) {
        member = await db.member.findFirst({ where: { email: submission.email } })
      }

      // If no existing member, auto-provision Member from submission details
      if (!member) {
        const memberCount = await db.member.count()
        const membershipNumber = submission.membershipNumber || `MC-2026-${String(memberCount + 1).padStart(4, '0')}`
        const digitalToken = `mcard_${crypto.randomBytes(12).toString('hex')}`

        member = await db.member.create({
          data: {
            membershipNumber,
            fullName: submission.fullName,
            phone: submission.phone,
            email: submission.email,
            membershipFeeSnapshot: 500000,
            membershipStatus: 'pending',
            digitalCardToken: digitalToken,
            digitalCardStatus: 'eligible',
          },
        })
      }

      // 3. Create Official Membership Payment Ledger Record
      const pmtCount = await db.membershipPayment.count()
      const receiptNumber = `RCP-2026-${String(pmtCount + 1).padStart(4, '0')}`

      await db.membershipPayment.create({
        data: {
          memberId: member.id,
          amount: finalVerifiedAmount,
          paymentMethod: submission.paymentMethod,
          reference: submission.transactionReference,
          receiptNumber,
          createdBy: user.username,
          remarks: `Verified from submission ${submission.submissionReference}`,
        },
      })

      // 4. Calculate Total Fee Paid & Evaluate Activation Rule
      const allPayments = await db.membershipPayment.findMany({
        where: { memberId: member.id, isReversed: false },
      })
      const totalPaid = allPayments.reduce((sum, p) => sum + p.amount, 0)

      const isFullyPaid = totalPaid >= member.membershipFeeSnapshot

      if (isFullyPaid) {
        await db.member.update({
          where: { id: member.id },
          data: {
            membershipStatus: 'active',
            digitalCardStatus: 'issued',
            digitalCardIssuedAt: new Date(),
          },
        })
      }

      // 5. Audit Log
      await db.auditLog.create({
        data: {
          actorUsername: user.username,
          action: 'payment_submission_verified',
          entityType: 'PaymentSubmission',
          entityId: id,
          details: JSON.stringify({
            submissionReference: submission.submissionReference,
            verifiedAmount: finalVerifiedAmount,
            receiptNumber,
            memberId: member.id,
            membershipStatus: isFullyPaid ? 'active' : member.membershipStatus,
          }),
        },
      })

      // 6. Queue Confirmation Log
      await db.notificationLog.create({
        data: {
          recipientEmail: submission.email,
          recipientPhone: submission.phone,
          channel: 'email',
          templateName: 'PAYMENT_RECEIVED_CONFIRMATION',
          messageContent: `Thank you for your payment to Markhor Club. Verified Amount: PKR ${finalVerifiedAmount.toLocaleString()}. Receipt: ${receiptNumber}. Member No: ${member.membershipNumber}.`,
          status: 'sent',
          sentAt: new Date(),
        },
      })

      return NextResponse.json({
        success: true,
        message: `Payment submission verified. Official ledger receipt ${receiptNumber} issued.`,
        receiptNumber,
        memberStatus: isFullyPaid ? 'active' : 'pending',
      })
    } else if (action === 'needs_info') {
      await db.paymentSubmission.update({
        where: { id },
        data: { verificationStatus: 'NEEDS_INFORMATION', remarks },
      })
      return NextResponse.json({ success: true, message: 'Status updated to NEEDS_INFORMATION.' })
    } else if (action === 'reject') {
      await db.paymentSubmission.update({
        where: { id },
        data: { verificationStatus: 'REJECTED', remarks },
      })
      return NextResponse.json({ success: true, message: 'Payment submission rejected.' })
    } else if (action === 'duplicate') {
      await db.paymentSubmission.update({
        where: { id },
        data: { verificationStatus: 'DUPLICATE', remarks },
      })
      return NextResponse.json({ success: true, message: 'Flagged as duplicate TID.' })
    }

    return NextResponse.json({ success: false, error: 'Invalid action.' }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error?.message || 'Server error' }, { status: 500 })
  }
}
