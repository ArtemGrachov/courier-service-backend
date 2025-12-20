import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Patch, Query, Request, UsePipes, ValidationPipe } from '@nestjs/common';
import { type Request as ExpressRequest } from 'express';

import { ERoles } from 'src/constants/auth';

import { Roles } from '../auth/decorators/role.decorator';

import { GetClientService } from './services/get-client/get-client.service';
import { GetClientsService } from './services/get-clients/get-clients.service';
import { UpdateClientService } from './services/update-client/update-client.service';

import { GetClientsDto } from './dto/get-clients.dto';
import { IRequstUser } from 'src/types/auth/request-user';
import { UpdateClientDto } from './dto/update-client.dto';

import { exceptionFactory } from 'src/utils/exception-factory';

@Controller('client')
export class ClientController {
  constructor(
    private getClientService: GetClientService,
    private getClientsService: GetClientsService,
    private updateClientService: UpdateClientService,
  ) {}

  @Get('')
  @Roles([ERoles.ADMIN])
  public async getCouriers(
    @Query(new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      forbidNonWhitelisted: true,
      exceptionFactory,
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

  @Patch('self')
  @Roles([ERoles.CLIENT])
  @UsePipes(new ValidationPipe({ transform: true, exceptionFactory }))
  public async updateClient(
    @Request() req: ExpressRequest,
    @Body() payload: UpdateClientDto,
  ) {
    const requestUser = req['user'] as IRequstUser;
    return this.updateClientService.updateClient(requestUser.id, payload);
  }
}

