import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateClientDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsOptional()
  phone: string;
}

