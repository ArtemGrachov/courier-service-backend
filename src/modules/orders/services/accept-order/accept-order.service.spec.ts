import { Test, TestingModule } from '@nestjs/testing';
import { AcceptOrderService } from './accept-order.service';

describe('AcceptOrderService', () => {
  let service: AcceptOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AcceptOrderService],
    }).compile();

    service = module.get<AcceptOrderService>(AcceptOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
