import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { LanguageCode } from '../database/db.enums';
import { StoreCategory } from './entities/store-category.entity';
import { CreateStoreCategoryDto } from './dto/create-store-category.dto';
import { UpdateStoreCategoryDto } from './dto/update-store-category.dto';
import { BaseEntity } from 'src/database/base.entity';

@Injectable()
export class StoreCategoryService {
  constructor(
    @InjectRepository(StoreCategory)
    private readonly storeCategoryRepository: Repository<StoreCategory>,
    private readonly entityManager: EntityManager,
  ) {}

  async findByLanguage(language: LanguageCode): Promise<StoreCategory[]> {
    try {
      return await this.storeCategoryRepository.find({
        where: {
          language,
          hidden: false,
        },
        relations: ['storeItems'],
        order: {
          position: 'ASC',
          storeItems: {
            position: 'ASC',
          },
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findAll(): Promise<StoreCategory[]> {
    try {
      return await this.storeCategoryRepository.find({
        relations: ['storeItems'],
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findById(id: string): Promise<StoreCategory> {
    try {
      return await this.storeCategoryRepository.findOne({
        where: { id },
        relations: ['storeItems'],
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async create(
    createStoreCategoryDto: CreateStoreCategoryDto,
  ): Promise<StoreCategory> {
    const storeCategory = new StoreCategory(
      createStoreCategoryDto as Partial<BaseEntity>,
    );
    try {
      return await this.entityManager.save('StoreCategory', storeCategory);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  async update(
    id: string,
    updateStoreCategoryDto: UpdateStoreCategoryDto,
  ): Promise<StoreCategory> {
    try {
      const storeCategory = await this.findById(id);
      Object.assign(storeCategory, updateStoreCategoryDto);
      return await this.entityManager.save('StoreCategory', storeCategory);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: string): Promise<string> {
    try {
      const result = await this.storeCategoryRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return id;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
