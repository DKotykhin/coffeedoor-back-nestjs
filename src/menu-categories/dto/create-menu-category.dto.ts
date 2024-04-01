import { LanguageCode } from '../entities/menu-category.entity';

export class CreateMenuCategoryDto {
  language: LanguageCode;
  title: string;
  description: string;
  image?: string;
  hidden?: boolean;
  position: number;
}
