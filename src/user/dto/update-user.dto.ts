import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { Provider } from '../entities/provider.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ example: 'kkh4323@naver.com' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'asdf123!' })
  @IsString()
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/)
  password?: string;

  @ApiProperty({ example: '김강호' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '01086134323' })
  @IsString()
  phone?: string;

  @ApiProperty({
    description: 'provider',
    default: Provider.LOCAL,
    enum: Provider,
  })
  @IsString()
  provider?: Provider;
}
