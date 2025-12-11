import { Injectable } from '@nestjs/common';
import crypto from 'crypto';

type AuthUuidKey = string | number;

@Injectable()
export class AuthUuidService {
  private _map = new Map<AuthUuidKey, string>();

  public get(key: AuthUuidKey) {
    const result = this._map.get(key);

    if (result) {
      return result;
    }

    return this.update(key);
  }

  public update(key: AuthUuidKey) {
    // TODO to remove, changed for debugging purposes
    const uuid = 'ABDEF'; // crypto.randomBytes(32).toString('hex');
    this._map.set(key, uuid);
    return uuid;
  }
}

