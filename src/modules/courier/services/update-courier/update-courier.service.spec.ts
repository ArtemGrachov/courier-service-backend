import { Test, TestingModule } from '@nestjs/testing';
import { UpdateCourierService } from './update-courier.service';

describe('UpdateCourierService', () => {
  let service: UpdateCourierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateCourierService],
    }).compile();

    service = module.get<UpdateCourierService>(UpdateCourierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
