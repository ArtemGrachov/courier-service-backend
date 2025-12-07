import { Test, TestingModule } from '@nestjs/testing';
import { CourierAuthUserService } from './courier-auth-user.service';

describe('CourierAuthUserService', () => {
  let service: CourierAuthUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourierAuthUserService],
    }).compile();

    service = module.get<CourierAuthUserService>(CourierAuthUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
