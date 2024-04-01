import { LanguageCode } from 'src/menu-categories/entities/menu-category.entity';

export class CreateMenuItemDto {
  language: LanguageCode;
  title: string;
  description: string;
  price: string;
  hidden: boolean;
  position: number;
  categoryId: string;
}
