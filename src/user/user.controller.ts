import {
  Controller,
  Body,
  Patch,
  Delete,
  UseGuards,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common/pipes';

import { GetUser } from '../auth/get-user.decorator';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch()
  update(
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() user: User,
  ): Promise<User> {
    return this.userService.update(user.id, updateUserDto);
  }

  @Delete()
  remove(@GetUser() user: User): Promise<string> {
    return this.userService.remove(user.id);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('avatar'))
  uploadFile(
    @GetUser() user: User,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'image/jpeg' || 'image/png' || 'image/webp',
          }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 3 }),
        ],
      }),
    )
    avatar: Express.Multer.File,
  ): Promise<any> {
    return this.userService.uploadAvatar(user.id, avatar);
  }

  @Delete('avatar')
  removeAvatar(@GetUser() user: User): Promise<any> {
    return this.userService.deleteAvatar(user.id);
  }
}
