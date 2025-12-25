import { Injectable } from '@nestjs/common';

import { ParametersService } from 'src/console/modules/parameters/services/parameters/parameters.service';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class DeleteAdminService {
  constructor(
    private parametersService: ParametersService,
    private prismaService: PrismaService,
  ) {}

  private info() {
    console.info('This script removes admin by given email');
    console.info('Example: "npm run remove-admin -- email=admin@test.com');
    console.info('"email" is mandatory');
  }

  public async removeAdmin() {
    const {
      email,
    } = this.parametersService.parameters;

    if (!email) {
      this.info();
      console.error('Error: "email" is mandatory');
      return;
    }

    const user = await this.prismaService.userAdmin.findFirst({ where: { email } });

    if (!user) {
      console.error(`Admin user with email "${email}" not found`);
      return;
    }

    await this.prismaService.userAdmin.delete({
      where: {
        email,
      },
    });

    console.log(`Admin "${email}" has been deleted successfully`);
  }
}

