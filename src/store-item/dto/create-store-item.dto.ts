import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { LanguageCode } from '../../database/db.enums';

export class CreateStoreItemDto {
  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsEnum(LanguageCode)
  language: LanguageCode;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  details: string;

  @IsOptional()
  @IsString()
  sortKey: string;

  @IsOptional()
  @IsString()
  sortValue: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  tm: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  oldPrice: number;

  @IsOptional()
  @IsNumber()
  discount: number;

  @IsOptional()
  @IsNumber()
  weight: number;

  @IsOptional()
  @IsString({ each: true })
  images: string[];

  @IsOptional()
  @IsBoolean()
  toOrder: boolean;

  @IsOptional()
  @IsBoolean()
  hidden: boolean;

  @IsNumber()
  position: number;

  @IsNotEmpty()
  @IsString()
  categoryId: string;
}
