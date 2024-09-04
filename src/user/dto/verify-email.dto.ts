import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyEmailDto {
  @ApiProperty({ example: 'kkh4323@naver.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '000000' })
  @IsString()
  code: string;
}
