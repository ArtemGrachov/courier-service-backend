import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

import { ECourierStatus } from '../constants/courier-status';
import { ECouriersSortBy } from '../services/get-couriers/constants';
import { ESortOrder } from 'src/constants/sort';

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
  @IsEnum(ECourierStatus)
  status?: ECourierStatus[];

  @IsOptional()
  @IsEnum(ECouriersSortBy)
  sortBy?: ECouriersSortBy;

  @IsOptional()
  @IsEnum(ESortOrder)
  sortOrder?: ESortOrder;
}

