const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  // Seed default payment accounts
  const accounts = [
    {
      provider: 'Easypaisa',
      accountTitle: 'Markhor Club',
      accountNumber: '00923125116164',
      currency: 'PKR',
      isActive: true,
      displayOnPublicPage: true,
      verificationMode: 'MANUAL',
      description: 'Easypaisa mobile wallet for membership payments',
    },
    {
      provider: 'UBL',
      accountTitle: 'Markhor Group Pvt. Ltd.',
      accountNumber: '0511247411492',
      currency: 'PKR',
      isActive: true,
      displayOnPublicPage: true,
      verificationMode: 'MANUAL',
      description: 'UBL bank account for membership payments',
    },
  ];

  for (const acc of accounts) {
    const existing = await prisma.paymentAccount.findFirst({
      where: { provider: acc.provider, accountNumber: acc.accountNumber },
    });
    if (!existing) {
      await prisma.paymentAccount.create({ data: acc });
      console.log(`Created payment account: ${acc.provider} - ${acc.accountNumber}`);
    } else {
      console.log(`Payment account already exists: ${acc.provider}`);
    }
  }

  // Seed default club settings
  const settings = [
    { key: 'club_name', value: 'Markhor Club', description: 'Club display name' },
    { key: 'club_email', value: 'info@markhourgroup.com', description: 'Business email' },
    { key: 'club_phone', value: '0995-111-222-333', description: 'Business phone / UAN' },
    { key: 'club_website', value: 'www.markhourgroup.com', description: 'Website URL' },
    { key: 'club_address', value: 'Near Alexander Road, Khanpur Dam, KPK, Pakistan', description: 'Address / Location description' },
    { key: 'club_currency', value: 'PKR', description: 'Default currency' },
    { key: 'club_default_fee', value: '500000', description: 'Default membership fee (PKR)' },
  ];

  for (const s of settings) {
    const existing = await prisma.appSetting.findUnique({ where: { key: s.key } });
    if (!existing) {
      await prisma.appSetting.create({ data: s });
      console.log(`Created setting: ${s.key}`);
    } else {
      console.log(`Setting already exists: ${s.key}`);
    }
  }

  console.log('Seed complete.');
}

seed().catch(console.error).finally(() => prisma.$disconnect());
