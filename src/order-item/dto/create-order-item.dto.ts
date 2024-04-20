import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { UserOrder } from '../../user-order/entities/user-order.entity';

export class CreateOrderItemDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  categoryTitle: string;

  @IsString()
  @IsNotEmpty()
  itemTitle: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsOptional()
  weight: number;

  userOrder: UserOrder;
}
