import { Column, Entity } from 'typeorm';
import { Location } from './location.enum';
import { BaseEntity } from '../../common/base.entity';

@Entity()
export class Space extends BaseEntity {
  @Column()
  public name: string;

  @Column({
    type: 'enum',
    enum: Location,
    default: Location.SEOUL,
  })
  public location: Location;

  @Column({ default: 1 })
  public maxPeople: number;

  @Column()
  public description: string;

  @Column()
  public imgs: string;
}
