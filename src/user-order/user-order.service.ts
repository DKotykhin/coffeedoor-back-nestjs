import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

import { OrderItemService } from '../order-item/order-item.service';
import { CreateOrderItemDto } from '../order-item/dto/create-order-item.dto';
import { UserOrder } from './entities/user-order.entity';
import { CreateUserOrderDto } from './dto/create-user-order.dto';

@Injectable()
export class UserOrderService {
  constructor(
    @InjectRepository(UserOrder)
    private readonly userOrderRepository: Repository<UserOrder>,
    private readonly orderItemService: OrderItemService,
    private readonly configService: ConfigService,
  ) {}

  async findOrdersByUserId(userId: string): Promise<UserOrder[]> {
    return this.userOrderRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      relations: ['userOrderItems'],
    });
  }

  async sendOrder(
    userOrder: CreateUserOrderDto,
    orderItems: CreateOrderItemDto[],
  ): Promise<string> {
    try {
      const { averageSum, totalSum, totalQuantity } = await this.sendToTelegram(
        userOrder,
        orderItems,
      );
      const newOrder = await this.userOrderRepository.save({
        ...userOrder,
        averageSum,
        totalSum,
        totalQuantity,
        user: { id: userOrder.userId },
      });
      await Promise.all(
        orderItems.map(async (orderItem: CreateOrderItemDto) => {
          orderItem.userOrder = newOrder;
          await this.orderItemService.create(orderItem);
        }),
      );
      return newOrder.id;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async sendToTelegram(
    userOrder: CreateUserOrderDto,
    orderItems: CreateOrderItemDto[],
  ): Promise<any> {
    const { userName, phoneNumber, deliveryWay, comment } = userOrder;
    const TOKEN = this.configService.get('TELEGRAM_TOKEN');
    const CHAT_ID = this.configService.get('TELEGRAM_CHAT_ID');

    const URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    let message = `<b>--- Заявка з сайту ---</b>\n`;
    message += `<b>Відправник: </b>${userName}\n`;
    message += `<b>Телефон: </b>${phoneNumber}\n`;
    message += `<b>Спосіб доставки: </b>${deliveryWay}\n`;
    message += `<b>Коментар: </b>${comment ? comment : ''}\n`;
    message += `<b>Замовлення: </b>\n`;

    let totalQuantity = 0;
    let totalSum = 0;

    orderItems.forEach((item) => {
      message += `${item.categoryTitle} ${item.itemTitle}, ${item.weight ? `${item.weight}г,` : ''} ${
        item.quantity
      } x ${item.price} грн\n`;
      totalQuantity += item.quantity;
      totalSum += +item.price * item.quantity;
    });
    message += `<b>Загалом позицій: </b>${totalQuantity}\n`;
    message += `<b>Всього на суму: </b>${totalSum} грн`;

    const averageSum = Math.round(totalSum / totalQuantity);

    await axios.post(URL, {
      chat_id: CHAT_ID,
      parse_mode: 'html',
      text: message,
    });

    return { totalSum, totalQuantity, averageSum };
  }
}
