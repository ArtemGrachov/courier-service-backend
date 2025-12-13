import { Controller, Get, NotFoundException, Param, ParseIntPipe, Query, ValidationPipe } from '@nestjs/common';

import { ERoles } from 'src/constants/auth';

import { Roles } from '../auth/decorators/role.decorator';

import { GetClientService } from './services/get-client/get-client.service';
import { GetClientsService } from './services/get-clients/get-clients.service';

import { GetClientsDto } from './dto/get-clients.dto';

@Controller('client')
export class ClientController {
  constructor(
    private getClientService: GetClientService,
    private getClientsService: GetClientsService,
  ) {}

  @Get('')
  @Roles([ERoles.ADMIN])
  public async getCouriers(
    @Query(new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true
    })) query: GetClientsDto,
  ) {
    const result = await this.getClientsService.getClients(query);

    return result;
  }

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

