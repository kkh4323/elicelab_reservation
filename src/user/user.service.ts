import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PageDto } from '../common/dtos/page.dto';
import { PageMetaDto } from '../common/dtos/page-meta.dto';
import { UserPageOptionsDto } from '../common/dtos/user-page-options.dto';
import { CACHE_MANAGER } from '@nestjs/common/cache';
import { Cache } from 'cache-manager';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  //전체 유저 가져오는 로직
  async getUsers(pageOptionsDto: UserPageOptionsDto): Promise<PageDto<User>> {
    // const users = await this.userRepository.find();
    // return users;
    const queryBuilder = this.userRepository.createQueryBuilder('user');
    if (pageOptionsDto.username) {
      queryBuilder.andWhere('user.username = :username', {
        username: pageOptionsDto.username,
      });
    }
    queryBuilder
      .leftJoinAndSelect('user.agreeOfTerm', 'agreeOfTerm')
      .orderBy('user.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }

  //유저 생성하는 로직
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  //이메일로 검색하는 로직
  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ email });
    if (user) return user;
    throw new HttpException('user is not exists', HttpStatus.NOT_FOUND);
  }

  //아이디로 검색하는 로직
  async getUserById(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (user) return user;
    throw new HttpException('user is not exists', HttpStatus.NOT_FOUND);
  }

  // RefreshToken 매칭
  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.getUserById(userId);
    const getUserIdFromRedis: string = await this.cacheManager.get(userId);
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      getUserIdFromRedis,
    );
    if (isRefreshTokenMatching) {
      return user;
    }
  }
}
