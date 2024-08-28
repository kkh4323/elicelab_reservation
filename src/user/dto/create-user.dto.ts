import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'kkh4323@naver.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'asdf123!' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: '김강호' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '01086134323' })
  @IsString()
  @IsNotEmpty()
  phone: string;
}
