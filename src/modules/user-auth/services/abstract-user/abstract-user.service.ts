import type { IAbstractUser } from '../../types/abstract-user';

export abstract class AbstractUserService {
  abstract userByEmail(email: string): Promise<IAbstractUser | null>;
  abstract userById(id: number): Promise<IAbstractUser | null>;
  abstract updatePassword(userId: number, passwordHash: string): Promise<IAbstractUser>;
}

