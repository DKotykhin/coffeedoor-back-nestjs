import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { UserOrderService } from '../user-order.service';
import { OrderItemService } from '../../order-item/order-item.service';

describe('UserOrderService', () => {
  let service: UserOrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserOrderService,
        {
          provide: 'UserOrderRepository',
          useValue: {},
        },
        {
          provide: ConfigService,
          useValue: {},
        },
        {
          provide: OrderItemService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UserOrderService>(UserOrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
