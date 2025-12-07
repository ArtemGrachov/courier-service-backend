import { Test, TestingModule } from '@nestjs/testing';
import { CourierAuthController } from './courier-auth.controller';

describe('CourierAuthController', () => {
  let controller: CourierAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourierAuthController],
    }).compile();

    controller = module.get<CourierAuthController>(CourierAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
