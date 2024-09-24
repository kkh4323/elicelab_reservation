import { Column, Entity, JoinColumn, OneToOne, Unique } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { Space } from '../../space/entities/space.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
@Unique(['user', 'space', 'reservationDate'])
export class Reservation extends BaseEntity {
  @OneToOne(() => User, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public user: User;

  @OneToOne(() => Space, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public space: Space;

  @Column()
  public reservationDate: Date;

  @Column('integer', {
    array: true,
    nullable: true,
  })
  public seatNumber?: number[];

  @Column()
  public startTime: string;

  @Column()
  public endTime: string;
}
