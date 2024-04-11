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
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../user/entities/user.entity';
import { MenuCategoriesService } from './menu-categories.service';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';

@Controller('all-menu')
export class AllMenuController {
  constructor(private readonly menuCategoriesService: MenuCategoriesService) {}

  @Get()
  findByLanguage(@Query('language') language: LanguageCode) {
    return this.menuCategoriesService.findByLanguage(language);
  }
}

@Controller('menu-categories')
@UseGuards(AuthGuard('jwt'))
export class MenuCategoriesController {
  constructor(private readonly menuCategoriesService: MenuCategoriesService) {}

  @Post()
  create(@Body() createMenuCategoryDto: CreateMenuCategoryDto) {
    return this.menuCategoriesService.create(createMenuCategoryDto);
  }

  @Get()
  findAll(@GetUser() user: Partial<User>) {
    console.log(user);
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
