import { Injectable } from '@nestjs/common';

import { ParametersService } from 'src/console/modules/parameters/services/parameters/parameters.service';
import { PasswordService } from 'src/modules/password/services/password/password.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class CreateAdminService {
  constructor(
    private parametersService: ParametersService,
    private passwordService: PasswordService,
    private prismaService: PrismaService,
  ) {}

  private info() {
    console.info('This script creates admin data by given email and password');
    console.info('Example: "npm run create-admin -- admin@test.com Password1!"');
    console.info('Both parameters are mandatory');
  }

  public async createAdmin() {
    const { email, password } = this.parametersService.parameters;

    const existingAdmin = await this.prismaService.userAdmin.findFirst({
      where: {
        email,
      },
    });

    if (existingAdmin) {
      console.error(`Admin user with email "${email}" already exists.`);
      return;
    }

    if (!email || !password) {
      this.info();
      console.error('No email or password specified');
      return;
    }

    const passwordHash = await this.passwordService.generatePasswordHash(password);

    await this.prismaService.userAdmin.create({
      data: {
        email,
        password_hash: passwordHash,
      }
    })
  }
}

