import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoreItemImageService } from '../store-item-image/store-item-image.service';
import { StoreItemImage } from '../store-item-image/entities/store-item-image.entity';
import { StoreCategoryService } from './store-category.service';
import {
  AllStoreController,
  StoreCategoryController,
} from './store-category.controller';
import { StoreCategory } from './entities/store-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoreCategory, StoreItemImage])],
  controllers: [StoreCategoryController, AllStoreController],
  providers: [StoreCategoryService, StoreItemImageService],
})
export class StoreCategoryModule {}
