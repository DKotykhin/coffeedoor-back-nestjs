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
import { StoreItemService } from './store-item.service';
import { StoreItem } from './entities/store-item.entity';
import { CreateStoreItemDto } from './dto/create-store-item.dto';
import { UpdateStoreItemDto } from './dto/update-store-item.dto';

@Controller('store-items')
@HasRoles(RoleTypes.ADMIN, RoleTypes.SUBADMIN)
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class StoreItemController {
  constructor(private readonly storeItemService: StoreItemService) {}

  @Get()
  findAllByCategoryId(
    @Query('categoryId') categoryId: string,
  ): Promise<StoreItem[]> {
    return this.storeItemService.findAllByCategoryId(categoryId);
  }

  @Get(':slug')
  findById(@Param('slug') slug: string): Promise<StoreItem> {
    return this.storeItemService.findBySlug(slug);
  }

  @Post()
  create(@Body() createStoreItemDto: CreateStoreItemDto): Promise<StoreItem> {
    return this.storeItemService.create(createStoreItemDto);
  }

  @Patch(':slug')
  update(
    @Param('slug') slug: string,
    @Body() updateStoreItemDto: UpdateStoreItemDto,
  ): Promise<StoreItem> {
    return this.storeItemService.update(slug, updateStoreItemDto);
  }

  @Delete(':slug')
  remove(@Param('slug') slug: string): Promise<string> {
    return this.storeItemService.remove(slug);
  }
}
