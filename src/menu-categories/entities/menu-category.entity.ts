import { Column, Entity, OneToMany } from 'typeorm';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import { BaseEntity } from 'src/database/base.entity';

export enum LanguageCode {
  UA = 'UA',
  EN = 'EN',
}

@Entity()
export class MenuCategory extends BaseEntity {
  @Column({ type: 'enum', enum: LanguageCode, default: LanguageCode.UA })
  language: LanguageCode;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({ default: false })
  hidden: boolean;

  @Column({ default: 0 })
  position: number;

  @OneToMany('MenuItem', 'category', { cascade: true })
  menuItems: MenuItem[];

  constructor(partial: Partial<MenuCategory>) {
    super(partial);
    Object.assign(this, partial);
  }
}
