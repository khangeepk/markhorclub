import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const accounts = await db.paymentAccount.findMany({
      where: {
        isActive: true,
        displayOnPublicPage: true,
      },
      select: {
        id: true,
        provider: true,
        accountTitle: true,
        accountNumber: true,
        iban: true,
        branch: true,
        currency: true,
        description: true,
      },
      orderBy: { createdAt: 'asc' },
    })

    return NextResponse.json({ success: true, accounts })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
