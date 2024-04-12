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

import { LanguageCode, RoleTypes } from '../database/db.enums';
import { HasRoles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
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
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class MenuCategoriesController {
  constructor(private readonly menuCategoriesService: MenuCategoriesService) {}

  @Get()
  findAll(): Promise<MenuCategory[]> {
    return this.menuCategoriesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<MenuCategory> {
    return this.menuCategoriesService.findById(id);
  }

  @Post()
  create(
    @Body() createMenuCategoryDto: CreateMenuCategoryDto,
  ): Promise<MenuCategory> {
    return this.menuCategoriesService.create(createMenuCategoryDto);
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
