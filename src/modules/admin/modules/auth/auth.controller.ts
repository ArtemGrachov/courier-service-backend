import { Body, Controller, HttpCode, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

import { ForgotPasswordService } from './services/forgot-password/forgot-password.service';
import { LoginService } from './services/login/login.service';
import { ResetPasswordService } from './services/reset-password/reset-password.service';
import { ChangePasswordService } from './services/change-password/change-password.service';

import { AuthGuard } from './guards/auth/auth.guard';

import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('admin/auth')
export class AuthController {
  constructor(
    private loginService: LoginService,
    private forgotPasswordService: ForgotPasswordService,
    private resetPasswordService: ResetPasswordService,
    private changePasswordService: ChangePasswordService,
  ) {}

  @Post('login')
  @HttpCode(200)
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

  @Post('reset-password')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async resetPassword(@Body() { token, password }: ResetPasswordDto) {
    await this.resetPasswordService.resetPassword(token, password);
  }

  @UseGuards(AuthGuard)
  @Post('change-password')
  @UsePipes(new ValidationPipe({ transform: true }))
  public async changePassword(@Body() { password, confirmPassword }: ChangePasswordDto) {
    await this.changePasswordService.changePassword(password, confirmPassword);
  }
}

