import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { LanguageCode } from '../../database/db.enums';

export class CreateStoreCategoryDto {
  @IsEnum(LanguageCode)
  language: LanguageCode;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  subtitle: string;

  @IsOptional()
  @IsBoolean()
  hidden?: boolean;

  @IsNumber()
  position: number;
}
