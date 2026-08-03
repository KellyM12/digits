import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, Role, Condition } from '@prisma/client';
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
  config.defaultData.forEach(async (data, index) => {
    let condition: Condition = 'good';
    if (data.condition === 'poor') {
      condition = 'poor';
    }
    else if (data.condition === 'excellent') {
      condition = 'excellent';
    }
    else {
      condition = 'fair';
    }
    console.log(`Adding stuf: ${data.name} (${data.owner}`);
    await prisma.stuff.upsert({
      where: { id : index },
      update : {},
      create : {
        name : data.name,
        quantity : data.quantity,
        owner : data.owner,
        condition
      },
    });
  });
  config.defaultContacts.forEach(async (contact, index) => {
    console.log(`Adding contact: ${contact.firstName} ${contact.lastName}`);
    await prisma.contact.upsert({
      where: { id : index },
      update : {},
      create : {
        firstName: contact.firstName,
        lastName: contact.lastName,
        address: contact.address,
        image: contact.image,
        description: contact.description,
        owner: contact.owner,
      },
    });
  });
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