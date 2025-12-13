import { Test, TestingModule } from '@nestjs/testing';
import { GetClientService } from './get-client.service';

describe('GetClientService', () => {
  let service: GetClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetClientService],
    }).compile();

    service = module.get<GetClientService>(GetClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
