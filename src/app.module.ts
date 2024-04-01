import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { MenuItemsModule } from './menu-items/menu-items.module';
import { MenuCategoriesModule } from './menu-categories/menu-categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    MenuItemsModule,
    MenuCategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
