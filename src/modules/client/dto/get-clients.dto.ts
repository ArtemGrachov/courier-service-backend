import { IsEnum, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

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
  @MinLength(3)
  phone?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  search?: string;

  @IsOptional()
  @IsEnum(EClientsSortBy)
  sortBy?: EClientsSortBy;

  @IsOptional()
  @IsEnum(ESortOrder)
  sortOrder?: ESortOrder;
}

