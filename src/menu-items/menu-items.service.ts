import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { MenuItem } from './entities/menu-item.entity';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItem)
    private readonly menuItemRepository: Repository<MenuItem>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createMenuItemDto: CreateMenuItemDto) {
    return await this.entityManager.save(MenuItem, createMenuItemDto);
  }

  async findAll() {
    return await this.menuItemRepository.find();
  }

  async findOne(id: string) {
    return await this.menuItemRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateMenuItemDto: UpdateMenuItemDto) {
    return await this.entityManager.update(MenuItem, id, updateMenuItemDto);
  }

  async remove(id: string) {
    return await this.menuItemRepository.delete(id);
  }
}
