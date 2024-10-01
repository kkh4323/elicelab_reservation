import { User } from '../../user/entities/user.entity';
import { Location } from '../../space/entities/location.enum';
import { Zone } from '../../space/entities/zone.enum';
import { ApiProperty } from '@nestjs/swagger';
import { boolean } from '@hapi/joi';

export class CreateQuestionDto {
  user: User;

  @ApiProperty({ example: '엘리스' })
  group: string;

  @ApiProperty({ example: '홈 커밍데이' })
  eventName: string;

  @ApiProperty({
    type: Date,
  })
  eventDate: Date;

  @ApiProperty({ example: 30 })
  participants: number;

  @ApiProperty({
    type: 'enum',
    description: 'location',
    default: Location.SEOUL,
    enum: Location,
  })
  location: Location;

  @ApiProperty({
    type: 'enum',
    description: 'zone',
    default: Zone.MEETING,
    enum: Zone,
  })
  zone: Zone[];

  @ApiProperty({ example: 'test' })
  documentAddress: string;

  @ApiProperty({
    type: boolean,
    example: false,
  })
  personalInfo: boolean;
}
