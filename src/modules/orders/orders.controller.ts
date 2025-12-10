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
import { EOrderStatus } from './constants/order';

import { ParseIntArrayPipe } from 'src/pipes/parse-int-array/parse-int-array.pipe';

import { Roles } from '../auth/decorators/role.decorator';

import { CreateOrderService } from './services/create-order/create-order.service';
import { GetOrdersService } from './services/get-orders/get-orders.service';
import { GetOrderService } from './services/get-order/get-order.service';
import { AcceptOrderService } from './services/accept-order/accept-order.service';
import { CompleteOrderService } from './services/complete-order/complete-order.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { CompleteOrderDto } from './dto/complete-order.dto';

import type { IRequstUser } from 'src/types/auth/request-user';

import { OrderAlreadyAcceptedException } from './exceptions/order-already-accepted.exception';
import { OrderAlreadyCompletedException } from './exceptions/order-already-completed.exception';
import { OrderNotAcceptedException } from './exceptions/order-not-accepted.exception';
import { OrderNotProcessingException } from './exceptions/order-not-processing.exception';

@Controller('orders')
export class OrdersController {
  constructor(
    private createOrderService: CreateOrderService,
    private getOrdersService: GetOrdersService,
    private getOrderService: GetOrderService,
    private acceptOrderService: AcceptOrderService,
    private completeOrderService: CompleteOrderService,
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
    @Query('couriers', new ParseIntArrayPipe({ optional: true })) couriers?: number[],
  ) {
    const result = await this.getOrdersService.getOrders({ page, itemsPerPage, couriers });
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

    if (order.courierId != null) {
      throw new OrderAlreadyAcceptedException();
    }

    await this.acceptOrderService.acceptOrder(requestUser, id);

    return {
      message: 'ORDER_ACCEPTED_SUCCESSFULLY',
    };
  }

  @Patch(':id/complete')
  @Roles([ERoles.COURIER])
  @UsePipes(new ValidationPipe({ transform: true }))
  public async completeOrder(
    @Request() req: ExpressRequest,
    @Param('id', new ParseIntPipe) id: number,
    @Body() { senderRating, receiverRating }: CompleteOrderDto,
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

    if (order.courierId == null) {
      throw new OrderNotAcceptedException();
    }

    if (order.status === EOrderStatus.COMPLETED) {
      throw new OrderAlreadyCompletedException();
    }

    if (order.status !== EOrderStatus.PROCESSING) {
      throw new OrderNotProcessingException();
    }

    await this.completeOrderService.completeOrder(requestUser, id, senderRating, receiverRating);

    return {
      message: 'ORDER_COMPLETED_SUCCESSFULLY',
    };
  }
}

