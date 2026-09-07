import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { requirePermission } from '@/lib/rbac'
import { PERMISSIONS } from '@/lib/permissions'
import crypto from 'crypto'

function parseCsv(text: string): Record<string, string>[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim() !== '')
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, '').toLowerCase())
  const rows: Record<string, string>[] = []

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map((v) => v.trim().replace(/^"|"$/g, ''))
    if (values.length < headers.length) continue

    const row: Record<string, string> = {}
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = values[j]
    }
    rows.push(row)
  }

  return rows
}

export async function POST(request: NextRequest) {
  const { user, error } = await requirePermission(PERMISSIONS.PAYMENTS_VERIFY)
  if (error) return error

  try {
    const formData = await request.formData()
    const provider = (formData.get('provider') as string || 'Easypaisa').trim()
    const destinationAccountId = (formData.get('destinationAccountId') as string || '').trim()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ success: false, error: 'CSV statement file is required.' }, { status: 400 })
    }

    const text = await file.text()
    const rows = parseCsv(text)

    if (rows.length === 0) {
      return NextResponse.json({ success: false, error: 'CSV file is empty or invalid header format.' }, { status: 400 })
    }

    const sourceImportId = `imp_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`
    let importedCount = 0
    let duplicateCount = 0

    for (const row of rows) {
      // Find TID column (tid, reference, txnid, transaction_id, ref, etc.)
      const tid = row.tid || row.reference || row.txnid || row.transaction_id || row.ref || row['tid/ref'] || ''
      const amountStr = row.amount || row.credit || row.val || '0'
      const dateStr = row.date || row.transaction_date || new Date().toISOString()
      const description = row.description || row.narration || row.remarks || ''

      const amount = parseFloat(amountStr.replace(/,/g, ''))
      if (!tid || isNaN(amount) || amount <= 0) continue

      const normalizedTid = tid.toUpperCase().replace(/[^A-Z0-9-]/g, '')
      const rawRowHash = crypto
        .createHash('sha256')
        .update(`${provider}:${destinationAccountId}:${normalizedTid}:${amount}:${dateStr}`)
        .digest('hex')

      try {
        await db.paymentProviderTransaction.create({
          data: {
            provider,
            destinationAccountId: destinationAccountId || null,
            externalTransactionId: normalizedTid,
            transactionDate: new Date(dateStr),
            amount,
            currency: 'PKR',
            direction: 'CREDIT',
            description,
            sourceImportId,
            rawRowHash,
          },
        })
        importedCount++
      } catch (err: any) {
        if (err.code === 'P2002') {
          duplicateCount++
        }
      }
    }

    await db.auditLog.create({
      data: {
        actorUsername: user.username,
        action: 'bank_statement_imported',
        entityType: 'PaymentProviderTransaction',
        details: JSON.stringify({ provider, importedCount, duplicateCount, sourceImportId }),
      },
    })

    return NextResponse.json({
      success: true,
      importedCount,
      duplicateCount,
      sourceImportId,
      message: `Imported ${importedCount} transactions from statement (${duplicateCount} duplicate rows skipped).`,
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
