import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/modules/prisma/services/prisma.service';

@Injectable()
export class GetClientService {
  constructor(private prismaService: PrismaService) {}

  public async getClient(id: number) {
    const client = await this.prismaService.userClient.findUnique({
      where: { id },
    });

    return client;
  }
}

