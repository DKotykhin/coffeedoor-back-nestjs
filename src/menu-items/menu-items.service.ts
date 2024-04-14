import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async findAllByCategoryId(categoryId: string): Promise<MenuItem[]> {
    try {
      return await this.menuItemRepository.find({
        where: { category: { id: categoryId } },
        order: {
          position: 'ASC',
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findById(id: string): Promise<MenuItem> {
    try {
      return await this.menuItemRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    try {
      return await this.entityManager.save(MenuItem, {
        ...createMenuItemDto,
        category: { id: createMenuItemDto.categoryId },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  async update(
    id: string,
    updateMenuItemDto: UpdateMenuItemDto,
  ): Promise<MenuItem> {
    try {
      return await this.entityManager.save(MenuItem, {
        id,
        ...updateMenuItemDto,
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const result = await this.menuItemRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return id;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
