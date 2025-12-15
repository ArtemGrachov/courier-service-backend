import { Injectable } from '@nestjs/common';

import { OrderDataService } from '../order-data/order-data.service';

import { ERoles } from 'src/constants/auth';

import type { Order } from 'src/generated/prisma/browser';
import type { IRequstUser } from 'src/types/auth/request-user';

@Injectable()
export class GetOrderService {
  constructor(private orderDataService: OrderDataService) {}

  public checkOrderAccess(requestUser: IRequstUser, order: Order) {
    switch (requestUser.role) {
      case ERoles.ADMIN: {
        return true;
      }
      case ERoles.CLIENT: {
        return order.senderId === requestUser.id || order.receiverId === requestUser.id;
      }
      case ERoles.COURIER: {
        return !order.courierId || order.courierId === requestUser.id;
      }
      default: {
        return false;
      }
    }
  }

  public async getOrder(id: number) {
    const order = await this.orderDataService.getOrder({
      where: {
        id,
      },
    });

    return order;
  }
}
