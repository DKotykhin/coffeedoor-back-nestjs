import { Column, Entity, OneToOne } from 'typeorm';

import { BaseEntity } from '../../database/base.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class ResetPassword extends BaseEntity {
  @Column()
  token: string;

  @Column()
  expiredAt: string;

  @Column()
  isUsed: Date;

  @OneToOne('User', 'emailConfirm')
  user: User;
}
