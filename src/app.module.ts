import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { MenuItemModule } from './menu-item/menu-item.module';
import { MenuCategoryModule } from './menu-category/menu-category.module';
import { MailSenderModule } from './mail-sender/mail-sender.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { AvatarModule } from './avatar/avatar.module';
import { StoreCategoryModule } from './store-category/store-category.module';
import { StoreItemModule } from './store-item/store-item.module';
import { validate } from './utils/env.validator';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.stage.dev'],
      validate,
    }),
    DatabaseModule,
    MenuItemModule,
    MenuCategoryModule,
    MailSenderModule,
    UserModule,
    AuthModule,
    AvatarModule,
    StoreCategoryModule,
    StoreItemModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
