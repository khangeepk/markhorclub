export interface KnowledgeCategory {
  id: string
  title: string
  facts: string[]
}

export interface GroundedFaq {
  question: string
  answer: string
  category: string
  keywords: string[]
}

export const MARKHOR_KNOWLEDGE_BASE: KnowledgeCategory[] = [
  {
    id: '01_about',
    title: '01 ABOUT MARKHOR CLUB',
    facts: [
      'Markhor Club is a 500 Kanal luxury estate destination near Khanpur Dam, KPK, Pakistan.',
      'Developed by Markhor Group Pvt. Ltd. (UAN: 0995-111-222-333, Email: info@markhourgroup.com).',
      'Conceived as an exclusive private club bringing together leisure, gastronomy, wellness, sport, and outdoor adventure.',
    ],
  },
  {
    id: '02_location',
    title: '02 LOCATION & ACCESS',
    facts: [
      'Located near Alexander Road, Khanpur Dam, KPK, Pakistan.',
      'Approximately 2 KM from Alexander Road with direct panoramic Khanpur Dam view.',
      'Linear destination path: Pakistan -> KPK -> Khanpur Dam -> Markhor Club.',
    ],
  },
  {
    id: '03_membership',
    title: '03 MEMBERSHIP & PRICING',
    facts: [
      'Current pre-launch membership fee is PKR 500,000.',
      'Pre-launch fee snapshot is locked upon application submission.',
      'Membership fee is subject to revision for future phases.',
      'Membership categories include Individual and Corporate memberships.',
    ],
  },
  {
    id: '04_amenities',
    title: '04 CLUBHOUSE & AMENITIES',
    facts: [
      'Signature Dining Restaurants & Lounges with sunset terrace views.',
      'Gymnasium & State-of-the-Art Fitness Center.',
      'Indoor Sports Arena for indoor sports and recreational games.',
      'Hydrotherapy Jacuzzi, Thermal Suites & Wellness Spa.',
      'Shoreline Swimming Pools.',
    ],
  },
  {
    id: '05_outdoor',
    title: '05 OUTDOOR & EQUESTRIAN',
    facts: [
      'Equestrian Lifestyle & Riding Trails across natural open grounds.',
      'Golf Driving Range & Practice Greens.',
      'Boating & Shoreline Water Excursions on Khanpur Dam.',
      'High-energy Water Adventure featuring Jet Ski excursions.',
      'Mountain Zipline adventure flight experience.',
    ],
  },
  {
    id: '06_aqua_park',
    title: '06 AQUA THEME PARK',
    facts: [
      'Signature multi-generational water park destination.',
      'Features aquatic adventure slides, splash play zones, and family leisure facilities.',
      'Conceived as part of the broader 500 Kanal Markhor Club estate.',
    ],
  },
  {
    id: '07_book_visit',
    title: '07 BOOK A VISIT',
    facts: [
      'VIP site visits can be scheduled via the website "Book A Visit" portal or WhatsApp concierge.',
      'Visitors receive guided tours of the 500 Kanal estate grounds and amenity locations.',
    ],
  },
  {
    id: '08_contact',
    title: '08 CONTACT & COMMUNICATIONS',
    facts: [
      'UAN: 0995-111-222-333',
      'Official Email: info@markhourgroup.com',
      'Official Website: www.markhourgroup.com',
      'Official WhatsApp: +923305230888',
    ],
  },
  {
    id: '09_payments',
    title: '09 PAYMENTS & ACCOUNT',
    facts: [
      'Membership payments can be made via Bank Transfer, Cash, Cheque, or Card.',
      'All payments receive official Markhor Club receipt numbers (RCP-2026-xxxx).',
    ],
  },
  {
    id: '10_human_support',
    title: '10 HUMAN CSR SUPPORT',
    facts: [
      'Live CSR support is accessible via the Markhor VIP Concierge WhatsApp link.',
      'Offline messages can be logged in chat and are routed directly to Markhor management.',
    ],
  },
]

export const VERIFIED_FAQS: GroundedFaq[] = [
  {
    question: 'What is Markhor Club?',
    answer: 'Markhor Club by Markhor Group Pvt. Ltd. is a 500 Kanal luxury estate destination near Khanpur Dam, KPK, Pakistan featuring dining, wellness, sports, water activities, and outdoor adventure.',
    category: 'General',
    keywords: ['markhor', 'club', 'what', 'about', 'overview', 'project'],
  },
  {
    question: 'Where is Markhor Club located?',
    answer: 'Markhor Club is located near Alexander Road, Khanpur Dam, KPK, Pakistan (approx. 2 KM from Alexander Road with panoramic Khanpur Dam view facing).',
    category: 'Location',
    keywords: ['where', 'location', 'located', 'address', 'khanpur', 'dam', 'kpk', 'alexander'],
  },
  {
    question: 'How far is Markhor Club from Alexander Road?',
    answer: 'Markhor Club is approximately 2 KM from Alexander Road near Khanpur Dam.',
    category: 'Location',
    keywords: ['distance', 'far', 'alexander', 'road', 'km'],
  },
  {
    question: 'What is the total project area?',
    answer: 'The total project area of Markhor Club is 500 Kanal.',
    category: 'General',
    keywords: ['area', 'kanal', 'size', 'total', '500'],
  },
  {
    question: 'What is the current membership fee?',
    answer: 'The current pre-launch membership fee for Markhor Club is PKR 500,000. Fee terms are locked upon application submission.',
    category: 'Membership',
    keywords: ['fee', 'price', 'cost', 'membership', 'rate', 'pkr', '500000', '500,000', 'charge'],
  },
  {
    question: 'Is the membership fee permanent?',
    answer: 'The pre-launch membership fee of PKR 500,000 is locked upon application submission, but is subject to revision for subsequent launch phases.',
    category: 'Membership',
    keywords: ['permanent', 'locked', 'revision', 'change', 'increase'],
  },
  {
    question: 'How can I apply for membership?',
    answer: 'You can apply by filling out the Membership Enquiry form on our website or by contacting our concierge team via WhatsApp / UAN 0995-111-222-333.',
    category: 'Membership',
    keywords: ['apply', 'application', 'join', 'register', 'enquiry', 'form'],
  },
  {
    question: 'What amenities are part of Markhor Club?',
    answer: 'Amenities include Signature Restaurants, Fitness Gym, Indoor Sports, Hydrotherapy Jacuzzi & Spa, Shoreline Pools, Equestrian Trails, Golf Range, Boating, Jet Ski Water Adventure, and Zipline.',
    category: 'Amenities',
    keywords: ['amenities', 'facilities', 'features', 'gym', 'pool', 'restaurant', 'spa', 'jacuzzi'],
  },
  {
    question: 'Does Markhor Club include horse riding?',
    answer: 'Yes, Markhor Club includes an Equestrian Lifestyle experience with riding trails and open grounds.',
    category: 'Outdoor',
    keywords: ['horse', 'riding', 'equestrian', 'horses'],
  },
  {
    question: 'Does Markhor Club include golf?',
    answer: 'Yes, Markhor Club includes a Golf Driving Range & practice greens set within scenic fairway landscapes.',
    category: 'Outdoor',
    keywords: ['golf', 'driving', 'range', 'fairway'],
  },
  {
    question: 'Are water activities available?',
    answer: 'Yes, water activities include open-water boating, jet-ski water adventure, shoreline pools, and the Aqua Theme Park.',
    category: 'Outdoor',
    keywords: ['water', 'boating', 'jet ski', 'jetski', 'lake', 'dam', 'boat'],
  },
  {
    question: 'What is the Aqua Theme Park?',
    answer: 'The Aqua Theme Park is a multi-generational water park destination featuring aquatic adventure slides, splash play zones, shoreline pools, and family leisure facilities.',
    category: 'Aqua Park',
    keywords: ['aqua', 'theme', 'park', 'waterpark', 'slides', 'splash'],
  },
  {
    question: 'How can I book a visit?',
    answer: 'You can request a VIP site visit using the "Book A Visit" button on our website or through our concierge chat. Our team will confirm available slots with you.',
    category: 'Visit',
    keywords: ['visit', 'tour', 'book', 'schedule', 'see', 'site'],
  },
  {
    question: 'How can I contact Markhor Club?',
    answer: 'Reach Markhor Club via UAN: 0995-111-222-333, Email: info@markhourgroup.com, Website: www.markhourgroup.com, or WhatsApp: +923305230888.',
    category: 'Contact',
    keywords: ['contact', 'phone', 'uan', 'email', 'number', 'whatsapp', 'reach'],
  },
  {
    question: 'Can I speak to a representative?',
    answer: 'Yes. You can click "Speak to Live CSR" in our chat to connect directly via WhatsApp +923305230888 or leave an offline message for an immediate callback.',
    category: 'Support',
    keywords: ['human', 'csr', 'representative', 'agent', 'person', 'talk', 'call', 'speak'],
  },
]

/**
 * Strict Anti-Hallucination Query Engine
 */
export function queryKnowledgeBase(inputMessage: string): {
  reply: string
  intent: 'faq' | 'book_visit' | 'live_csr' | 'lead_capture' | 'unverified'
  category?: string
  confidence: number
} {
  const clean = inputMessage.trim().toLowerCase()

  // 1. Check Intent: Live CSR Handoff
  if (
    clean.includes('speak to live csr') ||
    clean.includes('human') ||
    clean.includes('representative') ||
    clean.includes('talk to someone') ||
    clean.includes('talk to person') ||
    clean.includes('call me') ||
    clean.includes('agent')
  ) {
    return {
      intent: 'live_csr',
      reply: 'I can connect you with a Markhor Club representative right away. You can continue on WhatsApp or leave an offline message for a prompt callback.',
      confidence: 1.0,
    }
  }

  // 2. Check Intent: Book a Visit
  if (
    clean.includes('book a visit') ||
    clean.includes('schedule a tour') ||
    clean.includes('book visit') ||
    clean.includes('see the project') ||
    clean.includes('visit site') ||
    clean.includes('site tour')
  ) {
    return {
      intent: 'book_visit',
      reply: 'We would be delighted to host you for a VIP tour of our 500 Kanal Khanpur Dam estate. Please provide your preferred date and contact details to request a booking.',
      confidence: 1.0,
    }
  }

  // 3. Match Verified FAQs
  for (const faq of VERIFIED_FAQS) {
    const qLower = faq.question.toLowerCase()
    if (qLower === clean || clean.includes(qLower)) {
      return {
        intent: 'faq',
        reply: faq.answer,
        category: faq.category,
        confidence: 0.95,
      }
    }

    const matchedKw = faq.keywords.filter((kw) => clean.includes(kw))
    if (matchedKw.length >= 2 || (faq.keywords.length <= 2 && matchedKw.length >= 1)) {
      return {
        intent: 'faq',
        reply: faq.answer,
        category: faq.category,
        confidence: 0.85,
      }
    }
  }

  // 4. Strict Unverified Check (Avoid Hallucinating Room Counts, Completion Dates, Discounts, Slide Counts, Returns)
  const unverifiedKeywords = [
    'discount', 'room', 'hotel', 'resort room', 'completion date', 'opening date',
    'construction date', 'gps', 'slide count', 'pool size', 'guaranteed return',
    'investment return', 'payment plan', 'installment', 'award', 'legal',
  ]

  const isUnverified = unverifiedKeywords.some((kw) => clean.includes(kw))

  if (isUnverified) {
    return {
      intent: 'unverified',
      reply: "I don't have verified information for that yet. I can connect you with a Markhor Club representative.",
      confidence: 0.0,
    }
  }

  // 5. Default Fallback
  return {
    intent: 'unverified',
    reply: "I don't have verified information for that yet. I can connect you with a Markhor Club representative.",
    confidence: 0.0,
  }
}
