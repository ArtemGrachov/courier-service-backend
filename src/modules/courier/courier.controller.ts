import { Body, Controller, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';

import { ERoles } from 'src/constants/auth';

import { CreateCourierService } from './services/create-courier/create-courier.service';
import { GetCouriersService } from './services/get-couriers/get-couriers.service';

import { Roles } from '../auth/decorators/role.decorator';

import { CreateCourierDto } from './dto/create-courier.dto';
import { GetCouriersDto } from './dto/get-couriers.dto';
import { ApiResponse } from 'src/responses/response';

@Controller('courier')
export class CourierController {
  constructor(
    private createCourierService: CreateCourierService,
    private getCouriersService: GetCouriersService,
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
}
