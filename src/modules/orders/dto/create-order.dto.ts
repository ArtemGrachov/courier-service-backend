import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  weight: string;

  @IsNotEmpty()
  @IsString()
  size: string;

  @IsNotEmpty()
  @IsString()
  volume: string;

  @IsNotEmpty()
  @IsString()
  senderAddress: string;

  @IsNotEmpty()
  @IsNumber()
  senderLat: number;

  @IsNotEmpty()
  @IsNumber()
  senderLng: number;

  @IsNotEmpty()
  @IsString()
  receiverAddress: string;

  @IsNotEmpty()
  @IsNumber()
  receiverLat: number;

  @IsNotEmpty()
  @IsNumber()
  receiverLng: number;

  @ValidateIf(o => !o.receiverName && !o.receiverPhone)
  @IsNumber()
  receiverId?: number;

  @ValidateIf(o => !o.receiverId)
  @IsString()
  receiverName?: string;

  @ValidateIf(o => !o.receiverId)
  @IsString()
  receiverPhone?: string;
}

