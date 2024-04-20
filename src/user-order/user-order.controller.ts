import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateOrderItemArrayValidator } from '../order-item/dto/create-order-item.dto';
import { User } from '../user/entities/user.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { UserOrderService } from './user-order.service';
import { CreateUserOrderDto } from './dto/create-user-order.dto';
import { UserOrder } from './entities/user-order.entity';

@Controller('user-order')
export class UserOrderController {
  constructor(private readonly userOrderService: UserOrderService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findOrdersByUserId(@GetUser() user: User): Promise<UserOrder[]> {
    return this.userOrderService.findOrdersByUserId(user.id);
  }

  @Post()
  sendOrder(
    @Body('userOrder') userOrder: CreateUserOrderDto,
    @Body('orderItems') orderItems: CreateOrderItemArrayValidator,
  ): Promise<string> {
    return this.userOrderService.sendOrder(userOrder, orderItems.items);
  }
}
