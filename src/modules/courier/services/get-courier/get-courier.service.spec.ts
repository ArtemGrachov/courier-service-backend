import { Test, TestingModule } from '@nestjs/testing';
import { GetCourierService } from './get-courier.service';

describe('GetCourierService', () => {
  let service: GetCourierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetCourierService],
    }).compile();

    service = module.get<GetCourierService>(GetCourierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
