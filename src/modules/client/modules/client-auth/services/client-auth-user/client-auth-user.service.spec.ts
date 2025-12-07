import { Test, TestingModule } from '@nestjs/testing';
import { ClientAuthUserService } from './client-auth-user.service';

describe('ClientAuthUserService', () => {
  let service: ClientAuthUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientAuthUserService],
    }).compile();

    service = module.get<ClientAuthUserService>(ClientAuthUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
