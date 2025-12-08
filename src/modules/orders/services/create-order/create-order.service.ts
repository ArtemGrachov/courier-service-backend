import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../../dto/create-order.dto';

import { UserClient } from 'src/generated/prisma/browser';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class CreateOrderService {
  constructor(private prismaService: PrismaService) {}

  public async createOrder(
    senderId: number,
    {
      description,
      weight,
      size,
      volume,
      senderAddress,
      senderLat,
      senderLng,
      receiverAddress,
      receiverLng,
      receiverLat,
      receiverId,
      receiverPhone,
      receiverName,
    }: CreateOrderDto
  ) {
    let receiver: UserClient | null = null;

    if (receiverId) {
      receiver = await this.prismaService.userClient.findUnique({ where: { id: receiverId } });
    } else if (receiverPhone) {
      receiver = await this.prismaService.userClient.findFirst({ where: { phone: receiverPhone } });
    }

    if (!receiver) {
      receiver = await this.prismaService.userClient.create({
        data: {
          email: '',
          name: receiverName!,
          phone: receiverPhone!,
          passwordHash: '',
        },
      });
    }

    const order = await this.prismaService.order.create({
      data: {
        description,
        weight,
        size,
        volume,
        senderAddress,
        senderLat,
        senderLng,
        receiverAddress,
        receiverLng,
        receiverLat,
        senderId,
        receiverId: receiver.id,
      },
    });

    return order;
  }
}

