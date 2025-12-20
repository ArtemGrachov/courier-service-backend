import { Test, TestingModule } from '@nestjs/testing';
import { AdminAuthUserService } from './admin-auth-user.service';

describe('AdminAuthUserService', () => {
  let service: AdminAuthUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminAuthUserService],
    }).compile();

    service = module.get<AdminAuthUserService>(AdminAuthUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
