import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requirePermission } from '@/lib/rbac'
import { PERMISSIONS } from '@/lib/permissions'

export async function GET() {
  const { user, error } = await requirePermission(PERMISSIONS.PAYMENTS_READ)
  if (error) return error

  try {
    const claims = await db.paymentSubmission.findMany({
      where: { verificationStatus: { in: ['PENDING_VERIFICATION', 'SUBMITTED', 'DUPLICATE'] } },
      orderBy: { createdAt: 'desc' },
    })

    const transactions = await db.paymentProviderTransaction.findMany({
      orderBy: { transactionDate: 'desc' },
      take: 200,
    })

    // Compute match matrix
    const matches = claims.map((claim) => {
      const claimTid = claim.transactionReference.toUpperCase().replace(/[^A-Z0-9-]/g, '')
      
      // Look for exact match (same normalized TID & same amount)
      const exactMatch = transactions.find(
        (tx) => tx.externalTransactionId === claimTid && Math.abs(tx.amount - claim.amount) < 0.01
      )

      // Look for conflict (same TID, different amount)
      const conflictMatch = transactions.find(
        (tx) => tx.externalTransactionId === claimTid && Math.abs(tx.amount - claim.amount) >= 0.01
      )

      // Look for possible match (same amount, different TID)
      const possibleMatch = transactions.find(
        (tx) => Math.abs(tx.amount - claim.amount) < 0.01 && tx.externalTransactionId !== claimTid
      )

      let matchStatus = 'NO_MATCH'
      let matchedTransaction = null

      if (exactMatch) {
        matchStatus = 'EXACT_MATCH'
        matchedTransaction = exactMatch
      } else if (conflictMatch) {
        matchStatus = 'CONFLICT'
        matchedTransaction = conflictMatch
      } else if (possibleMatch) {
        matchStatus = 'POSSIBLE_MATCH'
        matchedTransaction = possibleMatch
      }

      return {
        claim,
        matchedTransaction,
        matchStatus,
      }
    })

    return NextResponse.json({ success: true, matches, totalClaims: claims.length })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
