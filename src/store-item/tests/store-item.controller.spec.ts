import { Test, TestingModule } from '@nestjs/testing';

import {
  StoreItemController,
  StoreItemWithRecommendationsController,
} from '../store-item.controller';
import { StoreItemService } from '../store-item.service';

describe('StoreItemController', () => {
  let controller: StoreItemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        StoreItemController,
        StoreItemWithRecommendationsController,
      ],
      providers: [StoreItemService],
    })
      .overrideProvider(StoreItemService)
      .useValue({})
      .compile();

    controller = module.get<StoreItemController>(StoreItemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
