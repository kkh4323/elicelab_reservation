import { Space } from '../../space/entities/space.entity';
import { User } from '../../user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { CreateSpaceDto } from '../../space/dto/create-space.dto';

export class CreateReservationDto {
  user: User;

  @ApiProperty({ example: 'id' })
  space: Space;

  @ApiProperty({
    type: Date,
  })
  reservationDate: Date;

  @ApiProperty({ example: [1] })
  seatNumber: number[];

  @ApiProperty({ example: '09:30' })
  startTime: string;

  @ApiProperty({ example: '22:00' })
  endTime: string;
}
