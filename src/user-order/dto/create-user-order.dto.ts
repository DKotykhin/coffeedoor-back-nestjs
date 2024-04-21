import { IsEnum, IsOptional, IsString, Length } from 'class-validator';

import { DeliveryWay } from '../../database/db.enums';

export class CreateUserOrderDto {
  @IsString()
  userName: string;

  @IsString()
  @Length(8, 14, { message: 'Phone number must be at least 8 characters' })
  phoneNumber: string;

  @IsEnum(DeliveryWay)
  deliveryWay: DeliveryWay;

  @IsString()
  @IsOptional()
  deliveryAddress: string;

  @IsString()
  @IsOptional()
  comment: string;

  @IsString()
  userId: string;
}
