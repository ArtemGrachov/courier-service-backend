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
import { type Request as ExpressRequest } from 'express';

import { ERoles } from 'src/constants/auth';
import { EOrderStatus } from './constants/order';

import { ApiResponse } from 'src/responses/response';

import { Roles } from '../auth/decorators/role.decorator';

import { CreateOrderService } from './services/create-order/create-order.service';
import { GetOrdersService } from './services/get-orders/get-orders.service';
import { GetOrderService } from './services/get-order/get-order.service';
import { AcceptOrderService } from './services/accept-order/accept-order.service';
import { CompleteOrderService } from './services/complete-order/complete-order.service';
import { RejectOrderService } from './services/reject-order/reject-order.service';
import { CancelOrderService } from './services/cancel-order/cancel-order.service';

import { CreateOrderDto } from './dto/create-order.dto';
import { CompleteOrderDto } from './dto/complete-order.dto';
import { GetOrdersDto } from './dto/get-orders.dto';

import type { IRequstUser } from 'src/types/auth/request-user';

import { OrderAlreadyAcceptedException } from './exceptions/order-already-accepted.exception';
import { OrderAlreadyCompletedException } from './exceptions/order-already-completed.exception';
import { OrderNotAcceptedException } from './exceptions/order-not-accepted.exception';
import { OrderNotProcessingException } from './exceptions/order-not-processing.exception';
import { OrderAlreadyCancelledException } from './exceptions/order-already-cancelled.exception';

@Controller('orders')
export class OrdersController {
  constructor(
    private createOrderService: CreateOrderService,
    private getOrdersService: GetOrdersService,
    private getOrderService: GetOrderService,
    private acceptOrderService: AcceptOrderService,
    private completeOrderService: CompleteOrderService,
    private rejectOrderService: RejectOrderService,
    private cancelOrderService: CancelOrderService,
  ) {}

  @Post('')
  @Roles([ERoles.CLIENT])
  @UsePipes(new ValidationPipe({ transform: true }))
  public async createOrder(
    @Request() req: ExpressRequest,
    @Body() payload: CreateOrderDto,
  ) {
    const requestUser = req['user'] as IRequstUser;

    const order = await this.createOrderService.createOrder(requestUser.id, payload);

    return new ApiResponse(
      'ORDER_CREATED_SUCCESSFULLY',
      'Order created successfully',
      { order },
    );
  }

  @Get('')
  @Roles([ERoles.ADMIN, ERoles.COURIER, ERoles.CLIENT])
  public async getOrders(
    @Request() req: ExpressRequest,
    @Query(new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
    })) query: GetOrdersDto,
  ) {
    const requestUser = req['user'] as IRequstUser;

    const result = await this.getOrdersService.getOrders(requestUser, query);

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
      throw new OrderAlreadyAcceptedException(order.id);
    }

    if (order.status === EOrderStatus.CANCELLED) {
      throw new OrderAlreadyCancelledException(order.id);
    }

    await this.acceptOrderService.acceptOrder(requestUser, id);

    return new ApiResponse(
      'ORDER_ACCEPTED_SUCCESSFULLY',
      `Order ${order.id} accepted successfully`,
      { order },
    );
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
      throw new OrderNotAcceptedException(order.id);
    }

    if (order.status === EOrderStatus.COMPLETED) {
      throw new OrderAlreadyCompletedException(order.id);
    }

    if (order.status === EOrderStatus.CANCELLED) {
      throw new OrderAlreadyCancelledException(order.id);
    }

    if (order.status !== EOrderStatus.PROCESSING) {
      throw new OrderNotProcessingException(order.id);
    }

    await this.completeOrderService.completeOrder(requestUser, id, senderRating, receiverRating);

    return new ApiResponse(
      'ORDER_COMPLETED_SUCCESSFULLY',
      `Order ${order.id} completed successfully`,
      { order },
    );
  }

  @Patch(':id/reject')
  @Roles([ERoles.COURIER])
  public async rejectOrder(
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

    if (order.status === EOrderStatus.COMPLETED) {
      throw new OrderAlreadyCompletedException(order.id);
    }

    if (order.status === EOrderStatus.CANCELLED) {
      throw new OrderAlreadyCancelledException(order.id);
    }

    await this.rejectOrderService.rejectOrder(requestUser, id);

    return new ApiResponse(
      'ORDER_REJECTED_SUCCESSFULLY',
      `Order ${order.id} rejected successfully`,
      { order },
    );
  }

  @Post(':id/cancel')
  @Roles([ERoles.ADMIN, ERoles.CLIENT])
  public async cancelOrder(
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

    if (order.status === EOrderStatus.COMPLETED) {
      throw new OrderAlreadyCompletedException(order.id);
    }

    if (order.status === EOrderStatus.CANCELLED) {
      throw new OrderAlreadyCancelledException(order.id);
    }

    await this.cancelOrderService.cancelOrder(requestUser, id);

    return new ApiResponse(
      'ORDER_CANCELLED_SUCCESSFULLY',
      `Order ${order.id} cancelled successfully`,
      { order },
    );
  }
}

