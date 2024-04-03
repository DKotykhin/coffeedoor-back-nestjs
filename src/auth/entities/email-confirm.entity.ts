import { Column, Entity, OneToOne } from 'typeorm';

import { BaseEntity } from '../../database/base.entity';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class EmailConfirm extends BaseEntity {
  @Column()
  token: string;

  @Column()
  expiredAt: string;

  @OneToOne('User', 'emailConfirm')
  user: User;
}
