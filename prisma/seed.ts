import { PrismaClient, Condition } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import fs from 'fs';
import path from 'path';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });
const configPath = path.join(process.cwd(), 'config', 'settings.development.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

async function main() {
  console.log('Seeding database...');
  if (config.defaultData) {
    for (const item of config.defaultData) {
      console.log(`  Adding stuff: ${item.name}`);
      const existingItem = await prisma.stuff.findFirst({
        where: { name: item.name, owner: item.owner },
      });
      if (!existingItem) {
        await prisma.stuff.create({
          data: {
            name: item.name,
            quantity: item.quantity,
            owner: item.owner,
            condition: item.condition as Condition,
          },
        });
      }
    }
  }
  if (config.defaultContacts) {
    for (const contact of config.defaultContacts) {
      console.log(`  Adding contact: ${contact.firstName} ${contact.lastName}`);
      const existingContact = await prisma.contact.findFirst({
        where: {
          firstName: contact.firstName,
          lastName: contact.lastName,
          owner: contact.owner,
        },
      });
      if (!existingContact) {
        await prisma.contact.create({
          data: contact,
        });
      }
    }
  }
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
