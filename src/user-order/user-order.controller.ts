import { Body, Controller, Post } from '@nestjs/common';

import { UserOrderService } from './user-order.service';
import { CreateUserOrderDto } from './dto/create-user-order.dto';
import { CreateOrderItemDto } from 'src/order-item/dto/create-order-item.dto';

@Controller('user-order')
export class UserOrderController {
  constructor(private readonly userOrderService: UserOrderService) {}

  @Post()
  sendOrder(
    @Body('userOrder') userOrder: CreateUserOrderDto,
    @Body('orderItems') orderItems: CreateOrderItemDto[],
  ): Promise<any> {
    return this.userOrderService.sendOrder(userOrder, orderItems);
  }
}
