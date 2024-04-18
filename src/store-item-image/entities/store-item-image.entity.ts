import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../database/base.entity';
import { StoreItem } from '../../store-item/entities/store-item.entity';

@Entity()
export class StoreItemImage extends BaseEntity {
  @Column()
  image: string;

  @Column({ default: 1 })
  position: number;

  @ManyToOne(() => StoreItem, (item) => item.images, { onDelete: 'CASCADE' })
  storeItem: StoreItem;
}
