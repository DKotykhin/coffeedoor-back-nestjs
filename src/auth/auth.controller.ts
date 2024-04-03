import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignInDto } from './dto/auth.dto';
import { User } from 'src/user/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  signIn(@Body() signInDto: SignInDto): Promise<User> {
    return this.authService.signIn(signInDto);
  }
}
