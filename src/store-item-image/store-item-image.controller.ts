import {
  Body,
  Controller,
  Delete,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
} from '@nestjs/common/pipes';

import { HasRoles } from '../auth/decorators/roles.decorator';
import { RoleTypes } from '../database/db.enums';
import { RolesGuard } from '../auth/guards/roles.guard';
import { StoreItemImageService } from './store-item-image.service';
import { FormDataInputDto } from './dto/formData-input.dto';

@Controller('store-item-image')
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StoreItemImageController {
  constructor(private readonly storeItemImageService: StoreItemImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
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
    file: Express.Multer.File,
    @Body()
    formDataInputDto: FormDataInputDto,
  ) {
    return this.storeItemImageService.uploadImage(file, formDataInputDto);
  }

  @Delete()
  async deleteImage(@Body('fileKey') fileKey: string) {
    return this.storeItemImageService.deleteImage(fileKey);
  }
}
