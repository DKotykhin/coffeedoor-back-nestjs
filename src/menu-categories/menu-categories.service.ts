import { Injectable } from '@nestjs/common';
import { CreateMenuCategoryDto } from './dto/create-menu-category.dto';
import { UpdateMenuCategoryDto } from './dto/update-menu-category.dto';
import { EntityManager, Repository } from 'typeorm';
import { LanguageCode, MenuCategory } from './entities/menu-category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MenuCategoriesService {
  constructor(
    @InjectRepository(MenuCategory)
    private readonly menuCategoryRepository: Repository<MenuCategory>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createMenuCategoryDto: CreateMenuCategoryDto) {
    const menuCategory = new MenuCategory(createMenuCategoryDto);
    return this.entityManager.save('MenuCategory', menuCategory);
  }

  async findAll() {
    const menuCategories = await this.menuCategoryRepository.find({
      relations: ['menuItems'],
    });
    return menuCategories;
  }

  async findOne(id: string) {
    // return await this.entityManager.findOne('MenuCategory', { where: { id } });
    return await this.menuCategoryRepository.findOne({
      where: { id },
      relations: ['menuItems'],
    });
  }

  async findByLanguage(language: LanguageCode) {
    return await this.menuCategoryRepository.find({
      where: { language },
      relations: ['menuItems'],
    });
  }

  async update(id: string, updateMenuCategoryDto: UpdateMenuCategoryDto) {
    // return await this.menuCategoryRepository.update(id, updateMenuCategoryDto);
    const menuCategory = await this.findOne(id);
    Object.assign(menuCategory, updateMenuCategoryDto);
    return await this.entityManager.save('MenuCategory', menuCategory);
  }

  async remove(id: string) {
    return await this.menuCategoryRepository.delete(id);
  }
}
