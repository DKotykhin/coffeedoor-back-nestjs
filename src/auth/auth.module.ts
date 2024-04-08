import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { MailSenderService } from '../mail-sender/mail-sender.service';
import { UserService } from '../user/user.service';
import { jwtTokenConfig } from '../config/jwt-token.config';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ResetPassword } from './entities/reset-password.entity';
import { EmailConfirm } from './entities/email-confirm.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, EmailConfirm, ResetPassword]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: jwtTokenConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, MailSenderService, UserService],
})
export class AuthModule {}
