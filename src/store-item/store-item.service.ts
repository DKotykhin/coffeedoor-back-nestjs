import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { StoreItem } from './entities/store-item.entity';
import { CreateStoreItemDto } from './dto/create-store-item.dto';
import { UpdateStoreItemDto } from './dto/update-store-item.dto';

@Injectable()
export class StoreItemService {
  constructor(
    @InjectRepository(StoreItem)
    private readonly storeItemRepository: Repository<StoreItem>,
    private readonly entityManager: EntityManager,
  ) {}

  async findAllByCategoryId(categoryId: string): Promise<StoreItem[]> {
    try {
      return await this.storeItemRepository.find({
        where: { category: { id: categoryId } },
        order: {
          position: 'ASC',
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findBySlug(slug: string): Promise<StoreItem> {
    try {
      return await this.storeItemRepository.findOne({
        where: { slug },
        relations: ['category'],
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async findBySlugWithRecommendations(
    slug: string,
  ): Promise<{ storeItem: StoreItem; recommendationList: StoreItem[] }> {
    try {
      const storeItem = await this.findBySlug(slug);
      const itemsByCategory = await this.findAllByCategoryId(
        storeItem.category.id,
      );

      const copyArr = itemsByCategory?.slice();
      const itemIndex = copyArr.findIndex(
        (item) => item.slug === storeItem.slug,
      );
      copyArr.splice(itemIndex, 1);
      const recommendationList = [];
      const n = 2;
      if (n < copyArr.length) {
        for (let i = 0; i < n; i++) {
          const randomIndex = Math.floor(Math.random() * copyArr.length);
          recommendationList.push(copyArr[randomIndex]);
          copyArr.splice(randomIndex, 1);
        }
      } else {
        recommendationList.push(...copyArr);
      }

      return {
        storeItem,
        recommendationList,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async create(createStoreItemDto: CreateStoreItemDto): Promise<StoreItem> {
    try {
      return await this.entityManager.save(StoreItem, {
        ...createStoreItemDto,
        category: { id: createStoreItemDto.categoryId },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  async update(
    slug: string,
    updateStoreItemDto: UpdateStoreItemDto,
  ): Promise<StoreItem> {
    try {
      return await this.entityManager.transaction(async (manager) => {
        const storeItem = await manager.findOne(StoreItem, { where: { slug } });
        if (!storeItem) {
          throw new HttpException('Not found', HttpStatus.NOT_FOUND);
        }
        return await manager.save(StoreItem, {
          ...storeItem,
          ...updateStoreItemDto,
        });
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async remove(slug: string): Promise<string> {
    try {
      const result = await this.storeItemRepository.delete(slug);
      if (result.affected === 0) {
        throw new HttpException('Not found', HttpStatus.NOT_FOUND);
      }
      return slug;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
