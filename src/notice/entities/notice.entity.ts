import { BaseEntity } from '../../common/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';

@Entity()
export class Notice extends BaseEntity {
  @ManyToOne(() => User, (user: User) => user.notices)
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

  @OneToMany(() => Comment, (comment: Comment) => comment.notice)
  public comments: string[];
}
