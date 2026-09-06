import { db } from '../src/lib/db'
import bcrypt from 'bcryptjs'

async function main() {
  console.log('Seeding initial Markhor Club database...')

  // 1. Initial Admin User
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || 'MarkhorAdmin2026!'
  const passwordHash = await bcrypt.hash(adminPassword, 10)

  const admin = await db.adminUser.upsert({
    where: { username: 'Markhorclub' },
    update: { passwordHash },
    create: {
      username: 'Markhorclub',
      passwordHash,
      fullName: 'Markhor Administrator',
      email: 'info@markhourgroup.com',
      role: 'superadmin',
      isActive: true,
    },
  })
  console.log('Admin user ready:', admin.username)

  // 2. Initial App Settings
  const settings = [
    { key: 'membership_fee_pkr', value: '500000', description: 'Current pre-launch membership fee' },
    { key: 'admin_alert_whatsapp', value: process.env.ADMIN_ALERT_WHATSAPP_E164 || '+923305230888', description: 'Admin WhatsApp alert destination' },
    { key: 'admin_alert_email', value: process.env.ADMIN_ALERT_EMAIL || 'info@markhourgroup.com', description: 'Admin email alert destination' },
    { key: 'uan_phone', value: '0995-111-222-333', description: 'Markhor Club official UAN' },
    { key: 'crm_location_id', value: 'XiafrvXc2uTJ0WzOAJFu', description: 'GuaranteedCRM location ID' },
  ]

  for (const s of settings) {
    await db.appSetting.upsert({
      where: { key: s.key },
      update: { value: s.value, description: s.description },
      create: s,
    })
  }

  // 3. Initial FAQs
  const faqs = [
    {
      category: 'Membership',
      question: 'What is the current membership fee for Markhor Club?',
      answer: 'The current pre-launch membership fee is PKR 500,000. Fee terms are locked upon application submission.',
      sortOrder: 1,
    },
    {
      category: 'Location',
      question: 'Where is Markhor Club located?',
      answer: 'Markhor Club is situated on a 500 Kanal estate near Alexander Road, Khanpur Dam, KPK, Pakistan (approx. 2 KM from Alexander Road with direct Khanpur Dam view).',
      sortOrder: 2,
    },
    {
      category: 'Amenities',
      question: 'What amenities are planned at Markhor Club?',
      answer: 'Markhor Club features Signature Dining Restaurants, Gymnasium & Fitness, Indoor Sports Arena, Hydrotherapy Jacuzzi & Wellness, Shoreline Swimming Pools, Equestrian Riding Trails, Boating & Water Sports, and Golf Driving Range.',
      sortOrder: 3,
    },
    {
      category: 'Aqua Park',
      question: 'What is the Aqua Experience at Markhor Club?',
      answer: 'The Aqua Theme Park is a signature multi-generational water destination featuring aquatic adventure slides, splash play zones, shoreline pools, and family leisure facilities.',
      sortOrder: 4,
    },
    {
      category: 'Booking & Visits',
      question: 'How can I schedule a visit to the estate?',
      answer: 'You can request a site visit using the "Book A Visit" form on our website or by contacting our team via WhatsApp / UAN 0995-111-222-333.',
      sortOrder: 5,
    },
  ]

  for (const faq of faqs) {
    const existing = await db.fAQ.findFirst({ where: { question: faq.question } })
    if (!existing) {
      await db.fAQ.create({ data: faq })
    }
  }

  // 4. Initial Notification Templates
  const templates = [
    {
      name: 'Membership Welcome',
      subject: 'Welcome to Markhor Club — Reference {{reference}}',
      channel: 'both',
      bodyTemplate: 'Dear {{name}}, thank you for applying for Markhor Club membership. Your reference number is {{reference}}. Our membership team will contact you shortly.',
    },
    {
      name: 'Payment Received',
      subject: 'Payment Confirmation — Markhor Club',
      channel: 'both',
      bodyTemplate: 'Dear {{name}}, we have received your payment of PKR {{amount}}. Receipt: {{receiptNumber}}. Outstanding balance: PKR {{balance}}.',
    },
    {
      name: 'Payment Reminder',
      subject: 'Membership Fee Payment Reminder — Markhor Club',
      channel: 'both',
      bodyTemplate: 'Dear {{name}}, this is a friendly reminder regarding your outstanding membership balance of PKR {{balance}}.',
    },
    {
      name: 'Visit Confirmation',
      subject: 'Estate Visit Confirmation — Markhor Club',
      channel: 'both',
      bodyTemplate: 'Dear {{name}}, your site visit to Markhor Club Khanpur Dam has been scheduled for {{date}}. We look forward to welcoming you.',
    },
  ]

  for (const t of templates) {
    await db.notificationTemplate.upsert({
      where: { name: t.name },
      update: { subject: t.subject, bodyTemplate: t.bodyTemplate, channel: t.channel },
      create: t,
    })
  }

  console.log('Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
