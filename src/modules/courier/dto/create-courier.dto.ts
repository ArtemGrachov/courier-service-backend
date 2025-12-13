import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateCourierDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  password: string;
}

