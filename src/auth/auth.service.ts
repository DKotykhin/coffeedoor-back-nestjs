import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { MailSenderService } from '../mail-sender/mail-sender.service';
import { AvatarService } from '../avatar/avatar.service';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';
import { PasswordHash } from '../utils/passwordHash';
import { cryptoToken } from '../utils/cryptoToken';
import { EmailDto, SignInDto, SignUpDto } from './dto/auth.dto';
import { JwtPayload } from './dto/jwtPayload.dto';
import { EmailConfirm } from './entities/email-confirm.entity';
import { ResetPassword } from './entities/reset-password.entity';
import { StatusResponseDto } from './dto/status-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(EmailConfirm)
    private readonly emailConfirmRepository: Repository<EmailConfirm>,
    @InjectRepository(ResetPassword)
    private readonly resetPasswordRepository: Repository<ResetPassword>,
    private readonly mailSenderService: MailSenderService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly avatarService: AvatarService,
  ) {}

  async getUserByToken(user: Partial<User>): Promise<Partial<User>> {
    if (user.avatarUrl) {
      user.avatarUrl = await this.avatarService.getImageUrl(user.avatarUrl);
    }
    return user;
  }

  async signUp(signUpDto: SignUpDto): Promise<Partial<User>> {
    const { email, password, userName } = signUpDto;
    const candidate = await this.userService.findByEmail(email);
    if (candidate) {
      throw new HttpException(
        `User with email ${email} already exists`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const passwordHash = await PasswordHash.create(password);
    const user = await this.userService.create({
      email,
      userName,
      passwordHash,
    });
    const token = cryptoToken();
    this.mailSenderService.sendMail({
      to: user.email,
      subject: 'Email confirmation',
      html: `
              <h2>Please, follow the link to set new password</h2>
              <h4>If you don't restore your password ignore this mail</h4>
              <hr/>
              <br/>
              <a href='${this.configService.get('FRONTEND_URL')}/confirm-email/${token}'>Link for email confirmation</a>
            `,
    });
    try {
      await this.emailConfirmRepository.save({
        user,
        token,
        expiredAt: new Date(
          new Date().getTime() + 1000 * 60 * 60 * 24,
        ).toISOString(),
      });
    } catch (error) {
      throw new HttpException(
        'Error while saving email confirmation token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return user;
  }

  async signIn(
    signInDto: SignInDto,
    response: Response,
  ): Promise<Partial<User>> {
    const user = await this.userService.findByEmail(signInDto.email);
    if (!user) {
      throw new HttpException(
        'Incorrect login or password',
        HttpStatus.BAD_REQUEST,
      );
    }
    const { email, passwordHash, avatarUrl } = user;
    await PasswordHash.compare(
      signInDto.password,
      passwordHash,
      'Incorrect login or password',
    );

    if (!user.isVerified) {
      if (user.emailConfirm?.expiredAt < new Date()) {
        const token = cryptoToken();
        this.mailSenderService.sendMail({
          to: email,
          subject: 'Email confirmation',
          html: `
                  <h2>Please, follow the link to confirm your email</h2>
                  <h4>If you don't try to login or register, ignore this mail</h4>
                  <hr/>
                  <br/>
                  <a href='${this.configService.get('FRONTEND_URL')}/confirm-email/${token}'>Link for email confirmation</a>
                `,
        });
      }
      throw new HttpException(
        'Please confirm your email address',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (avatarUrl) {
      user.avatarUrl = await this.avatarService.getImageUrl(avatarUrl);
    }

    const payload: JwtPayload = { email };
    const auth_token = this.jwtService.sign(payload);
    response.cookie('auth_token', auth_token, { httpOnly: true });
    console.log('auth_token:', auth_token);

    return user;
  }

  async confirmEmail(token: string): Promise<StatusResponseDto> {
    if (!token) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }
    const emailConfirm = await this.emailConfirmRepository.findOne({
      where: { token },
      relations: ['user'],
    });
    if (!emailConfirm) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }
    if (emailConfirm.expiredAt < new Date()) {
      throw new HttpException('Token expired', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.userService.update(emailConfirm.user.id, { isVerified: true });
      await this.emailConfirmRepository.update(emailConfirm.id, {
        verifiedAt: new Date(),
        token: null,
        expiredAt: null,
      });
    } catch (error) {
      throw new HttpException(
        'Error while confirming email',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return {
      status: true,
      message: 'Email successfully confirmed',
    };
  }

  async resetPassword(emailDto: EmailDto): Promise<StatusResponseDto> {
    const { email } = emailDto;
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const token = cryptoToken();
    this.mailSenderService.sendMail({
      to: user.email,
      subject: 'Reset password',
      html: `
              <h2>Please, follow the link to set new password</h2>
              <h4>If you don't restore your password ignore this mail</h4>
              <hr/>
              <br/>
              <a href='${this.configService.get('FRONTEND_URL')}/reset-password/${token}'>Link for password reset</a>
            `,
    });
    try {
      await this.resetPasswordRepository.save({
        user,
        token,
        expiredAt: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
      });
    } catch (error) {
      throw new HttpException(
        'Error while saving reset password token',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return {
      status: true,
      message: 'Reset password link sent to email',
    };
  }

  async setNewPassword(
    token: string,
    password: string,
  ): Promise<StatusResponseDto> {
    if (!token) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }
    const resetPassword = await this.resetPasswordRepository.findOne({
      where: { token },
      relations: ['user'],
    });
    if (!resetPassword) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }
    if (resetPassword.expiredAt < new Date()) {
      throw new HttpException('Token expired', HttpStatus.BAD_REQUEST);
    }
    const passwordHash = await PasswordHash.create(password);
    try {
      await this.userService.update(resetPassword.user.id, {
        passwordHash,
      });
      await this.resetPasswordRepository.update(resetPassword.id, {
        token: null,
        expiredAt: null,
        isUsed: new Date(),
      });
    } catch (error) {
      throw new HttpException(
        'Error while setting new password',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return {
      status: true,
      message: 'Password successfully changed',
    };
  }
}
