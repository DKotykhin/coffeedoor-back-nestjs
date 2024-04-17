import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { LanguageCode } from '../../database/db.enums';
import { StoreCategory } from '../../store-category/entities/store-category.entity';
import { StoreItemImage } from '../../store-item-image/entities/store-item-image.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class StoreItem {
  @PrimaryColumn()
  slug: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'enum', enum: LanguageCode, default: LanguageCode.UA })
  language: LanguageCode;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  details: string;

  @Column({ nullable: true })
  sortKey: string;

  @Column({ nullable: true })
  sortValue: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  tm: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  oldPrice: number;

  @Column({ nullable: true })
  discount: number;

  @Column({ nullable: true })
  weight: number;

  @Column({ default: false })
  hidden: boolean;

  @Column({ default: 0 })
  position: number;

  @ManyToOne(() => StoreCategory, (item) => item.storeItems, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  category: StoreCategory;

  @Exclude()
  @OneToMany(() => StoreItemImage, (image) => image.storeItem, {
    onDelete: 'CASCADE',
  })
  images: StoreItemImage[];
}
