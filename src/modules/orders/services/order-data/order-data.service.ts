import { Injectable, Scope } from '@nestjs/common';
import { OrderFindUniqueArgs, OrderModel } from 'src/generated/prisma/models';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable({
  scope: Scope.REQUEST,
})
export class OrderDataService {
  private _order: OrderModel | null = null;

  constructor(private prismaService: PrismaService) {}

  public get order() {
    return this._order;
  }

  public async getOrder(query: OrderFindUniqueArgs) {
    if (this._order) {
      return this._order;
    }

    const order = await this.prismaService.order.findUnique(query);

    this._order = order;
    return order;
  }
}

