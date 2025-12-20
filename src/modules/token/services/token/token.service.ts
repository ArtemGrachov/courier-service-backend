import { Injectable } from '@nestjs/common';
import crypto from 'crypto';

@Injectable()
export class TokenService {
  public createToken() {
    return crypto.randomBytes(32).toString('hex');
  }

  public hashToken(token: string) {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}

