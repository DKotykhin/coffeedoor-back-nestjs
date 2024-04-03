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
import { LanguageCode } from 'src/database/db.enums';

@Controller('all-menu')
export class AllMenuController {
  constructor(private readonly menuCategoriesService: MenuCategoriesService) {}

  @Get()
  async findByLanguage(@Query('language') language: LanguageCode) {
    return await this.menuCategoriesService.findByLanguage(language);
  }
}

@Controller('menu-categories')
export class MenuCategoriesController {
  constructor(private readonly menuCategoriesService: MenuCategoriesService) {}

  @Post()
  async create(@Body() createMenuCategoryDto: CreateMenuCategoryDto) {
    return await this.menuCategoriesService.create(createMenuCategoryDto);
  }

  @Get()
  async findAll() {
    return await this.menuCategoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.menuCategoriesService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMenuCategoryDto: UpdateMenuCategoryDto,
  ) {
    return await this.menuCategoriesService.update(id, updateMenuCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.menuCategoriesService.remove(id);
  }
}
