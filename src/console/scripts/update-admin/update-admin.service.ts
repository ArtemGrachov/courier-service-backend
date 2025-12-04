import { Injectable } from '@nestjs/common';

import { ParametersService } from 'src/console/modules/parameters/services/parameters/parameters.service';
import { PasswordService } from 'src/modules/password/services/password/password.service';
import { PrismaService } from '../../../prisma.service';

@Injectable()
export class UpdateAdminService {
  constructor(
    private parametersService: ParametersService,
    private passwordService: PasswordService,
    private prismaService: PrismaService,
  ) {}

  private info() {
    console.info('This script updates admin data by given email');
    console.info('Example: "npm run update-admin -- email=admin@test.com new-email=new@test@com new-password=Password1!"');
    console.info('"email" is mandatory. At least one of the other parameters must be selected');
  }

  public async createAdmin() {
    const {
      email,
      'new-email': newEmail,
      'new-password': newPassword,
    } = this.parametersService.parameters;

    if (!email) {
      this.info();
      console.error('Error: "email" is mandatory');
      return;
    }

    if (!newEmail && !newPassword) {
      this.info();
      console.error('No new email or password specified, nothing to update');
      return;
    }

    const user = await this.prismaService.userAdmin.findUnique({ where: { email } });

    if (!user) {
      console.error(`Admin user with email "${email}" not found`);
      return;
    }

    const data: Record<string, string> = {};

    if (newEmail) {
      data.email = newEmail;
    }

    if (newPassword) {
      const passwordHash = await this.passwordService.generatePasswordHash(newPassword);
      data.passwordHash = passwordHash;
    }

    await this.prismaService.userAdmin.update({
      where: {
        email,
      },
      data,
    });

    console.log(`Data of "${email}" user has been updated successfully`);
  }
}

