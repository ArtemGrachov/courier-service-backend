import { Test, TestingModule } from '@nestjs/testing';
import { CancelOrderService } from './cancel-order.service';

describe('CancelOrderService', () => {
  let service: CancelOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CancelOrderService],
    }).compile();

    service = module.get<CancelOrderService>(CancelOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
