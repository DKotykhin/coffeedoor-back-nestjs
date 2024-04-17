import { Column, Entity, OneToMany } from 'typeorm';

import { BaseEntity } from '../../database/base.entity';
import { LanguageCode } from '../../database/db.enums';
import { StoreItem } from '../../store-item/entities/store-item.entity';

@Entity()
export class StoreCategory extends BaseEntity {
  @Column({ type: 'enum', enum: LanguageCode, default: LanguageCode.UA })
  language: LanguageCode;

  @Column()
  title: string;

  @Column({ nullable: true })
  subtitle: string;

  @Column({ default: false })
  hidden: boolean;

  @Column({ default: 0 })
  position: number;

  @OneToMany(() => StoreItem, (item) => item.category, { cascade: true })
  storeItems: StoreItem[];
}
