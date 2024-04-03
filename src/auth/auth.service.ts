import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { MailSenderService } from 'src/mail-sender/mail-sender.service';
import { SignInDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { PasswordHash } from 'src/utils/passwordHash';
import { EmailConfirm } from './entities/email-confirm.entity';
import { ResetPassword } from './entities/reset-password.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(EmailConfirm)
    private readonly emailConfirmRepository: Repository<EmailConfirm>,
    @InjectRepository(ResetPassword)
    private readonly resetPasswordRepository: Repository<ResetPassword>,
    private readonly mailSenderService: MailSenderService,
    private readonly userService: UserService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.userService.findByEmail(signInDto.email);
    if (!user) {
      throw new HttpException(
        'Incorrect login or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    await PasswordHash.compare(
      signInDto.password,
      user.passwordHash,
      'Incorrect login or password',
    );

    if (!user.isVerified) {
      this.mailSenderService.sendMail({
        to: user.email,
        subject: 'Email confirmation',
        text: 'Please confirm your email address',
      });
      throw new HttpException(
        'Please confirm your email address',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }
}
