const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
  const adminCount = await prisma.adminUser.count();
  const admins = await prisma.adminUser.findMany({ select: { username: true, role: true } });
  console.log('Admin count:', adminCount);
  console.log('Admins:', JSON.stringify(admins));
}

check().catch(console.error).finally(() => prisma.$disconnect());
