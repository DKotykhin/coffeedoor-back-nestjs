import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StoreCategoryService } from './store-category.service';
import {
  AllStoreController,
  StoreCategoryController,
} from './store-category.controller';
import { StoreCategory } from './entities/store-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StoreCategory])],
  controllers: [StoreCategoryController, AllStoreController],
  providers: [StoreCategoryService],
})
export class StoreCategoryModule {}
