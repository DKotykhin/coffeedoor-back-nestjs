import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager } from 'typeorm';

import { LanguageCode } from '../database/db.enums';
import { MenuCategoriesService } from './menu-categories.service';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { MenuCategory } from './entities/menu-category.entity';

const mockMenuCategoryItem: Partial<MenuCategory> = {
  id: '1',
  title: 'Test Menu Category',
  description: 'Test Description',
  language: LanguageCode.EN,
  position: 1,
  hidden: false,
  menuItems: [],
};

const mockMenuCategoryRepository = () => ({
  find: jest.fn(() => []),
  findOne: jest.fn((id) => ({ id, ...mockMenuCategoryItem })),
  save: jest.fn((_, item) => item),
  delete: jest.fn((id: string) => id),
});

describe('MenuCategoriesService', () => {
  let service: MenuCategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuCategoriesService,
        {
          provide: 'MenuCategoryRepository',
          useFactory: mockMenuCategoryRepository,
        },
        {
          provide: EntityManager,
          useFactory: mockMenuCategoryRepository,
        },
      ],
    }).compile();

    service = module.get<MenuCategoriesService>(MenuCategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of menu categories', async () => {
    const result = await service.findAll();
    expect(result).toEqual([]);
  });

  it('should return a single menu category', async () => {
    const id = '1';
    const result = await service.findById(id);
    expect(result).toEqual({ id, ...mockMenuCategoryItem });
  });

  it('should create a new menu category', async () => {
    const mockCreateMenuCategoryDto: CreateMenuCategoryDto = {
      title: 'Test Menu Category',
      description: 'Test Description',
      language: LanguageCode.EN,
      position: 1,
    };
    const result = await service.create(mockCreateMenuCategoryDto);
    expect(result).toEqual(mockCreateMenuCategoryDto);
  });

  it('should delete a menu category', async () => {
    const id = '1';
    const result = await service.remove(id);
    expect(result).toEqual(id);
  });
});
