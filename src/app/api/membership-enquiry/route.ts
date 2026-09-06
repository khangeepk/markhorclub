import { NextResponse } from 'next/server'
import { MEMBERSHIP_CONFIG } from '../../../config/membership'
import { buildLocalMembershipEnquiry } from '../../../lib/crm/local-records'
import { buildMembershipEnquiryEvent, createPendingSyncJob } from '../../../lib/crm/sync'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, email, phone, preferredContact, interestCategory, message, consent, honeypot } = body

    // Honeypot anti-spam check
    if (honeypot) {
      return NextResponse.json(
        { success: false, error: 'Bot submission detected.' },
        { status: 400 }
      )
    }

    // Server-side validation
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid full name.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address.' },
        { status: 400 }
      )
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid phone number.' },
        { status: 400 }
      )
    }

    if (!consent) {
      return NextResponse.json(
        { success: false, error: 'Consent is required to submit a membership enquiry.' },
        { status: 400 }
      )
    }

    // Local-first integration boundary. The authoritative fee snapshot is
    // generated server-side; the CRM job is deterministic and currently only
    // planned/queued because GCRM-00 must not call an external provider.
    const localRecord = buildLocalMembershipEnquiry({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      preferredContact: preferredContact || 'Phone',
      interestCategory: interestCategory || 'General Membership Enquiry',
      message: message ? message.trim() : '',
      membershipPhaseSnapshot: MEMBERSHIP_CONFIG.phaseLabel,
      membershipFeeSnapshotPkr: MEMBERSHIP_CONFIG.feePkr,
    })
    const syncJob = createPendingSyncJob(buildMembershipEnquiryEvent(localRecord))

    return NextResponse.json({
      success: true,
      message: 'Thank you for your interest. Your membership enquiry has been received.',
      record: {
        id: localRecord.id,
        phase: localRecord.membership_phase_snapshot,
        fee: localRecord.membership_fee_snapshot_pkr,
        crmSyncStatus: localRecord.crm_sync_status,
        syncJobId: syncJob.id,
      },
    })
  } catch (error) {
    console.error('Membership enquiry API error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'We could not submit your enquiry right now. Please try again or contact us directly at ' + MEMBERSHIP_CONFIG.uanPhone,
      },
      { status: 500 }
    )
  }
}
