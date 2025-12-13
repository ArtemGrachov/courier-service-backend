import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';

import { ERoles } from 'src/constants/auth';

import { CreateCourierService } from './services/create-courier/create-courier.service';
import { GetCouriersService } from './services/get-couriers/get-couriers.service';
import { UpdateCourierService } from './services/update-courier/update-courier.service';

import { Roles } from '../auth/decorators/role.decorator';

import { CreateCourierDto } from './dto/create-courier.dto';
import { GetCouriersDto } from './dto/get-couriers.dto';
import { ApiResponse } from 'src/responses/response';
import { UpdateCourierDto } from './dto/update-courier.dto';

@Controller('courier')
export class CourierController {
  constructor(
    private createCourierService: CreateCourierService,
    private getCouriersService: GetCouriersService,
    private updateCourierService: UpdateCourierService,
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
