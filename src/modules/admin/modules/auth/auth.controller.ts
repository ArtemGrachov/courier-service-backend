import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { ForgotPasswordService } from './services/forgot-password/forgot-password.service';
import { LoginService } from './services/login/login.service';

import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('admin/auth')
export class AuthController {
  constructor(
    private loginService: LoginService,
    private forgotPasswordService: ForgotPasswordService,
  ) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  public async login(@Body() { email, password }: LoginDto) {
    return this.loginService.login(email, password);
  }

  @Post('forgot-password')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async forgotPassword(@Body() { email }: ForgotPasswordDto) {
    await this.forgotPasswordService.forgotPassword(email);

    return {
      message: 'FORGOT_PASSWORD_LINK_SENT',
      email,
    };
  }
}

