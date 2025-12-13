import { IsEnum, IsInt, IsNumber, IsOptional, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

import { EOrderStatus } from '../constants/order';
import { EOrdersSortBy } from '../services/get-orders/constants';
import { ESortOrder } from 'src/constants/sort';

import { toArray } from 'src/utils/to-array';

export class GetOrdersDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  itemsPerPage: number = 10;

  @IsOptional()
  @IsInt({ each: true })
  @Transform(toArray)
  @Type(() => Number)
  couriers?: number[];

  @IsOptional()
  @IsInt({ each: true })
  @Transform(toArray)
  @Type(() => Number)
  senders?: number[];

  @IsOptional()
  @IsInt({ each: true })
  @Transform(toArray)
  @Type(() => Number)
  receivers?: number[];

  @IsOptional()
  @Transform(toArray)
  @IsEnum(EOrderStatus, { each: true })
  status?: EOrderStatus[];

  @IsOptional()
  @IsEnum(EOrdersSortBy)
  sortBy?: EOrdersSortBy;

  @IsOptional()
  @IsEnum(ESortOrder)
  sortOrder?: ESortOrder;
}

