import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';

import { BaseEntity } from '../../database/base.entity';
import { RoleTypes } from '../../database/db.enums';
import { EmailConfirm } from '../../auth/entities/email-confirm.entity';
import { ResetPassword } from '../../auth/entities/reset-password.entity';
import { UserOrder } from '../../user-order/entities/user-order.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  userName: string;

  @Column({ nullable: true })
  @Exclude()
  passwordHash: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ type: 'enum', enum: RoleTypes, default: RoleTypes.USER })
  role: RoleTypes;

  @OneToOne(() => EmailConfirm, (emailConfirm) => emailConfirm.user, {
    cascade: true,
  })
  emailConfirm: EmailConfirm;

  @OneToOne(() => ResetPassword, (resetPassword) => resetPassword.user, {
    cascade: true,
  })
  resetPassword: ResetPassword;

  @OneToMany(() => UserOrder, (userOrder) => userOrder.user)
  userOrders: UserOrder[];

  constructor(partial: Partial<User>) {
    super(partial);
    Object.assign(this, partial);
  }
}
