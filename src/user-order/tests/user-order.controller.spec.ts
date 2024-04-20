import { Test, TestingModule } from '@nestjs/testing';

import { UserOrderController } from '../user-order.controller';
import { UserOrderService } from '../user-order.service';

describe('UserOrderController', () => {
  let controller: UserOrderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserOrderController],
      providers: [UserOrderService],
    })
      .overrideProvider(UserOrderService)
      .useValue({})
      .compile();

    controller = module.get<UserOrderController>(UserOrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
