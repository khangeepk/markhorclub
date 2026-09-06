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

async function main() {
  const inq = await prisma.membershipInquiry.findFirst({
    where: { email: 'live-website-test@example.com' },
  })
  console.log('Stored DB Inquiry:', JSON.stringify(inq, null, 2))

  const auditLogs = await prisma.auditLog.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
  })
  console.log('Recent Audit Logs:', JSON.stringify(auditLogs, null, 2))
}

main().finally(() => prisma.$disconnect())
