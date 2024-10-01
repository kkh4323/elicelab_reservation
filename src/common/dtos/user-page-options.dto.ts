import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Order } from '../constants/order.constant';

export class UserPageOptionsDto {
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

  @ApiPropertyOptional({ default: '' })
  @Type(() => String)
  @IsString()
  @IsOptional()
  readonly username?: string = '';

  @ApiPropertyOptional({ default: '' })
  @Type(() => String)
  @IsString()
  @IsOptional()
  readonly email?: string = '';

  @ApiPropertyOptional({ default: '' })
  @Type(() => String)
  @IsString()
  @IsOptional()
  readonly phone?: string = '';

  @ApiPropertyOptional({ default: [] })
  @IsArray()
  @Type(() => String)
  @IsOptional()
  readonly roles?: string[] = [];

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
