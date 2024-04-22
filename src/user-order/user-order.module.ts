import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderItemService } from '../order-item/order-item.service';
import { OrderItem } from '../order-item/entities/order-item.entity';
import { UserOrderService } from './user-order.service';
import { UserOrderController } from './user-order.controller';
import { UserOrder } from './entities/user-order.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrder, OrderItem]), HttpModule],
  controllers: [UserOrderController],
  providers: [UserOrderService, OrderItemService],
})
export class UserOrderModule {}
