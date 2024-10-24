import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import * as bcrypt from 'bcryptjs';
import * as gravatar from 'gravatar';
import { Provider } from './provider.enum';
import { AgreeOfTerm } from '../../agree-of-term/entities/agree-of-term.entity';
import { Role } from './role.enum';
import { Comment } from '../../comment/entities/comment.entity';
import { Notice } from '../../notice/entities/notice.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  public email: string;

  @Column({ nullable: true })
  public password?: string;

  @Column()
  public username: string;

  @Column({ nullable: true })
  public phone?: string;

  @Column({
    type: 'enum',
    enum: Provider,
    default: Provider.LOCAL,
  })
  public provider: Provider;

  @Column({
    type: 'enum',
    enum: Role,
    array: true,
    default: [Role.USER],
  })
  public roles: Role[];

  @Column({ nullable: true })
  public profileImg?: string;

  @OneToOne(() => AgreeOfTerm, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public agreeOfTerm: AgreeOfTerm;

  // @Column({
  //   type: 'enum',
  //   enum: TrackEnum,
  //   default: TrackEnum.NORMAL,
  // })
  // public track: TrackEnum;

  @OneToMany(() => Notice, (notice: Notice) => notice.user)
  public notices?: string[];

  @OneToMany(() => Comment, (comment: Comment) => comment.user)
  public comments?: string[];

  @BeforeInsert()
  async beforeSaveFunction() {
    if (this.provider !== Provider.LOCAL) {
      return;
    } else {
      // password 암호화
      const saltValue = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, saltValue);
      // 프로필 이미지 자동생성
      this.profileImg = gravatar.url(this.email, {
        s: '200',
        r: 'pg',
        d: 'mm',
        protocol: 'https',
      });
    }
  }
}
