import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  public async generatePasswordHash(password: string) {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  }
}

