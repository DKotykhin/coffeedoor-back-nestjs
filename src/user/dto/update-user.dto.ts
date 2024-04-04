import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsString, Length } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @Length(2, 100, { message: 'Name must be between 2 and 100 characters' })
  address?: string;

  @IsString()
  phoneNumber?: string;

  @IsString()
  avatarUrl?: string;

  @IsBoolean()
  isVerified?: boolean;
}
