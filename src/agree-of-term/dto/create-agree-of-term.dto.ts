import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class CreateAgreeOfTermDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  overTwenty: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  useTerm: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  personalInfo: boolean;

  @ApiProperty({ example: true })
  @IsBoolean()
  marketingAgree: boolean;
}
