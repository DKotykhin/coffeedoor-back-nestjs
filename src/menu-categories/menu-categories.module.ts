import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MenuCategoriesService } from './menu-categories.service';
import {
  AllMenuController,
  MenuCategoriesController,
} from './menu-categories.controller';
import { MenuCategory } from './entities/menu-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MenuCategory])],
  controllers: [MenuCategoriesController, AllMenuController],
  providers: [MenuCategoriesService],
})
export class MenuCategoriesModule {}
