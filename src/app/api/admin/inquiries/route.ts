import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const session = await verifyAdminSession()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get('search')?.trim() || ''
    const status = searchParams.get('status')?.trim() || ''
    const showDeleted = searchParams.get('showDeleted') === 'true'

    const whereClause: any = {}

    if (showDeleted) {
      whereClause.deletedAt = { not: null }
    } else {
      whereClause.deletedAt = null
    }

    if (status) {
      whereClause.status = status
    }

    if (search) {
      whereClause.OR = [
        { referenceNumber: { contains: search } },
        { fullName: { contains: search } },
        { phone: { contains: search } },
        { email: { contains: search } },
      ]
    }

    const inquiries = await db.membershipInquiry.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
    })

    const activeCount = await db.membershipInquiry.count({
      where: { deletedAt: null },
    })

    const archivedCount = await db.membershipInquiry.count({
      where: { deletedAt: { not: null } },
    })

    return NextResponse.json({
      success: true,
      inquiries,
      counts: {
        active: activeCount,
        archived: archivedCount,
        total: activeCount + archivedCount,
      },
    })
  } catch (error: any) {
    console.error('Admin inquiries fetch error:', error)
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch inquiries' },
      { status: 500 }
    )
  }
}
