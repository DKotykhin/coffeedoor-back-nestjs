import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { LanguageCode } from '../../database/db.enums';
import { StoreCategory } from '../../store-category/entities/store-category.entity';

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

  @Column({ array: true, nullable: true })
  images: string;

  @Column({ default: false })
  hidden: boolean;

  @Column({ default: 0 })
  position: number;

  @ManyToOne(() => StoreCategory, (item) => item.storeItems, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  category: StoreCategory;
}
