import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager } from 'typeorm';

import { MenuItemsService } from './menu-items.service';

describe('MenuItemsService', () => {
  let service: MenuItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuItemsService,
        {
          provide: 'MenuItemRepository',
          useValue: {},
        },
        {
          provide: EntityManager,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<MenuItemsService>(MenuItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
