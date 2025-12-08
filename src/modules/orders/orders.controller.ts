import { Body, Controller, Post, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';

import { ERoles } from 'src/constants/auth';

import { Roles } from '../auth/decorators/role.decorator';

import { CreateOrderService } from './services/create-order/create-order.service';

import { CreateOrderDto } from './dto/create-order.dto';

import type { IRequstUser } from 'src/types/auth/request-user';

@Controller('orders')
export class OrdersController {
  constructor(private createOrderService: CreateOrderService) {}

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
}

