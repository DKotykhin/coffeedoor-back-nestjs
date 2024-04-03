import { Column, Entity, ManyToOne } from 'typeorm';

import { MenuCategory } from '../../menu-categories/entities/menu-category.entity';
import { BaseEntity } from '../../database/base.entity';
import { LanguageCode } from 'src/database/db.enums';

@Entity()
export class MenuItem extends BaseEntity {
  @Column({ type: 'enum', enum: LanguageCode, default: LanguageCode.UA })
  language: LanguageCode;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  price: string;

  @Column({ default: false })
  hidden: boolean;

  @Column({ default: 0 })
  position: number;

  @ManyToOne('MenuCategory', 'menuItems', { onDelete: 'CASCADE' })
  category: MenuCategory;

  constructor(partial: Partial<MenuItem>) {
    super(partial);
    Object.assign(this, partial);
  }
}
