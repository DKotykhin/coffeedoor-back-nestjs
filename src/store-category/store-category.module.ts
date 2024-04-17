import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoreCategoryService } from './store-category.service';
import {
  AllStoreController,
  StoreCategoryController,
} from './store-category.controller';
import { StoreCategory } from './entities/store-category.entity';
import { StoreItemImageService } from '../store-item-image/store-item-image.service';

@Module({
  imports: [TypeOrmModule.forFeature([StoreCategory])],
  controllers: [StoreCategoryController, AllStoreController],
  providers: [StoreCategoryService, StoreItemImageService],
})
export class StoreCategoryModule {}
