import { faker } from '@faker-js/faker';
import { PrismaClient, Order } from '../../src/generated/prisma/client';
import { ClientRateCreateManyInput, CourierRateCreateManyInput } from 'src/generated/prisma/models';

function generateOrderRates(order: Order) {
  if (!order.courier_id) {
    return null;
  }

  const senderRate: ClientRateCreateManyInput = {
    rating: faker.number.int({ min: 0, max: 5 }),
    client_id: order.sender_id,
    order_id: order.id,
    courier_id: order.courier_id,
  };

  const receiverRate: ClientRateCreateManyInput = {
    rating: faker.number.int({ min: 0, max: 5 }),
    client_id: order.receiver_id,
    order_id: order.id,
    courier_id: order.courier_id,
  };

  const courierSenderRate: CourierRateCreateManyInput = {
    rating: faker.number.int({ min: 0, max: 5 }),
    client_id: order.sender_id,
    order_id: order.id,
    courier_id: order.courier_id,
  };

  const courierReceiverRate: CourierRateCreateManyInput = {
    rating: faker.number.int({ min: 0, max: 5 }),
    client_id: order.receiver_id,
    order_id: order.id,
    courier_id: order.courier_id,
  };

  return {
    senderRate,
    receiverRate,
    courierSenderRate,
    courierReceiverRate,
  };
}

async function seedRates(prismaClient: PrismaClient, orders: Order[]) {
  const rates = orders.map(order => generateOrderRates(order));
  const {
    clientRatesData,
    courierRatesData,
  } = rates.reduce((acc, curr) => {
    if (!curr) {
      return acc;
    }

    acc.clientRatesData.push(curr.senderRate, curr.receiverRate);
    acc.courierRatesData.push(curr.courierSenderRate, curr.courierReceiverRate);
    return acc;
  }, {
    clientRatesData: [] as ClientRateCreateManyInput[],
    courierRatesData: [] as CourierRateCreateManyInput[],
  });

  await prismaClient.clientRate.createMany({ data: clientRatesData });
  await prismaClient.courierRate.createMany({ data: courierRatesData });
}

export default seedRates;

