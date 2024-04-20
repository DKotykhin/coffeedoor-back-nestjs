import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { DeliveryWay } from '../../database/db.enums';
import { User } from '../../user/entities/user.entity';

export class CreateUserOrderDto {
  @IsEnum(DeliveryWay)
  deliveryWay: DeliveryWay;

  @IsString()
  @IsOptional()
  deliveryAddress: string;

  @IsString()
  @IsOptional()
  comment: string;

  @IsNumber()
  totalSum: number;

  @IsNumber()
  averageSum: number;

  @IsNumber()
  totalQuantity: number;

  userId: User;
}
