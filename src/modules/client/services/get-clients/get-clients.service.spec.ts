import { Test, TestingModule } from '@nestjs/testing';
import { GetClientsService } from './get-clients.service';

describe('GetClientsService', () => {
  let service: GetClientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetClientsService],
    }).compile();

    service = module.get<GetClientsService>(GetClientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
