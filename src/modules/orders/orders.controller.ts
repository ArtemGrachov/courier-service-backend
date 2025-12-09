import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
  Param,
  Request,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  Patch,
  ForbiddenException,
} from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';

import { ERoles } from 'src/constants/auth';

import { Roles } from '../auth/decorators/role.decorator';

import { CreateOrderService } from './services/create-order/create-order.service';
import { GetOrdersService } from './services/get-orders/get-orders.service';
import { GetOrderService } from './services/get-order/get-order.service';
import { AcceptOrderService } from './services/accept-order/accept-order.service';

import { CreateOrderDto } from './dto/create-order.dto';

import { OrderAlreadyAcceptedException } from './exceptions/order-already-accepted.exception';
import type { IRequstUser } from 'src/types/auth/request-user';

@Controller('orders')
export class OrdersController {
  constructor(
    private createOrderService: CreateOrderService,
    private getOrdersService: GetOrdersService,
    private getOrderService: GetOrderService,
    private acceptOrderService: AcceptOrderService,
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

  @Get(':id')
  @Roles([ERoles.ADMIN, ERoles.COURIER, ERoles.CLIENT])
  public async getOrder(
    @Request() req: ExpressRequest,
    @Param('id', new ParseIntPipe) id: number,
  ) {
    const requestUser = req['user'] as IRequstUser;
    const order = await this.getOrderService.getOrder(id);

    if (!order) {
      throw new NotFoundException();
    }

    const hasAccess = this.getOrderService.checkOrderAccess(requestUser, order);

    if (!hasAccess) {
      throw new NotFoundException();
    }

    return order;
  }

  @Patch(':id/accept')
  @Roles([ERoles.COURIER])
  public async acceptOrder(
    @Request() req: ExpressRequest,
    @Param('id', new ParseIntPipe) id: number,
  ) {
    const requestUser = req['user'] as IRequstUser;
    const order = await this.getOrderService.getOrder(id);

    if (!order) {
      throw new NotFoundException();
    }

    const hasAccess = this.getOrderService.checkOrderAccess(requestUser, order);

    if (!hasAccess) {
      throw new ForbiddenException();
    }

    await this.acceptOrderService.acceptOrder(requestUser, id);

    if (order.courierId != null) {
      throw new OrderAlreadyAcceptedException();
    }

    return {
      message: 'ORDER_ACCEPTED_SUCCESSFULLY',
    };
  }
}

