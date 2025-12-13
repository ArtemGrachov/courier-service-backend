import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import type { Request as ExpressRequest } from 'express';

import { ERoles } from 'src/constants/auth';

import { CreateCourierService } from './services/create-courier/create-courier.service';
import { GetCouriersService } from './services/get-couriers/get-couriers.service';
import { UpdateCourierService } from './services/update-courier/update-courier.service';
import { RateCourierService } from './services/rate-courier/rate-courier.service';
import { GetCourierService } from './services/get-courier/get-courier.service';

import { Roles } from '../auth/decorators/role.decorator';

import { CreateCourierDto } from './dto/create-courier.dto';
import { GetCouriersDto } from './dto/get-couriers.dto';
import { UpdateCourierDto } from './dto/update-courier.dto';
import { RateCourierDto } from './dto/rate-courier.dto';
import { ApiResponse } from 'src/responses/response';
import { IRequstUser } from 'src/types/auth/request-user';


@Controller('courier')
export class CourierController {
  constructor(
    private createCourierService: CreateCourierService,
    private getCouriersService: GetCouriersService,
    private updateCourierService: UpdateCourierService,
    private rateCourierService: RateCourierService,
    private getCourierService: GetCourierService,
  ) {}

  @Get('')
  @Roles([ERoles.ADMIN])
  public async getCouriers(
    @Query(new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true
    })) {
      page,
      itemsPerPage,
      status,
      sortBy,
      sortOrder,
    }: GetCouriersDto,
  ) {
    const result = await this.getCouriersService.getCouriers({
      page,
      itemsPerPage,
      status,
      sortBy,
      sortOrder,
    });

    return result;
  }

  @Post('')
  @Roles([ERoles.ADMIN])
  @UsePipes(new ValidationPipe({ transform: true }))
  public async createCourier(@Body() payload: CreateCourierDto) {
    const courier = await this.createCourierService.createCourier(payload);

    return new ApiResponse(
      'Courier created successfully',
      'COURIER_CREATED_SUCCESSFULLY',
      { courier },
    );
  }

  @Get(':id')
  @Roles([ERoles.ADMIN])
  public async getCourier(@Param('id', new ParseIntPipe) id: number) {
    const courier = await this.getCourierService.getCourier(id);

    if (!courier) {
      throw new NotFoundException();
    }

    return courier;
  }

  @Post(':id/rate')
  @Roles([ERoles.CLIENT])
  @UsePipes(new ValidationPipe({ transform: true }))
  public async rateCourier(
    @Request() req: ExpressRequest,
    @Param('id', new ParseIntPipe) courierId: number,
    @Body() payload: RateCourierDto,
  ) {
    const requestUser = req['user'] as IRequstUser;
    const clientId = requestUser.id;

    await this.rateCourierService.validateRateCourier(clientId, courierId, payload);
    await this.rateCourierService.rateCourier(clientId, courierId, payload);

    return new ApiResponse(
      'Client was rated successfully',
      'CLIENT_RATED_SUCCESSFULLY',
    );
  }

  @Patch('self')
  @Roles([ERoles.COURIER])
  @UsePipes(new ValidationPipe({ transform: true }))
  public async selfUpdateCourier(
    @Request() req: ExpressRequest,
    @Body() payload: UpdateCourierDto,
  ) {
    const requestUser = req['user'] as IRequstUser;
    const courier = await this.updateCourierService.updateCourier(requestUser.id, payload);

    return new ApiResponse(
      'You data was updated successfully',
      'YOUR_DATA_UPDATED_SUCCESSFULLY',
      { courier },
    );
  }

  @Patch(':id')
  @Roles([ERoles.ADMIN])
  @UsePipes(new ValidationPipe({ transform: true }))
  public async updateCourier(
    @Param('id', new ParseIntPipe) id: number,
    @Body() payload: UpdateCourierDto,
  ) {
    const courier = await this.updateCourierService.updateCourier(id, payload);

    return new ApiResponse(
      'Courier updated successfully',
      'COURIER_UPDATED_SUCCESSFULLY',
      { courier },
    );
  }
}

