import { BeforeInsert, Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import * as bcrypt from 'bcryptjs';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @Column()
  public username: string;

  @Column()
  public phone: string;

  // @Column({
  //   type: 'enum',
  //   enum: TrackEnum,
  //   default: TrackEnum.NORMAL,
  // })
  // public track: TrackEnum;

  @BeforeInsert()
  async beforeSaveFunction() {
    //password 암호화
    const saltvalue = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, saltvalue);
  }
}
