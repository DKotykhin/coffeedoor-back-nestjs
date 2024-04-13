import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { LanguageCode } from '../database/db.enums';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';
import { MenuCategory } from './entities/menu-category.entity';

@Injectable()
export class MenuCategoriesService {
  constructor(
    @InjectRepository(MenuCategory)
    private readonly menuCategoryRepository: Repository<MenuCategory>,
    private readonly entityManager: EntityManager,
  ) {}

  async findByLanguage(language: LanguageCode): Promise<MenuCategory[]> {
    try {
      return await this.menuCategoryRepository.find({
        where: {
          language,
          hidden: false,
        },
        relations: ['menuItems'],
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findAll(): Promise<MenuCategory[]> {
    try {
      return await this.menuCategoryRepository.find({
        relations: ['menuItems'],
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findById(id: string): Promise<MenuCategory> {
    // return await this.entityManager.findOne('MenuCategory', { where: { id } });
    try {
      return await this.menuCategoryRepository.findOne({
        where: { id },
        relations: ['menuItems'],
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async create(createMenuCategoryDto: CreateMenuCategoryDto) {
    const menuCategory = new MenuCategory(createMenuCategoryDto);
    try {
      return await this.entityManager.save('MenuCategory', menuCategory);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  async update(
    id: string,
    updateMenuCategoryDto: UpdateMenuCategoryDto,
  ): Promise<MenuCategory> {
    // return await this.menuCategoryRepository.update(id, updateMenuCategoryDto);
    try {
      const menuCategory = await this.findById(id);
      Object.assign(menuCategory, updateMenuCategoryDto);
      return await this.entityManager.save('MenuCategory', menuCategory);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const result = await this.menuCategoryRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return id;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
