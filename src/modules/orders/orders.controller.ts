import { Body, Controller, Get, ParseIntPipe, Post, Query, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';

import { ERoles } from 'src/constants/auth';

import { Roles } from '../auth/decorators/role.decorator';

import { PrismaService } from '../prisma/services/prisma.service';
import { CreateOrderService } from './services/create-order/create-order.service';
import { GetOrdersService } from './services/get-orders/get-orders.service';

import { CreateOrderDto } from './dto/create-order.dto';

import type { IRequstUser } from 'src/types/auth/request-user';

@Controller('orders')
export class OrdersController {
  constructor(
    private createOrderService: CreateOrderService,
    private getOrdersService: GetOrdersService,
  ) {}

  @Post('')
  @Roles([ERoles.CLIENT])
  @UsePipes(new ValidationPipe({ transform: true }))
  public async createOrder(
    @Request() req: ExpressRequest,
    @Body() payload: CreateOrderDto,
  ) {
    const requestUser = req['user'] as IRequstUser;
    return this.createOrderService.createOrder(requestUser.id, payload);
  }

  @Get('')
  public async getOrders(
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('itemsPerPage', new ParseIntPipe({ optional: true })) itemsPerPage: number = 10,
  ) {
    const result = await this.getOrdersService.getOrders({ page, itemsPerPage });
    return result;
  }
}

