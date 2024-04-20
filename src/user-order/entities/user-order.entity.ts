import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '../../database/base.entity';
import { DeliveryWay, OrderStatus } from '../../database/db.enums';
import { User } from '../../user/entities/user.entity';
import { OrderItem } from '../../order-item/entities/order-item.entity';

@Entity()
export class UserOrder extends BaseEntity {
  @Column({ type: 'enum', enum: DeliveryWay, default: DeliveryWay.PICKUP })
  deliveryWay: DeliveryWay;

  @Column({ nullable: true })
  deliveryAddress: string;

  @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.NEW })
  orderStatus: OrderStatus;

  @Column({ nullable: true })
  comment: string;

  @Column({ default: 0 })
  totalSum: number;

  @Column({ default: 0 })
  averageSum: number;

  @Column({ default: 0 })
  totalQuantity: number;

  @ManyToOne(() => User, (user) => user.userOrders)
  user: User;

  @OneToMany(() => OrderItem, (userOrderItem) => userOrderItem.userOrder)
  userOrderItems: OrderItem[];
}
