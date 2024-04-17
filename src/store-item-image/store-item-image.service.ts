import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class StoreItemImageService {
  constructor(private readonly configService: ConfigService) {}

  s3 = new S3Client({
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
    region: this.configService.get('AWS_REGION'),
  });

  async getImageUrl(fileKey: string) {
    const params = {
      Bucket: this.configService.get('AWS_BUCKET_NAME'),
      Key: fileKey,
    };
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });

    return url;
  }
}
