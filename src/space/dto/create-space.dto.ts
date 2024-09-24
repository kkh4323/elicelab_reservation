import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
import { Location } from '../entities/location.enum';
import { Zone } from '../entities/zone.enum';

export class CreateSpaceDto {
  @ApiProperty({ example: '미팅룸 A' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'location',
    default: Location.SEOUL,
    enum: Location,
  })
  @IsString()
  location: Location;

  @ApiProperty({ example: 1 })
  @IsNumber()
  maxPeople?: number;

  @ApiProperty({
    description: 'zone',
    default: Zone.MEETING,
    enum: Zone,
  })
  @IsString()
  zone: Zone;

  @ApiProperty({ example: '공공장소이니 깨끗이 사용해주세요.' })
  @IsString()
  description: string;

  @ApiProperty()
  @IsArray()
  spaceImg: string[];
}
