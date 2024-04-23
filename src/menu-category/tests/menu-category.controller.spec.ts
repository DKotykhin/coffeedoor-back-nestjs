import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@nestjs/passport';

import {
  AllMenuController,
  MenuCategoryController,
} from '../menu-category.controller';
import { MenuCategoryService } from '../menu-category.service';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { LanguageCode } from '../../database/db.enums';
import { MenuCategory } from '../entities/menu-category.entity';
import { ChangeMenuCategoryPositionDto } from '../dto/change-menu-category-position.dto';
import { CreateMenuCategoryDto } from '../dto/create-menu-category.dto';

const mockMenuCategory: MenuCategory = {
  id: '48670bd2-6392-42b6-9ef1-1d5867a175cf',
  createdAt: new Date(),
  updatedAt: new Date(),
  language: LanguageCode.UA,
  title: 'Test title',
  description: 'Test description',
  image: 'Test image url',
  hidden: false,
  position: 0,
  menuItems: [],
};

const mockMenuCategoryService = {
  findByLanguage: jest.fn((language: LanguageCode) => {
    return [{ language, ...mockMenuCategory }];
  }),
  findAll: jest.fn(() => {
    return [mockMenuCategory];
  }),
  findById: jest.fn((id: string) => {
    return { id, ...mockMenuCategory };
  }),
  create: jest.fn((dto: CreateMenuCategoryDto) => {
    return { id: 'new-id', ...dto };
  }),
  update: jest.fn((id: string, dto: MenuCategory) => {
    return { id, ...dto };
  }),
  changePosition: jest.fn((dto: ChangeMenuCategoryPositionDto) => {
    return {
      ...mockMenuCategory,
      position: dto.newPosition,
      id: dto.menuCategoryId,
    };
  }),
  remove: jest.fn((id: string) => {
    return { id };
  }),
};

const mockGuard = {
  canActivate: jest.fn(() => {
    return true;
  }),
};

describe('AllMenuController', () => {
  let controller: AllMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllMenuController],
      providers: [MenuCategoryService],
    })
      .overrideProvider(MenuCategoryService)
      .useValue(mockMenuCategoryService)
      .compile();

    controller = module.get<AllMenuController>(AllMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of menu categories by language', async () => {
    expect(await controller.findByLanguage(LanguageCode.EN)).toEqual([
      { language: LanguageCode.EN, ...mockMenuCategory },
    ]);
  });
});

describe('MenuCategoryController', () => {
  let controller: MenuCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuCategoryController],
      providers: [MenuCategoryService],
    })
      .overrideProvider(MenuCategoryService)
      .useValue(mockMenuCategoryService)
      .overrideGuard(AuthGuard)
      .useValue(mockGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockGuard)
      .compile();

    controller = module.get<MenuCategoryController>(MenuCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of menu categories', async () => {
    expect(await controller.findAll()).toEqual([mockMenuCategory]);
  });

  it('should return a menu category by id', async () => {
    expect(await controller.findById('id')).toEqual({
      id: 'id',
      ...mockMenuCategory,
    });
  });

  it('should create a menu category', async () => {
    const dto = {
      language: LanguageCode.EN,
      title: 'Test title',
      description: 'Test description',
      image: 'Test image url',
      hidden: false,
      position: 1,
    };
    expect(await controller.create(dto)).toEqual({
      id: 'new-id',
      ...dto,
    });
  });

  it('should update a menu category', async () => {
    const dto = {
      language: LanguageCode.EN,
      title: 'Updated test title',
      description: 'Updated test description',
      image: 'Updated test image url',
      hidden: false,
      position: 1,
    };
    expect(await controller.update('id', dto)).toEqual({
      id: 'id',
      ...dto,
    });
  });

  it('should change a menu category position', async () => {
    const dto = {
      menuCategoryId: 'id',
      newPosition: 2,
      oldPosition: 1,
    };
    expect(await controller.changePosition(dto)).toEqual({
      ...mockMenuCategory,
      position: dto.newPosition,
      id: dto.menuCategoryId,
    });
  });

  it('should remove a menu category', async () => {
    expect(await controller.remove('id')).toEqual({ id: 'id' });
  });
});
