import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailSenderService } from 'src/mail-sender/mail-sender.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { ResetPassword } from './entities/reset-password.entity';
import { EmailConfirm } from './entities/email-confirm.entity';
import { jwtTokenConfig } from 'src/config/jwt-token.config';

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
