import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginUserDto } from '../user/dto/login-user.dto';
import * as bcrypt from 'bcryptjs';
import { TokenPayloadInterface } from './interfaces/tokenPayload.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../user/entities/user.entity';
import { EmailService } from '../email/email.service';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import { VerifyEmailDto } from '../user/dto/verify-email.dto';
import { EmailUserDto } from '../user/dto/email-user.dto';
import { Provider } from '../user/entities/provider.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // 회원가입 로직
  async signinUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const createdUser = await this.userService.createUser({
        ...createUserDto,
        provider: Provider.LOCAL,
      });

      await this.emailService.sendMail({
        to: createUserDto.email,
        subject: '엘리스Lab 회원가입',
        text: `엘리스Lab 회원 가입이 완료되었습니다. ID는 ${createUserDto.email}입니다.`,
      });
      return createdUser;
    } catch (err) {
      if (err?.code === '23505') {
        throw new HttpException(
          'user with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // 로그인 로직
  async loginUser(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.userService.getUserByEmail(loginUserDto.email);
    const isPasswordMatched = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordMatched) {
      throw new HttpException(
        'password do not matched',
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  // 이메일 전송하는 로직
  async sendEmail(emailUserDto: EmailUserDto) {
    const generateNumber = this.generateOTP();

    // 번호 저장
    await this.cacheManager.set(emailUserDto.email, generateNumber);
    await this.emailService.sendMail({
      to: emailUserDto.email,
      subject: '엘리스Lab - 이메일 인증,',
      text: `엘리스Lab 가입 인증 메일입니다. ${generateNumber}를 입력해주세요.`,
    });
  }

  // 이메일 인증하는 로직
  async verifyEmail(verifyEmailDto: VerifyEmailDto) {
    const emailCodeByRedis = await this.cacheManager.get(verifyEmailDto.email);
    if (emailCodeByRedis !== verifyEmailDto.code) {
      throw new BadRequestException('Code is wrong');
    }
    await this.cacheManager.del(verifyEmailDto.email);
    return true;
  }

  // accessToken 생성하는 함수
  public generateAccessToken(userId: string): {
    accessToken: string;
    accessCookie: string;
  } {
    const payload: TokenPayloadInterface = { userId };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('ACCESS_TOKEN_SECURITY'),
      expiresIn: this.configService.get('ACCESS_TOKEN_EXPIRATION_TIME'),
    });
    const accessCookie = `Authentication=${accessToken}; Path=/; Max-Age=${this.configService.get('ACCESS_TOKEN_EXPIRATION_TIME')}`;
    return { accessToken, accessCookie };
  }

  // refreshToken 생성하는 함수
  public generateRefreshToken(userId: string): {
    refreshToken: string;
    refreshCookie: string;
  } {
    const payload: TokenPayloadInterface = { userId };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('REFRESH_TOKEN_SECURITY'),
      expiresIn: this.configService.get('REFRESH_TOKEN_EXPIRATION_TIME'),
    });
    const refreshCookie = `Refresh=${refreshToken}; Path=/; Max-Age=${this.configService.get('REFRESH_TOKEN_EXPIRATION_TIME')}`;
    return { refreshToken, refreshCookie };
  }

  // 6자리 OTP 생성하는 함수
  generateOTP() {
    let OTP = '';
    for (let i = 1; i <= 6; i++) {
      OTP += Math.floor(Math.random() * 10);
    }
    return OTP;
  }

  async setCurrentRefreshTokenToRedis(refreshToken: string, userId: string) {
    const saltValue = await bcrypt.genSalt(10);
    const currentHashedRefreshToken = await bcrypt.hash(
      refreshToken,
      saltValue,
    );
    await this.cacheManager.set(userId, currentHashedRefreshToken);
  }
}
