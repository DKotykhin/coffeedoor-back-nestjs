import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as sharp from 'sharp';
import { Repository } from 'typeorm';

import { StoreItemImage } from './entities/store-item-image.entity';
import { FormDataInputDto } from './dto/formData-input.dto';

@Injectable()
export class StoreItemImageService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(StoreItemImage)
    private readonly storeItemImageRepository: Repository<StoreItemImage>,
  ) {}

  s3 = new S3Client({
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
    region: this.configService.get('AWS_REGION'),
  });

  async getImageUrl(fileKey: string): Promise<string> {
    const params = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: fileKey,
    };
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });

    return url;
  }

  async uploadImage(
    file: Express.Multer.File,
    formDataInputDto: FormDataInputDto,
  ): Promise<string> {
    const { slug, storeCategory, position } = formDataInputDto;
    const fileName = slug + '-' + position + '.webp';
    const filePath = `${storeCategory}/${fileName}`;
    const fileBuffer = await sharp(file.buffer).webp().resize(700).toBuffer();

    const params = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: filePath,
      Body: fileBuffer,
      ContentType: file.mimetype,
    };

    try {
      await this.s3.send(new PutObjectCommand(params));
      await this.storeItemImageRepository.save({
        image: filePath,
        position: +position,
        storeItem: { slug },
      });
      return filePath;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteImage(fileKey: string): Promise<string> {
    const params = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: fileKey,
    };

    try {
      await this.s3.send(new DeleteObjectCommand(params));
      await this.storeItemImageRepository.delete({ image: fileKey });
      return fileKey;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async uploadImages(
    files: Express.Multer.File[],
    formDataInputDto: FormDataInputDto,
  ): Promise<string[]> {
    const fileKeys: string[] = [];
    for (const file of files) {
      const fileKey = await this.uploadImage(file, formDataInputDto);
      fileKeys.push(fileKey);
      return fileKeys;
    }
  }

  async deleteImages(fileKeys: string[]): Promise<string[]> {
    const deletedFileKeys: string[] = [];
    for (const fileKey of fileKeys) {
      const deletedFileKey = await this.deleteImage(fileKey);
      deletedFileKeys.push(deletedFileKey);
      return deletedFileKeys;
    }
  }
}
