import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Order } from '../constants/order.constant';
import { Location } from '../../space/entities/location.enum';
import { Zone } from '../../space/entities/zone.enum';

export class SpacePageOptionsDto {
  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  @ApiPropertyOptional({
    enum: Location,
    default: Location.SEOUL,
  })
  @IsEnum(Location)
  @IsOptional()
  readonly location?: Location;

  @ApiPropertyOptional({
    enum: Zone,
    default: Zone.MEETING,
  })
  @IsEnum(Zone)
  @IsOptional()
  readonly zone?: Zone;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
