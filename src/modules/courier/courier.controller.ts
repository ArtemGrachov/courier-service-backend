import { Body, Controller, Get, ParseArrayPipe, ParseEnumPipe, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';

import { ERoles } from 'src/constants/auth';
import { ESortOrder } from 'src/constants/sort';
import { ECourierStatus } from './constants/courier-status';

import { CreateCourierService } from './services/create-courier/create-courier.service';
import { GetCouriersService } from './services/get-couriers/get-couriers.service';
import { ECouriersSortBy } from './services/get-couriers/constants';

import { Roles } from '../auth/decorators/role.decorator';

import { CreateCourierDto } from './dto/create-courier.dto';
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
    @Query('page', new ParseIntPipe({ optional: true })) page: number = 1,
    @Query('itemsPerPage', new ParseIntPipe({ optional: true })) itemsPerPage: number = 10,
    @Query('status', new ParseArrayPipe({ optional: true })) status?: ECourierStatus[],
    @Query('sortBy', new ParseEnumPipe(ECouriersSortBy, { optional: true })) sortBy?: ECouriersSortBy,
    @Query('sortOrder', new ParseEnumPipe(ESortOrder, { optional: true })) sortOrder?: ESortOrder,
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
