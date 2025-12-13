import { Test, TestingModule } from '@nestjs/testing';
import { RateCourierService } from './rate-courier.service';

describe('RateCourierService', () => {
  let service: RateCourierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RateCourierService],
    }).compile();

    service = module.get<RateCourierService>(RateCourierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
