import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json' with { type: 'json' };

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');
  const password = await hash('changeme', 10);
  config.defaultAccounts.forEach(async (account) => {
    let role: Role = 'USER';
    if (account.role === 'ADMIN')
    {
      role = 'ADMIN';
    }
    console.log(`Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email : account.email },
      update : {},
      create : {
        email: account.email,
        password,
        role,
      },
    });
  });
  await Promise.all(
    config.defaultContacts.map(async (contact, index) => {
    console.log(`Adding contact: ${contact.firstName} ${contact.lastName}`);
    return prisma.contact.upsert({
      where: { id: index + 1 }, // Note: Using index + 1 so IDs start at 1 instead of 0
      update: {},
      create: {
        firstName: contact.firstName,
        lastName: contact.lastName,
        address: contact.address,
        image: contact.image,
        description: contact.description,
        owner: contact.owner,
      },
      });
    })
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
  