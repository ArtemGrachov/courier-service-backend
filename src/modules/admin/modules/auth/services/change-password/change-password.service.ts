import { Injectable } from '@nestjs/common';

@Injectable()
export class ChangePasswordService {
  changePassword(password: string, confirmPassword: string) {
    console.log('@todo', {  password, confirmPassword });
  }
}
