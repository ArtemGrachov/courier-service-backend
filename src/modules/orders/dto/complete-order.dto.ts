import { IsNotEmpty, IsNumber } from 'class-validator';

export class CompleteOrderDto {
  @IsNotEmpty()
  @IsNumber()
  senderRating: number;

  @IsNotEmpty()
  @IsNumber()
  receiverRating: number;
}

