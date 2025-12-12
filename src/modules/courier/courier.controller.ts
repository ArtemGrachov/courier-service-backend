import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { ERoles } from 'src/constants/auth';
import { CreateCourierDto } from './dto/create-courier.dto';

import { CreateCourierService } from './services/create-courier/create-courier.service';

import { Roles } from '../auth/decorators/role.decorator';
import { ApiResponse } from 'src/responses/response';

@Controller('courier')
export class CourierController {
  constructor(private createCourierService: CreateCourierService) {}

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
