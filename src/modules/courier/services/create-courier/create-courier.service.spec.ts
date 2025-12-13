import { Test, TestingModule } from '@nestjs/testing';
import { CreateCourierService } from './create-courier.service';

describe('CreateCourierService', () => {
  let service: CreateCourierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateCourierService],
    }).compile();

    service = module.get<CreateCourierService>(CreateCourierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
