import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import { PrismaClient, UserClient, UserCourier } from '../../src/generated/prisma/client';

import { EOrderStatus } from 'src/modules/orders/constants/order';
import {
    ACTIVE_ORDERS_COUNT,
  CENTER_COORDINATES,
  COMPLETED_ORDERS_COUNT,
  COORDINATES_RADIUS_KM,
  ORDERS_DATE_FROM,
} from './config';
import { randomPointAround } from './map';

function generateOrder(
  statuses: EOrderStatus[],
  dateRange: {
    from: string | Date,
    to: string | Date,
  },
  clients: UserClient[],
  couriers: UserCourier[],
) {
  const status = faker.helpers.arrayElement(statuses);
  const isClosed = [EOrderStatus.COMPLETED, EOrderStatus.CANCELLED].includes(status);
  const hasCourier = [EOrderStatus.COMPLETED, EOrderStatus.PROCESSING].includes(status) ? true : (
    status === EOrderStatus.CANCELLED ? faker.datatype.boolean() : false
  );

  const orderedAt = faker.date.between({
    from: dateRange.from,
    to: dateRange.to,
  });
  const completedAt = isClosed ? faker.date.between({
    from: orderedAt,
    to: dateRange.to,
  }) : undefined;

  const senderCoords = randomPointAround(CENTER_COORDINATES, COORDINATES_RADIUS_KM);
  const receiverCoords = randomPointAround(CENTER_COORDINATES, COORDINATES_RADIUS_KM);
  const courier = hasCourier ? faker.helpers.arrayElement(couriers) : null;

  const [sender, receiver] = faker.helpers.arrayElements(clients, 2);

  const numWeight = faker.number.float({ min: 0.1, max: 20, fractionDigits: 2 });
  const numVolume = faker.number.float({ min: 0.1, max: 100, fractionDigits: 2 });
  const numSizeA = faker.number.float({ min: 0.1, max: 100, fractionDigits: 2 });
  const numSizeB = faker.number.float({ min: 0.1, max: 100, fractionDigits: 2 });
  const numSizeC = faker.number.float({ min: 0.1, max: 100, fractionDigits: 2 });

  return {
    description: faker.commerce.product(),
    weight: `${numWeight} kg`,
    volume: `${numVolume} cm³`,
    size: `${numSizeA}x${numSizeB}x${numSizeC} cm`,
    ordered_at: orderedAt,
    completed_at: completedAt,
    sender_lat: senderCoords.lat,
    sender_lng: senderCoords.lng,
    receiver_lat: receiverCoords.lat,
    receiver_lng: receiverCoords.lng,
    sender_address: faker.location.streetAddress({ useFullAddress: true }),
    receiver_address: faker.location.streetAddress({ useFullAddress: true }),
    sender_id: sender.id,
    receiver_id: receiver.id,
    status,
    courier_id: courier?.id ?? null,
  };
}

async function seedOrders(prismaClient: PrismaClient, clients: UserClient[], couriers: UserCourier[]) {
  const completedOrdersData = faker.helpers.multiple(() => generateOrder(
    [EOrderStatus.CANCELLED, EOrderStatus.COMPLETED],
    {
      from: ORDERS_DATE_FROM,
      to: new Date(),
    },
    clients,
    couriers,
  ), { count: COMPLETED_ORDERS_COUNT });

  const activeOrdersData = faker.helpers.multiple(() => generateOrder(
    [EOrderStatus.ORDERED, EOrderStatus.PROCESSING],
    {
      from: dayjs().subtract(1, 'day').toDate(),
      to: new Date(),
    },
    clients,
    couriers,
  ), { count: ACTIVE_ORDERS_COUNT });

  const completedOrders = await prismaClient.order.createManyAndReturn({
    data: completedOrdersData,
  });

  const activeOrders = await prismaClient.order.createManyAndReturn({
    data: activeOrdersData,
  });

  return {
    completedOrders,
    activeOrders,
  };
}

export default seedOrders;

