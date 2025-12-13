import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

import { EClientsSortBy } from '../services/get-clients/constants';
import { ESortOrder } from 'src/constants/sort';

export class GetClientsDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(1)
  itemsPerPage: number = 10;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEnum(EClientsSortBy)
  sortBy?: EClientsSortBy;

  @IsOptional()
  @IsEnum(ESortOrder)
  sortOrder?: ESortOrder;
}

