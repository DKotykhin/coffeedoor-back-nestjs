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
import { HasRoles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { MenuCategoryService } from './menu-category.service';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';
import { MenuCategory } from './entities/menu-category.entity';
import { ChangeMenuCategoryPositionDto } from './dto/change-menu-category-position.dto';

@Controller('all-menu')
export class AllMenuController {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Get()
  findByLanguage(
    @Query('language') language: LanguageCode,
  ): Promise<MenuCategory[]> {
    return this.menuCategoryService.findByLanguage(language);
  }
}

@Controller('menu-categories')
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class MenuCategoryController {
  constructor(private readonly menuCategoryService: MenuCategoryService) {}

  @Get()
  findAll(): Promise<MenuCategory[]> {
    return this.menuCategoryService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<MenuCategory> {
    return this.menuCategoryService.findById(id);
  }

  @Post()
  create(
    @Body() createMenuCategoryDto: CreateMenuCategoryDto,
  ): Promise<MenuCategory> {
    return this.menuCategoryService.create(createMenuCategoryDto);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateMenuCategoryDto: UpdateMenuCategoryDto,
  ): Promise<MenuCategory> {
    return this.menuCategoryService.update(id, updateMenuCategoryDto);
  }

  @Patch('change-position')
  changePosition(
    @Body() changeMenuCategoryPositionDto: ChangeMenuCategoryPositionDto,
  ): Promise<MenuCategory> {
    return this.menuCategoryService.changePosition(
      changeMenuCategoryPositionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.menuCategoryService.remove(id);
  }
}
