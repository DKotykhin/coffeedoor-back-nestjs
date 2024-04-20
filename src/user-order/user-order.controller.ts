import { Body, Controller, Post } from '@nestjs/common';

import { UserOrderService } from './user-order.service';
import { CreateUserOrderDto } from './dto/create-user-order.dto';
import { OrderItem } from '../order-item/entities/order-item.entity';

@Controller('user-order')
export class UserOrderController {
  constructor(private readonly userOrderService: UserOrderService) {}

  @Post()
  sendOrder(
    @Body('userOrder') userOrder: CreateUserOrderDto,
    @Body('orderItems') orderItems: OrderItem[],
  ): Promise<any> {
    return this.userOrderService.sendOrder(userOrder, orderItems);
  }
}
