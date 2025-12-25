import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL_RUNTIME });
    super({
      adapter,
      omit: {
        userAdmin: {
          password_hash: true,
        },
        userCourier: {
          password_hash: true,
        },
        userClient: {
          password_hash: true,
        },
      },
    });
  }
}

