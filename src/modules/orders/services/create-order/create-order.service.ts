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
          email: `noemail_${receiverPhone}`,
          name: receiverName!,
          phone: receiverPhone!,
          password_hash: '',
        },
      });
    }


    const order = await this.prismaService.$transaction(async tx => {
      const order = await tx.order.create({
        data: {
          description,
          weight,
          size,
          volume,
          sender_address: senderAddress,
          sender_lat: senderLat,
          sender_lng: senderLng,
          receiver_address: receiverAddress,
          receiver_lat: receiverLat,
          receiver_lng: receiverLng,
          sender_id: senderId,
          receiver_id: receiver.id,
          courier_id: null,
          ordered_at: new Date().getTime(),
        },
      });

      await Promise.all([
        tx.userClient.update({
          where: {
            id: order.sender_id,
          },
          data: {
            active_orders_count: {
              increment: 1,
            },
          },
        }),
        tx.userClient.update({
          where: {
            id: order.receiver_id,
          },
          data: {
            active_orders_count: {
              increment: 1,
            },
          },
        }),
      ]);

      return order;
    });

    return order;
  }
}

