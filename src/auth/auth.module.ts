import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MailSenderService } from 'src/mail-sender/mail-sender.service';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { ResetPassword } from './entities/reset-password.entity';
import { EmailConfirm } from './entities/email-confirm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, EmailConfirm, ResetPassword])],
  controllers: [AuthController],
  providers: [AuthService, MailSenderService, UserService],
})
export class AuthModule {}
