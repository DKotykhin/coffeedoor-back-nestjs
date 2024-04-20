import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItemService } from '../order-item/order-item.service';
import { OrderItem } from '../order-item/entities/order-item.entity';
import { UserOrderService } from './user-order.service';
import { UserOrderController } from './user-order.controller';
import { UserOrder } from './entities/user-order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrder, OrderItem])],
  controllers: [UserOrderController],
  providers: [UserOrderService, OrderItemService],
})
export class UserOrderModule {}
