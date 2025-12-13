import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { EOrderStatus } from 'src/modules/orders/constants/order';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import { RateCourierDto } from '../../dto/rate-courier.dto';
import { OrderWrongCourierException } from '../../exceptions/order-wrong-courier.exception';
import { OrderNotCompletedException } from '../../exceptions/order-not-completed.exception';

@Injectable()
export class RateCourierService {
  constructor(private prismaService: PrismaService) {}

  public async validateRateCourier(clientId: number, courierId: number, payload: RateCourierDto) {
    const orderId = payload.orderId;

    const order = await this.prismaService.order.findUnique({ where: { id: orderId } });

    if (!order) {
      throw new NotFoundException();
    }

    if (order.senderId !== clientId && order.receiverId !== clientId) {
      throw new ForbiddenException();
    }

    if (order.courierId !== courierId) {
      throw new OrderWrongCourierException(orderId, courierId)
    }

    if (order.status !== EOrderStatus.COMPLETED) {
      throw new OrderNotCompletedException(orderId);
    }

  }

  public async rateCourier(clientId: number, courierId: number, payload: RateCourierDto) {
    const orderId = payload.orderId;

    await this.prismaService.courierRate.create({
      data: {
        clientId,
        courierId,
        orderId,
        rating: payload.rating,
      },
    });
  }
}

