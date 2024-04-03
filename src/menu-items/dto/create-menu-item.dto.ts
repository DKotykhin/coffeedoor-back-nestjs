import { LanguageCode } from 'src/database/db.enums';

export class CreateMenuItemDto {
  language: LanguageCode;
  title: string;
  description: string;
  price: string;
  hidden: boolean;
  position: number;
  categoryId: string;
}
