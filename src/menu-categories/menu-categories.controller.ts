import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LanguageCode } from '../database/db.enums';
import { MenuCategoriesService } from './menu-categories.service';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';
import { MenuCategory } from './entities/menu-category.entity';

@Controller('all-menu')
export class AllMenuController {
  constructor(private readonly menuCategoriesService: MenuCategoriesService) {}

  @Get()
  findByLanguage(
    @Query('language') language: LanguageCode,
  ): Promise<MenuCategory[]> {
    return this.menuCategoriesService.findByLanguage(language);
  }
}

@Controller('menu-categories')
@UseGuards(AuthGuard('jwt'))
export class MenuCategoriesController {
  constructor(private readonly menuCategoriesService: MenuCategoriesService) {}

  @Post()
  create(
    @Body() createMenuCategoryDto: CreateMenuCategoryDto,
  ): Promise<MenuCategory> {
    return this.menuCategoriesService.create(createMenuCategoryDto);
  }

  @Get()
  findAll(): Promise<MenuCategory[]> {
    return this.menuCategoriesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<MenuCategory> {
    return this.menuCategoriesService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuCategoryDto: UpdateMenuCategoryDto,
  ): Promise<MenuCategory> {
    return this.menuCategoriesService.update(id, updateMenuCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.menuCategoriesService.remove(id);
  }
}
