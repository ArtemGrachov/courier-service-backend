import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from './generated/prisma/browser';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async order(orderWhereUniqueInput: Prisma.OrderWhereUniqueInput) {
    return this.prisma.order.findUnique({
      where: orderWhereUniqueInput,
    });
  }

  async orders() {
    return this.prisma.order.findMany();
  }
}

