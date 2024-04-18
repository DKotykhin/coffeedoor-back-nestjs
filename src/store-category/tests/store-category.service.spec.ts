import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager } from 'typeorm';

import { StoreCategoryService } from '../store-category.service';
import { StoreItemImageService } from '../../store-item-image/store-item-image.service';

describe('StoreCategoryService', () => {
  let service: StoreCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreCategoryService,
        {
          provide: 'StoreCategoryRepository',
          useValue: {},
        },
        {
          provide: EntityManager,
          useValue: {},
        },
        {
          provide: StoreItemImageService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<StoreCategoryService>(StoreCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
