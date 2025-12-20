import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/services/prisma.service';

import { UpdateClientDto } from '../../dto/update-client.dto';

@Injectable()
export class UpdateClientService {
  constructor(private prismaService: PrismaService) {}

  public async updateClient(clientId: number, payload: UpdateClientDto) {
    const client = await this.prismaService.userClient.update({
      where: {
        id: clientId,
      },
      data: payload,
    });

    return client;
  }
}
