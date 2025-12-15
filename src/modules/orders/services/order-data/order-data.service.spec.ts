import { Test, TestingModule } from '@nestjs/testing';
import { OrderDataService } from './order-data.service';

describe('OrderDataService', () => {
  let service: OrderDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderDataService],
    }).compile();

    service = module.get<OrderDataService>(OrderDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
