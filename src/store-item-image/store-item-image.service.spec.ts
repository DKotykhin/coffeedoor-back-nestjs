import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

import { StoreItemImageService } from './store-item-image.service';

describe('StoreItemImageService', () => {
  let service: StoreItemImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoreItemImageService,
        {
          provide: ConfigService,
          useValue: { get: () => undefined },
        },
        {
          provide: 'StoreItemImageRepository',
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<StoreItemImageService>(StoreItemImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
