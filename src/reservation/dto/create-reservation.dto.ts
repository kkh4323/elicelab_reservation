import { Space } from '../../space/entities/space.entity';
import { User } from '../../user/entities/user.entity';

export class CreateReservationDto {
  user: User;
  space: Space;
  reservationDate: Date;
  seatNumber: number[];
  startTime: string;
  endTime: string;
}
