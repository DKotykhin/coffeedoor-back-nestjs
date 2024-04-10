import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MenuCategoriesService } from './menu-categories.service';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';
import { LanguageCode } from '../database/db.enums';

@Controller('all-menu')
export class AllMenuController {
  constructor(private readonly menuCategoriesService: MenuCategoriesService) {}

  @Get()
  findByLanguage(@Query('language') language: LanguageCode) {
    return this.menuCategoriesService.findByLanguage(language);
  }
}

@Controller('menu-categories')
export class MenuCategoriesController {
  constructor(private readonly menuCategoriesService: MenuCategoriesService) {}

  @Post()
  create(@Body() createMenuCategoryDto: CreateMenuCategoryDto) {
    return this.menuCategoriesService.create(createMenuCategoryDto);
  }

  @Get()
  findAll() {
    return this.menuCategoriesService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.menuCategoriesService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuCategoryDto: UpdateMenuCategoryDto,
  ) {
    return this.menuCategoriesService.update(id, updateMenuCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuCategoriesService.remove(id);
  }
}
