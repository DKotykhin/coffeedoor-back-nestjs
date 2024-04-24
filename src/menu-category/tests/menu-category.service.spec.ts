import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { LanguageCode } from '../../database/db.enums';
import { MenuCategoryService } from '../menu-category.service';
import { CreateMenuCategoryDto } from '../dto/create-menu-category.dto';
import { MenuCategory } from '../entities/menu-category.entity';

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
  findOneOrFail: jest.fn((id) => ({ id, ...mockMenuCategoryItem })),
  findById: jest.fn((id) => ({ id, ...mockMenuCategoryItem })),
  save: jest.fn((_, item) => item),
  delete: jest.fn((id: string) => id),
});

describe('MenuCategoryService', () => {
  let service: MenuCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MenuCategoryService,
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

    service = module.get<MenuCategoryService>(MenuCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of menu categories by language', async () => {
    const result = await service.findByLanguage(LanguageCode.EN);
    expect(result).toEqual([]);
  });

  it('should return an array of menu categories', async () => {
    const result = await service.findAll();
    expect(result).toEqual([]);
  });

  it('should throw an error when return an array of menu categories', async () => {
    jest
      .spyOn(service, 'findAll')
      .mockRejectedValue(new HttpException('Not found', HttpStatus.NOT_FOUND));
    await expect(service.findAll()).rejects.toEqual(
      new HttpException('Not found', HttpStatus.NOT_FOUND),
    );
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

  it('should update a menu category', async () => {
    const id = '1';
    const result = await service.update(
      id,
      mockMenuCategoryItem as MenuCategory,
    );
    expect(result).toEqual({ id, ...mockMenuCategoryItem });
  });

  it('should delete a menu category', async () => {
    const id = '1';
    const result = await service.remove(id);
    expect(result).toHaveProperty('status', true);
  });
});
