import { LanguageCode } from 'src/database/db.enums';

export class CreateMenuCategoryDto {
  language: LanguageCode;
  title: string;
  description: string;
  image?: string;
  hidden?: boolean;
  position: number;
}
