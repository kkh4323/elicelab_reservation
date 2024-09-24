import { BaseEntity } from '../../common/base.entity';
import { Location } from '../../space/entities/location.enum';
import { Zone } from '../../space/entities/zone.enum';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Question extends BaseEntity {
  @OneToOne(() => User, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public user: User;

  @Column()
  public group: string;

  @Column()
  public eventName: string;

  @Column()
  public eventDate: Date;

  @Column()
  public participants: number;

  // @Column({
  //   type: 'enum',
  //   enum: Location,
  //   default: Location.SEOUL,
  // })
  @Column()
  public location: string;

  // @Column({
  //   type: 'enum',
  //   enum: Zone,
  //   default: [Zone.MEETING],
  //   array: true,
  // })
  @Column()
  public zone: string;

  @Column()
  public documentAddress: string;

  @Column()
  public personalInfo: boolean;
}
