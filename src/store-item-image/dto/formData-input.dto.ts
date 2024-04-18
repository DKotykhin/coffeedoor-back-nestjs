import { IsNotEmpty, IsString } from 'class-validator';

export class FormDataInputDto {
  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsNotEmpty()
  @IsString()
  position: number;

  @IsNotEmpty()
  @IsString()
  storeCategory: string;
}
