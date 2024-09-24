import { Column, Entity, OneToOne } from 'typeorm';
import { Location } from './location.enum';
import { BaseEntity } from '../../common/base.entity';
import { Zone } from './zone.enum';
import { Reservation } from '../../reservation/entities/reservation.entity';

@Entity()
export class Space extends BaseEntity {
  @OneToOne(() => Reservation, (reservation: Reservation) => reservation.space)
  @Column()
  public name: string;

  @Column({
    type: 'enum',
    enum: Location,
    default: Location.SEOUL,
  })
  public location: Location;

  @Column({ default: 1 })
  public maxPeople?: number;

  @Column({
    type: 'enum',
    enum: Zone,
    default: Zone.MEETING,
  })
  public zone: Zone;

  @Column()
  public description: string;

  @Column('text', {
    array: true,
    nullable: true,
  })
  public spaceImg: string[];
}
