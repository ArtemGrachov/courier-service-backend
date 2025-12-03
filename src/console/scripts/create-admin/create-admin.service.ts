import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { PrismaService } from '../../../prisma.service';

@Injectable()
export class CreateAdminService {
  constructor(private prismaService: PrismaService) {}

  public async createAdmin() {
    const email = process.argv[3];
    const password = process.argv[4];

    if (!email || !password) {
      console.warn('This command required email and password');
      console.info('Example: "npm run create-admin -- admin@test.com Password1!"');
      return;
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await this.prismaService.userAdmin.create({
      data: {
        email,
        passwordHash,
      }
    })
  }
}

