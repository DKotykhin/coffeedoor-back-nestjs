import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { LanguageCode } from '../database/db.enums';
import { StatusResponseDto } from '../auth/dto/status-response.dto';
import { StoreItemImage } from '../store-item-image/entities/store-item-image.entity';
import { StoreItemWithImageUrl } from '../store-item/dto/store-item-with-imageUrl.dto';
import { StoreItemImageService } from '../store-item-image/store-item-image.service';
import { StoreCategory } from './entities/store-category.entity';
import { CreateStoreCategoryDto } from './dto/create-store-category.dto';
import { UpdateStoreCategoryDto } from './dto/update-store-category.dto';

@Injectable()
export class StoreCategoryService {
  constructor(
    @InjectRepository(StoreCategory)
    private readonly storeCategoryRepository: Repository<StoreCategory>,
    private readonly entityManager: EntityManager,
    private readonly storeItemImageService: StoreItemImageService,
  ) {}

  async findByLanguage(language: LanguageCode): Promise<StoreCategory[]> {
    try {
      const store = await this.storeCategoryRepository.find({
        where: {
          language,
          hidden: false,
        },
        relations: ['storeItems', 'storeItems.images'],
        order: {
          position: 'ASC',
          storeItems: {
            position: 'ASC',
          },
        },
      });
      await Promise.all(
        store.map(async (category) => {
          category.storeItems = await Promise.all(
            category.storeItems.map(async (item: StoreItemWithImageUrl) => {
              item.imageUrl = await Promise.all(
                item.images.map(async (image: StoreItemImage) => {
                  return await this.storeItemImageService.getImageUrl(
                    image.image,
                  );
                }),
              );
              return item;
            }),
          );
        }),
      );
      return store;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findAll(): Promise<StoreCategory[]> {
    try {
      return await this.storeCategoryRepository.find({
        relations: ['storeItems', 'storeItems.images'],
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findById(id: string): Promise<StoreCategory> {
    try {
      return await this.storeCategoryRepository.findOne({
        where: { id },
        relations: ['storeItems', 'storeItems.images'],
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async create(
    createStoreCategoryDto: CreateStoreCategoryDto,
  ): Promise<StoreCategory> {
    try {
      return await this.entityManager.save(
        StoreCategory,
        createStoreCategoryDto,
      );
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

  async remove(id: string): Promise<StatusResponseDto> {
    try {
      const result = await this.storeCategoryRepository.delete(id);
      if (result.affected === 0) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return {
        status: true,
        message: `Store category ${id} successfully deleted`,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
