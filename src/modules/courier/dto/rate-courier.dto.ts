import { IsNumber } from 'class-validator';

export class RateCourierDto {
  @IsNumber()
  rating: number;

  @IsNumber()
  orderId: number;
}

