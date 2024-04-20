import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { OrderItemService } from '../order-item/order-item.service';
import { CreateOrderItemDto } from '../order-item/dto/create-order-item.dto';
import { UserOrder } from './entities/user-order.entity';
import { CreateUserOrderDto } from './dto/create-user-order.dto';

@Injectable()
export class UserOrderService {
  constructor(
    @InjectRepository(UserOrder)
    private readonly userOrderRepository: Repository<UserOrder>,
    private readonly entityManager: EntityManager,
    private readonly orderItemService: OrderItemService,
  ) {}

  async sendOrder(
    userOrder: CreateUserOrderDto,
    orderItems: CreateOrderItemDto[],
  ): Promise<string> {
    try {
      return await this.entityManager.transaction(async () => {
        const newOrder = await this.userOrderRepository.save(userOrder);

        orderItems.forEach(async (orderItem) => {
          orderItem.userOrder = newOrder;
          await this.orderItemService.create(orderItem);
        });
        return newOrder.id;
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
