import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../database/base.entity';
import { UserOrder } from '../../user-order/entities/user-order.entity';

@Entity()
export class OrderItem extends BaseEntity {
  @Column()
  slug: string;

  @Column()
  categoryTitle: string;

  @Column()
  itemTitle: string;

  @Column({ default: 0 })
  price: number;

  @Column({ default: 0 })
  quantity: number;

  @Column({ nullable: true })
  weight: number;

  @ManyToOne(() => UserOrder, (order) => order.userOrderItems)
  userOrder: UserOrder;
}
