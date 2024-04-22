import { Test, TestingModule } from '@nestjs/testing';

import {
  AllStoreController,
  StoreCategoryController,
} from '../store-category.controller';
import { StoreCategoryService } from '../store-category.service';

describe('StoreCategoryController', () => {
  let controller: StoreCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoreCategoryController, AllStoreController],
      providers: [StoreCategoryService],
    })
      .overrideProvider(StoreCategoryService)
      .useValue({})
      .compile();

    controller = module.get<StoreCategoryController>(StoreCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
