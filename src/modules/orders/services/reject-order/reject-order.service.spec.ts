import { Test, TestingModule } from '@nestjs/testing';
import { RejectOrderService } from './reject-order.service';

describe('RejectOrderService', () => {
  let service: RejectOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RejectOrderService],
    }).compile();

    service = module.get<RejectOrderService>(RejectOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
