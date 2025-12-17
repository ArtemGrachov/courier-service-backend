import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';
import { PasswordService } from 'src/modules/password/services/password/password.service';

import { CreateCourierDto } from '../../dto/create-courier.dto';

import { UserAlreadyExistsException } from 'src/exceptions/user-already-exists.exception';

@Injectable()
export class CreateCourierService {
  constructor(
    private passwordService: PasswordService,
    private prismaService: PrismaService,
  ) {}

  public async createCourier({ name, email, phone, password }: CreateCourierDto) {
    const passwordHash = password ? await this.passwordService.generatePasswordHash(password) : '';

    try {
      const courier = await this.prismaService.userCourier.create({
        data: {
          name,
          email,
          phone,
          password_hash: passwordHash,
          position: {
            create: {
              lat: 0,
              lng: 0,
            },
          },
        },
      });

      return courier;
    } catch (err) {
      const cause = err?.meta?.driverAdapterError?.cause;

      if (cause?.originalCode === 'SQLITE_CONSTRAINT_UNIQUE' && cause?.constraint?.fields?.includes('email')) {
        throw new UserAlreadyExistsException(email);
      }

      throw err;
    }
  }
}

