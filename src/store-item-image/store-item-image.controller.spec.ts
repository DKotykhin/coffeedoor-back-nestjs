import { Test, TestingModule } from '@nestjs/testing';

import { StoreItemImageController } from './store-item-image.controller';
import { StoreItemImageService } from './store-item-image.service';

describe('StoreItemImageController', () => {
  let controller: StoreItemImageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreItemImageController],
      providers: [StoreItemImageService],
    })
      .overrideProvider(StoreItemImageService)
      .useValue({})
      .compile();

    controller = module.get<StoreItemImageController>(StoreItemImageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
