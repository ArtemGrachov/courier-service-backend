import { faker } from '@faker-js/faker';

import { PrismaClient } from '../../src/generated/prisma/client';
import { COURIER_STATUSES } from 'src/modules/courier/constants/courier-status';
import { randomPointAround } from './map';
import { CENTER_COORDINATES, COORDINATES_RADIUS_KM, COURIERS_COUNT } from './config';

function generateCourier(positionId: number) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    name: faker.person.fullName({ firstName, lastName }),
    email: faker.internet.email({ firstName, lastName }),
    status: faker.helpers.arrayElement(COURIER_STATUSES),
    position_id: positionId,
    phone: faker.phone.number({
      style: 'international',
    }),
    password_hash: '',
  };
}

function generateCourierPosition() {
  return randomPointAround(CENTER_COORDINATES, COORDINATES_RADIUS_KM);
}

async function seedCouriers(prismaClient: PrismaClient) {
  const count = COURIERS_COUNT;

  const positionsData = faker.helpers.multiple(generateCourierPosition, { count });

  const positions = await prismaClient.position.createManyAndReturn({
    data: positionsData,
  });

  const couriersData = faker.helpers.multiple((_, i) => generateCourier(positions[i].id), { count });

  const couriers = await prismaClient.userCourier.createManyAndReturn({
    data: couriersData,
  });

  return couriers;
}

export default seedCouriers;

