import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { MenuItem } from './entities/menu-item.entity';

@Controller('menu-items')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Post()
  create(@Body() createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    return this.menuItemsService.create(createMenuItemDto);
  }

  @Get()
  findAll(): Promise<MenuItem[]> {
    return this.menuItemsService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<MenuItem> {
    return this.menuItemsService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<MenuItem> {
    return this.menuItemsService.update(id, updateMenuItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.menuItemsService.remove(id);
  }
}
