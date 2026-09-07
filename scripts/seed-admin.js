const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function seedAdmin() {
  const username = 'Markhorclub';
  const password = '@Markhor786786@';
  const passwordHash = await bcrypt.hash(password, 10);

  const admin = await prisma.adminUser.upsert({
    where: { username },
    update: {
      passwordHash,
      isActive: true,
      role: 'superadmin',
      fullName: 'Markhor Administrator',
      email: 'admin@markhor.club'
    },
    create: {
      username,
      passwordHash,
      fullName: 'Markhor Administrator',
      email: 'admin@markhor.club',
      role: 'superadmin',
      isActive: true
    }
  });

  console.log('Admin user updated with password @Markhor786786@:', admin.username);
}

seedAdmin().catch(console.error).finally(() => prisma.$disconnect());
