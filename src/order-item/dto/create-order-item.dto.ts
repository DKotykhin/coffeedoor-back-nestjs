import { IsNumber, IsOptional, IsString } from 'class-validator';

import { UserOrder } from '../../user-order/entities/user-order.entity';

export class CreateOrderItemDto {
  @IsString()
  slug: string;

  @IsString()
  categoryTitle: string;

  @IsString()
  itemTitle: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsNumber()
  @IsOptional()
  weight: number;

  userOrder: UserOrder;
}
