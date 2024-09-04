import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/entities/user.entity';
import { LocalAuthGuard } from './guardies/local-auth.guard';
import { RequestWithUserInterface } from './interfaces/requestWithUser.interface';
import { JwtAuthGuard } from './guardies/jwt-auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from '../user/dto/login-user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //회원가입
  @Post('/signup')
  async registerUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.authService.signinUser(createUserDto);
  }

  //로그인
  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginUserDto })
  async loggedInUser(@Req() req: RequestWithUserInterface): Promise<object> {
    const { user } = req;
    const accessToken = await this.authService.generateAccessToken(user.id);
    const refreshToken = await this.authService.generateRefreshToken(user.id);

    return { user, accessToken, refreshToken };
  }

  //유저 정보 가져오기
  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserInfoByToken(
    @Req() req: RequestWithUserInterface,
  ): Promise<User> {
    return req.user;
  }
}
