import { Test, TestingModule } from '@nestjs/testing';
import { AuthUuidService } from './auth-uuid.service';

describe('AuthUuidService', () => {
  let service: AuthUuidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthUuidService],
    }).compile();

    service = module.get<AuthUuidService>(AuthUuidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
