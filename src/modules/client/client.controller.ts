import { Controller, Get, NotFoundException, Param, ParseIntPipe } from '@nestjs/common';

import { ERoles } from 'src/constants/auth';

import { Roles } from '../auth/decorators/role.decorator';

import { GetClientService } from './services/get-client/get-client.service';

@Controller('client')
export class ClientController {
  constructor(
    private getClientService: GetClientService,
  ) {}

  @Get(':id')
  @Roles([ERoles.ADMIN])
  public async getClient(@Param('id', new ParseIntPipe) id: number) {
    const courier = await this.getClientService.getClient(id);

    if (!courier) {
      throw new NotFoundException();
    }

    return courier;
  }
}

