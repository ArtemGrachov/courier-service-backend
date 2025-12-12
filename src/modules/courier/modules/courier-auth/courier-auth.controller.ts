import { Body, Controller, HttpCode, Post, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import type { Request as ExpressRequest } from 'express';

import { ERoles } from 'src/constants/auth';

import { ApiResponse } from 'src/responses/response';

import { Roles } from 'src/modules/auth/decorators/role.decorator';

import { ForgotPasswordService } from 'src/modules/user-auth/services/forgot-password/forgot-password.service';
import { LoginService } from 'src/modules/user-auth/services/login/login.service';
import { ResetPasswordService } from 'src/modules/user-auth/services/reset-password/reset-password.service';
import { ChangePasswordService } from 'src/modules/user-auth/services/change-password/change-password.service';
import { AuthTokenService } from 'src/modules/user-auth/services/auth-token/auth-token.service';

import { LoginDto } from 'src/dto/login.dto';
import { ForgotPasswordDto } from 'src/dto/forgot-password.dto';
import { ResetPasswordDto } from 'src/dto/reset-password.dto';
import { ChangePasswordDto } from 'src/dto/change-password.dto';

import { IRequstUser } from 'src/types/auth/request-user';

@Controller('courier/auth')
export class CourierAuthController {
  constructor(
    private loginService: LoginService,
    private forgotPasswordService: ForgotPasswordService,
    private resetPasswordService: ResetPasswordService,
    private changePasswordService: ChangePasswordService,
    private authTokenService: AuthTokenService,
  ) {}

  @Post('login')
  @Roles([ERoles.GUEST])
  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  public async login(@Body() { email, password }: LoginDto) {
    return new ApiResponse(
      `Logged in successfully`,
      'LOG_IN_SUCCESS',
      await this.loginService.login(email, password),
    );
  }

  @Post('forgot-password')
  @Roles([ERoles.GUEST])
  @UsePipes(new ValidationPipe({ transform: true }))
  public async forgotPassword(@Body() { email }: ForgotPasswordDto) {
    await this.forgotPasswordService.forgotPassword(email);

    return new ApiResponse(
      `Forgot password link sent to ${email}`,
      'FORGOT_PASSWORD_LINK_SENT',
      { email },
    );
  }

  @Post('reset-password')
  @Roles([ERoles.GUEST])
  @UsePipes(new ValidationPipe({ transform: true }))
  public async resetPassword(@Body() { token, password }: ResetPasswordDto) {
    await this.resetPasswordService.resetPassword(token, password);

    return new ApiResponse(
      'Password reset successfully',
      'PASSWORD_RESET_SUCCESSFULLY',
    );
  }

  @Post('change-password')
  @Roles([ERoles.COURIER])
  @UsePipes(new ValidationPipe({ transform: true }))
  public async changePassword(
    @Request() req: ExpressRequest,
    @Body() { password }: ChangePasswordDto,
  ) {
    const requestUser = req['user'] as IRequstUser;
    const user = await this.changePasswordService.changePassword(requestUser.id, password);

    return new ApiResponse(
      `Password has been changed successfully`,
      'PASSWORD_CHANGED_SUCCESSFULLY',
      {
        token: await this.authTokenService.authToken(user),
      },
    );
  }
}
