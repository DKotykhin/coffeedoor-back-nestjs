import { Column, Entity, OneToOne } from 'typeorm';

import { BaseEntity } from '../../database/base.entity';
import { RoleTypes } from 'src/database/db.enums';
import { EmailConfirm } from 'src/auth/entities/email-confirm.entity';
import { ResetPassword } from 'src/auth/entities/reset-password.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  email: string;

  @Column({ nullable: true })
  userName: string;

  @Column({ nullable: true })
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

  @OneToOne('EmailConfirm', 'user', { cascade: true })
  emailConfirm: EmailConfirm;

  @OneToOne('ResetPassword', 'user', { cascade: true })
  resetPassword: ResetPassword;

  constructor(partial: Partial<User>) {
    super(partial);
    Object.assign(this, partial);
  }
}
