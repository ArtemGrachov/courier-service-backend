import { Test, TestingModule } from '@nestjs/testing';
import { GetOrdersService } from './get-orders.service';

describe('GetOrdersService', () => {
  let service: GetOrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetOrdersService],
    }).compile();

    service = module.get<GetOrdersService>(GetOrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
