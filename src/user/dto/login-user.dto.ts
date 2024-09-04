import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'kkh4323@naver.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'asdf123!' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
