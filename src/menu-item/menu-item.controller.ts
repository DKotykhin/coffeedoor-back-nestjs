import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { HasRoles } from '../auth/decorators/roles.decorator';
import { RoleTypes } from '../database/db.enums';
import { RolesGuard } from '../auth/guards/roles.guard';
import { StatusResponseDto } from '../auth/dto/status-response.dto';

import { MenuItemService } from './menu-item.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { MenuItem } from './entities/menu-item.entity';
import { ChangeMenuItemPositionDto } from './dto/change-menu-item-position.dto';

@Controller('menu-items')
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Get()
  findAllByCategoryId(
    @Query('categoryId') categoryId: string,
  ): Promise<MenuItem[]> {
    return this.menuItemService.findAllByCategoryId(categoryId);
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<MenuItem> {
    return this.menuItemService.findById(id);
  }

  @Post()
  create(@Body() createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    return this.menuItemService.create(createMenuItemDto);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<MenuItem> {
    return this.menuItemService.update(id, updateMenuItemDto);
  }

  @Patch('change-position')
  changePosition(
    @Body() changeMenuItemPositionDto: ChangeMenuItemPositionDto,
  ): Promise<MenuItem> {
    return this.menuItemService.changePosition(changeMenuItemPositionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<StatusResponseDto> {
    return this.menuItemService.remove(id);
  }
}
