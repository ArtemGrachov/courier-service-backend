import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { Transform } from 'class-transformer';

import { ECourierStatus } from '../constants/courier-status';
import { ECouriersSortBy } from '../services/get-couriers/constants';
import { ESortOrder } from 'src/constants/sort';

import { toArray } from 'src/utils/to-array';

export class GetCouriersDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  itemsPerPage: number = 10;

  @IsOptional()
  @Transform(toArray)
  @IsEnum(ECourierStatus, { each: true })
  status?: ECourierStatus[];

  @IsOptional()
  @IsEnum(ECouriersSortBy)
  sortBy?: ECouriersSortBy;

  @IsOptional()
  @IsEnum(ESortOrder)
  sortOrder?: ESortOrder;
}

