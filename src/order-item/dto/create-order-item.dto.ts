import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { UserOrder } from '../../user-order/entities/user-order.entity';
import { Type } from 'class-transformer';

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
  quantity: number;

  @IsNumber()
  price: number;

  @IsNumber()
  @IsOptional()
  weight: number;

  userOrder: UserOrder;
}

export class CreateOrderItemArrayValidator {
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  @IsArray()
  items: CreateOrderItemDto[];
}
