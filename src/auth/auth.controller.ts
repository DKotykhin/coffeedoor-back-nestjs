import {
  Controller,
  Post,
  Body,
  Res,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { EmailDto, PasswordDto, SignInDto, SignUpDto } from './dto/auth.dto';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getUserByToken(@GetUser() user: Partial<User>): Partial<User> {
    return user;
  }

  @Post('/sign-up')
  signUp(@Body() signUpDto: SignUpDto): Promise<Partial<User>> {
    return this.authService.signUp(signUpDto);
  }

  @Post('/sign-in')
  signIn(
    @Body() signInDto: SignInDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<Partial<User>> {
    return this.authService.signIn(signInDto, response);
  }

  @Get('/confirm-email/:token')
  confirmEmail(@Param('token') token: string): Promise<boolean> {
    return this.authService.confirmEmail(token);
  }

  @Post('/reset-password')
  resetPassword(@Body() emailDto: EmailDto): Promise<boolean> {
    return this.authService.resetPassword(emailDto);
  }

  @Post('/new-password/:token')
  setNewPassword(
    @Param('token') token: string,
    @Body() newPassword: PasswordDto,
  ): Promise<boolean> {
    return this.authService.setNewPassword(token, newPassword.password);
  }
}
