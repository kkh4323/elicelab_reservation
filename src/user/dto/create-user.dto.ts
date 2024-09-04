import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'kkh4323@naver.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'asdf123!' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/)
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
