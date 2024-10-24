import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { User } from '../../user/entities/user.entity';
import { Notice } from '../../notice/entities/notice.entity';

@Entity()
export class Comment extends BaseEntity {
  @ManyToOne(() => User, (user: User) => user.comments)
  public user: User;

  @Column()
  public description: string;

  @ManyToOne(() => Notice, (notice: Notice) => notice.comments)
  @JoinColumn()
  public notice: Notice;
}
