import { faker } from '@faker-js/faker';

import { PrismaClient } from '../../src/generated/prisma/client';
import { CLIENTS_COUNT } from './config';

function generateClient() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    name: faker.person.fullName({ firstName, lastName }),
    email: faker.internet.email({ firstName, lastName }),
    phone: faker.phone.number({
      style: 'international',
    }),
    password_hash: '',
  };
}

async function seedClients(prismaClient: PrismaClient) {
  const clientsData = faker.helpers.multiple(generateClient, {
    count: CLIENTS_COUNT,
  });

  const clients = await prismaClient.userClient.createManyAndReturn({
    data: clientsData,
  });

  return clients;
}

export default seedClients;

