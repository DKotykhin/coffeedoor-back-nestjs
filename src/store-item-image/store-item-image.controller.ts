import { Controller } from '@nestjs/common';
import { StoreItemImageService } from './store-item-image.service';

@Controller('store-item-image')
export class StoreItemImageController {
  constructor(private readonly storeItemImageService: StoreItemImageService) {}
}
