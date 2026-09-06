import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()

    const fullName = (formData.get('fullName') as string || '').trim()
    const phone = (formData.get('phone') as string || '').trim()
    const email = (formData.get('email') as string || '').trim()
    const membershipNumber = (formData.get('membershipNumber') as string || '').trim()
    const inquiryReference = (formData.get('inquiryReference') as string || '').trim()
    const amountStr = formData.get('amount') as string || '0'
    const paymentMethod = (formData.get('paymentMethod') as string || 'bank_transfer').trim()
    const providerName = (formData.get('providerName') as string || 'Meezan Bank').trim()
    const paymentDateStr = formData.get('paymentDate') as string || new Date().toISOString()
    const rawTid = (formData.get('transactionReference') as string || '').trim()
    const remarks = (formData.get('remarks') as string || '').trim()
    const file = formData.get('file') as File | null

    if (!fullName || !phone || !email || !rawTid || !amountStr) {
      return NextResponse.json(
        { success: false, error: 'Please fill in all required fields (Name, Phone, Email, Amount, Transaction ID).' },
        { status: 400 }
      )
    }

    const amount = parseFloat(amountStr)
    if (isNaN(amount) || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid positive payment amount.' },
        { status: 400 }
      )
    }

    // Normalize Transaction Reference
    const transactionReference = rawTid.toUpperCase().replace(/[^A-Z0-9-]/g, '')

    // Check for duplicate TID
    const existingSubmission = await db.paymentSubmission.findFirst({
      where: {
        transactionReference,
        providerName,
      },
    })

    const isDuplicate = Boolean(existingSubmission)
    const initialStatus = isDuplicate ? 'DUPLICATE' : 'PENDING_VERIFICATION'

    // Handle File Storage securely in private_uploads/proofs/
    let proofStorageKey: string | null = null

    if (file && file.size > 0) {
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { success: false, error: 'Proof file size must not exceed 5MB.' },
          { status: 400 }
        )
      }

      const allowedMimes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg']
      if (!allowedMimes.includes(file.type)) {
        return NextResponse.json(
          { success: false, error: 'Invalid file format. Only PDF, JPG, and PNG evidence allowed.' },
          { status: 400 }
        )
      }

      const fileExt = path.extname(file.name) || '.png'
      const randomKey = `proof_${Date.now()}_${crypto.randomBytes(8).toString('hex')}${fileExt}`
      const uploadDir = path.join(process.cwd(), 'private_uploads', 'proofs')

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true })
      }

      const bytes = await file.arrayBuffer()
      const buffer = Buffer.from(bytes)
      fs.writeFileSync(path.join(uploadDir, randomKey), buffer)

      proofStorageKey = randomKey
    }

    // Generate submission reference SUB-2026-XXXX
    const count = await db.paymentSubmission.count()
    const submissionReference = `SUB-2026-${String(count + 1).padStart(4, '0')}`

    // Insert record into DB
    const submission = await db.paymentSubmission.create({
      data: {
        submissionReference,
        fullName,
        phone,
        email,
        membershipNumber: membershipNumber || null,
        inquiryReference: inquiryReference || null,
        amount,
        paymentMethod,
        providerName,
        paymentDate: new Date(paymentDateStr),
        transactionReference,
        proofStorageKey,
        remarks: remarks || null,
        verificationStatus: initialStatus,
        verificationMethod: 'manual',
      },
    })

    // Log Audit
    await db.auditLog.create({
      data: {
        actorUsername: fullName,
        action: 'payment_submission_created',
        entityType: 'PaymentSubmission',
        entityId: submission.id,
        details: JSON.stringify({
          submissionReference,
          amount,
          transactionReference,
          status: initialStatus,
        }),
      },
    })

    return NextResponse.json({
      success: true,
      message: isDuplicate
        ? 'Payment submission received. Flagged as duplicate TID for manual review.'
        : 'Payment proof submitted successfully. Pending verification.',
      submissionReference: submission.submissionReference,
      status: submission.verificationStatus,
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || 'Server error processing payment submission.' },
      { status: 500 }
    )
  }
}
