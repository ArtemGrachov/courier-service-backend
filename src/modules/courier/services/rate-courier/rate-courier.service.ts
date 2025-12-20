import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { EOrderStatus } from 'src/modules/orders/constants/order';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import { RateCourierDto } from '../../dto/rate-courier.dto';
import { OrderWrongCourierException } from '../../exceptions/order-wrong-courier.exception';
import { OrderNotCompletedException } from '../../exceptions/order-not-completed.exception';
import { addRating } from 'src/utils/add-rating';

@Injectable()
export class RateCourierService {
  constructor(private prismaService: PrismaService) {}

  public async validateRateCourier(clientId: number, courierId: number, payload: RateCourierDto) {
    const orderId = payload.orderId;

    const order = await this.prismaService.order.findUnique({ where: { id: orderId } });

    if (!order) {
      throw new NotFoundException();
    }

    if (order.sender_id !== clientId && order.receiver_id !== clientId) {
      throw new ForbiddenException();
    }

    if (order.courier_id !== courierId) {
      throw new OrderWrongCourierException(orderId, courierId)
    }

    if (order.status !== EOrderStatus.COMPLETED) {
      throw new OrderNotCompletedException(orderId);
    }
  }

  public async rateCourier(clientId: number, courierId: number, payload: RateCourierDto) {
    const orderId = payload.orderId;

    const courier = await this.prismaService.userCourier.findUnique({
      where: {
        id: courierId,
      },
    });

    if (!courier) {
      throw new NotFoundException();
    }

    const rating = payload.rating;
    const { averageRating, count } = addRating(courier.rating ?? 0, courier.rating_count ?? 0, rating);

    await this.prismaService.$transaction(async tx => {
      await tx.courierRate.create({
        data: {
          client_id: clientId,
          courier_id: courierId,
          order_id: orderId,
          rating,
        },
      });

      await tx.userCourier.update({
        where: {
          id: courierId,
        },
        data: {
          rating: averageRating,
          rating_count: count,
        },
      });
    });
  }
}

