import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  try {
    const { message, conversationId } = await request.json()

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ success: false, error: 'Message cannot be empty.' }, { status: 400 })
    }

    const cleanInput = message.trim().toLowerCase()

    // 1. Fetch enabled FAQs from Database
    const dbFaqs = await db.fAQ.findMany({
      where: { isEnabled: true },
      orderBy: { sortOrder: 'asc' },
    }).catch(() => [])

    // 2. Keyword Match Engine (Grounded in Verified DB FAQs)
    let bestMatchAnswer: string | null = null

    for (const faq of dbFaqs) {
      const qLower = faq.question.toLowerCase()
      const keywords = qLower.split(' ').filter((w) => w.length > 3)

      if (qLower.includes(cleanInput) || cleanInput.includes(qLower)) {
        bestMatchAnswer = faq.answer
        break
      }

      // Count matching keywords
      const matchCount = keywords.filter((kw) => cleanInput.includes(kw)).length
      if (matchCount >= 2 || (keywords.length <= 2 && matchCount >= 1)) {
        bestMatchAnswer = faq.answer
        break
      }
    }

    // Quick action category triggers
    if (!bestMatchAnswer) {
      if (cleanInput.includes('fee') || cleanInput.includes('price') || cleanInput.includes('cost') || cleanInput.includes('pkr')) {
        bestMatchAnswer = 'The current pre-launch membership fee for Markhor Club is PKR 500,000. Fee terms are locked upon application submission.'
      } else if (cleanInput.includes('location') || cleanInput.includes('where') || cleanInput.includes('address') || cleanInput.includes('khanpur')) {
        bestMatchAnswer = 'Markhor Club is located on a 500 Kanal estate near Alexander Road, Khanpur Dam, KPK, Pakistan (approx. 2 KM from Alexander Road with direct Khanpur Dam view).'
      } else if (cleanInput.includes('amenit') || cleanInput.includes('facility') || cleanInput.includes('pool') || cleanInput.includes('gym')) {
        bestMatchAnswer = 'Markhor Club amenities include Signature Dining Restaurants, Gymnasium & Fitness, Indoor Sports Arena, Hydrotherapy Jacuzzi & Wellness, Shoreline Swimming Pools, Equestrian Riding Trails, Boating & Water Sports, and Golf Driving Range.'
      } else if (cleanInput.includes('aqua') || cleanInput.includes('water park') || cleanInput.includes('slide')) {
        bestMatchAnswer = 'The Aqua Theme Park is a signature multi-generational water destination featuring aquatic adventure slides, splash play zones, shoreline pools, and family leisure facilities.'
      } else if (cleanInput.includes('visit') || cleanInput.includes('tour') || cleanInput.includes('book')) {
        bestMatchAnswer = 'You can schedule a site visit using the "Book A Visit" form on our website or by contacting our VIP Concierge via WhatsApp / UAN 0995-111-222-333.'
      } else if (cleanInput.includes('contact') || cleanInput.includes('phone') || cleanInput.includes('uan') || cleanInput.includes('email')) {
        bestMatchAnswer = 'You can reach Markhor Club via UAN: 0995-111-222-333, Email: info@markhourgroup.com, or official WhatsApp +923305230888.'
      }
    }

    // 3. Fallback if grounded facts do not answer question
    const botReply = bestMatchAnswer || "I don't have verified information for that yet. Would you like to speak with a Markhor Club representative?"

    // Save message to conversation log if conversationId provided
    if (conversationId) {
      await db.chatMessage.createMany({
        data: [
          { conversationId, senderType: 'visitor', message: message.trim() },
          { conversationId, senderType: 'bot', message: botReply },
        ],
      }).catch(() => {})
    }

    return NextResponse.json({
      success: true,
      reply: botReply,
      matched: Boolean(bestMatchAnswer),
    })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: 'Chat service temporary error' },
      { status: 500 }
    )
  }
}
