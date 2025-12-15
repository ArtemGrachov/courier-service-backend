import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePositionService } from './update-position.service';

describe('UpdatePositionService', () => {
  let service: UpdatePositionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdatePositionService],
    }).compile();

    service = module.get<UpdatePositionService>(UpdatePositionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
