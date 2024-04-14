import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenuCategoryService } from './menu-category.service';
import {
  AllMenuController,
  MenuCategoryController,
} from './menu-category.controller';
import { MenuCategory } from './entities/menu-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuCategory])],
  controllers: [MenuCategoryController, AllMenuController],
  providers: [MenuCategoryService],
})
export class MenuCategoryModule {}
