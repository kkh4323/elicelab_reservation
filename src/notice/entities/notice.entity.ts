import { BaseEntity } from '../../common/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Notice extends BaseEntity {
  @OneToOne(() => User, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public user: User;

  @Column()
  public title: string;

  @Column()
  public description: string;

  @Column('text', {
    array: true,
    nullable: true,
  })
  public tags: string[];
}
