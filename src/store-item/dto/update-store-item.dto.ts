import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateStoreItemDto {
  @IsOptional()
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

  @IsOptional()
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
  @IsBoolean()
  toOrder: boolean;

  @IsOptional()
  @IsBoolean()
  hidden: boolean;

  @IsOptional()
  @IsNumber()
  position: number;
}
