import { Test, TestingModule } from '@nestjs/testing';
import { GetCouriersService } from './get-couriers.service';

describe('GetCouriersService', () => {
  let service: GetCouriersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetCouriersService],
    }).compile();

    service = module.get<GetCouriersService>(GetCouriersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
