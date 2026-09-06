import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { queryKnowledgeBase } from '@/lib/crm/knowledge-base'
import { syncInquiryToCrm } from '@/lib/services/crm-sync'
import { MEMBERSHIP_CONFIG } from '@/config/membership'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, conversationId, action, fullName, email, phone } = body

    // 1. Action: Leave Offline Message for CSR
    if (action === 'leaveMessage') {
      if (!fullName || !phone || !message) {
        return NextResponse.json(
          { success: false, error: 'Name, phone number, and message are required.' },
          { status: 400 }
        )
      }

      const conv = await db.chatConversation.create({
        data: {
          visitorName: String(fullName).trim(),
          visitorEmail: email ? String(email).trim().toLowerCase() : null,
          visitorPhone: String(phone).trim(),
          status: 'transferred_to_csr',
          messages: {
            create: [
              { senderType: 'visitor', message: String(message).trim() },
              { senderType: 'bot', message: 'Offline message logged. A Markhor Club representative will contact you shortly.' },
            ],
          },
        },
      })

      // Sync offline message to CRM Sync Jobs
      await db.crmSyncJob.create({
        data: {
          entityType: 'contact',
          entityId: conv.id,
          eventName: 'chat_offline_message',
          payload: JSON.stringify({ fullName, email, phone, message }),
          status: 'pending',
        },
      }).catch(() => {})

      return NextResponse.json({
        success: true,
        reply: 'Thank you. Your message has been received and routed to our Markhor Club representative.',
        conversationId: conv.id,
      })
    }

    // 2. Action: Chat Lead Capture (Convert interested visitor into CRM Contact + Opportunity)
    if (action === 'leadCapture') {
      if (!fullName || !phone) {
        return NextResponse.json(
          { success: false, error: 'Full name and contact phone number are required.' },
          { status: 400 }
        )
      }

      const cleanPhone = String(phone).replace(/[^0-9+]/g, '')
      const sanitizedName = String(fullName).trim()
      const sanitizedEmail = email ? String(email).trim().toLowerCase() : `${cleanPhone}@markhor.client`
      const referenceNumber = `INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`

      const localInquiry = await db.membershipInquiry.create({
        data: {
          referenceNumber,
          fullName: sanitizedName,
          email: sanitizedEmail,
          phone: cleanPhone,
          preferredContactMethod: 'whatsapp',
          membershipCategory: 'Individual Membership (Chat Lead)',
          message: message ? String(message).trim() : 'Captured via Markhor Concierge Chatbot',
          status: 'new',
          membershipFeeSnapshotPkr: MEMBERSHIP_CONFIG.feePkr,
          crmSyncStatus: 'pending',
        },
      })

      // Sync to GuaranteedCRM in background
      const crmResult = await syncInquiryToCrm(localInquiry.id).catch(() => ({ success: false }))

      return NextResponse.json({
        success: true,
        reply: `Thank you, ${sanitizedName}. Your inquiry (${referenceNumber}) has been logged with our sales team. We look forward to welcoming you to Markhor Club.`,
        referenceNumber,
        crmSync: crmResult.success ? 'synced' : 'pending',
      })
    }

    // 3. Regular Chat Message Query Processing
    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ success: false, error: 'Message cannot be empty.' }, { status: 400 })
    }

    // Query Knowledge Base with anti-hallucination engine
    const knowledgeResult = queryKnowledgeBase(message)

    // Save message log if conversationId provided
    if (conversationId) {
      await db.chatMessage.createMany({
        data: [
          { conversationId, senderType: 'visitor', message: message.trim() },
          { conversationId, senderType: 'bot', message: knowledgeResult.reply },
        ],
      }).catch(() => {})
    }

    return NextResponse.json({
      success: true,
      reply: knowledgeResult.reply,
      intent: knowledgeResult.intent,
      category: knowledgeResult.category || null,
      confidence: knowledgeResult.confidence,
    })
  } catch (error: any) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { success: false, error: 'Chat service temporary error' },
      { status: 500 }
    )
  }
}
