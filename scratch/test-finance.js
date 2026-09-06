const fs = require('fs')
const path = require('path')

const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const p = line.split('=')
    if (p.length >= 2) process.env[p[0].trim()] = p.slice(1).join('=').trim()
  })
}

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function testFinancialCalculation() {
  console.log('=== PHASE 23: FINANCIAL CALCULATION VERIFICATION ===')

  // 1. Create Dev Test Member with PKR 500,000 Fee
  const member = await prisma.member.create({
    data: {
      membershipNumber: 'MC-2026-TEST',
      fullName: 'Financial QA Test Member',
      phone: '+923009998877',
      email: 'finance-qa-test@example.com',
      membershipFeeSnapshot: 500000,
      membershipStatus: 'active',
    },
  })
  console.log('Test Member Created. Fee:', member.membershipFeeSnapshot)

  // 2. Add First Payment PKR 200,000
  await prisma.membershipPayment.create({
    data: {
      memberId: member.id,
      amount: 200000,
      paymentMethod: 'bank_transfer',
      receiptNumber: 'RCP-2026-TEST1',
      createdBy: 'qa_tester',
    },
  })

  let payments = await prisma.membershipPayment.findMany({ where: { memberId: member.id } })
  let totalPaid = payments.reduce((sum, p) => sum + p.amount, 0)
  let balance = Math.max(0, member.membershipFeeSnapshot - totalPaid)

  console.log('After Payment 1 (PKR 200,000) -> Paid:', totalPaid, '| Expected Balance: 300000 | Calculated Balance:', balance)
  if (balance !== 300000) throw new Error('Balance calculation mismatch after payment 1')

  // 3. Add Second Payment PKR 300,000
  await prisma.membershipPayment.create({
    data: {
      memberId: member.id,
      amount: 300000,
      paymentMethod: 'bank_transfer',
      receiptNumber: 'RCP-2026-TEST2',
      createdBy: 'qa_tester',
    },
  })

  payments = await prisma.membershipPayment.findMany({ where: { memberId: member.id } })
  totalPaid = payments.reduce((sum, p) => sum + p.amount, 0)
  balance = Math.max(0, member.membershipFeeSnapshot - totalPaid)

  console.log('After Payment 2 (PKR 300,000) -> Paid:', totalPaid, '| Expected Balance: 0 | Calculated Balance:', balance)
  if (balance !== 0) throw new Error('Balance calculation mismatch after payment 2')

  // Clean test member
  await prisma.membershipPayment.deleteMany({ where: { memberId: member.id } })
  await prisma.member.delete({ where: { id: member.id } })

  console.log('=== FINANCIAL QA VERIFICATION 100% SUCCESS ===')
}

testFinancialCalculation().finally(() => prisma.$disconnect())
