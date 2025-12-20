import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../src/generated/prisma/client';
import seedClients from './clients';
import seedCouriers from './couriers';
import seedOrders from './orders';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

const prisma = new PrismaClient({
  adapter,
});

async function seed() {
  try {
    const clients = await seedClients(prisma);
    const couriers = await seedCouriers(prisma);
    await seedOrders(prisma, clients, couriers);
  } catch (err) {
    console.log(err?.meta?.driverAdapterError?.cause);
    throw err;
  }
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });

