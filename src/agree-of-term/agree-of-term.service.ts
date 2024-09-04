import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AgreeOfTerm } from './entities/agree-of-term.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateAgreeOfTermDto } from './dto/create-agree-of-term.dto';

@Injectable()
export class AgreeOfTermService {
  constructor(
    @InjectRepository(AgreeOfTerm)
    private agreeOfTermRepository: Repository<AgreeOfTerm>,
    private readonly userService: UserService,
  ) {}

  async updateAgreeOfTerm(
    user: User,
    updateAgreeOfTermDto: CreateAgreeOfTermDto,
  ) {
    const existedUser = await this.userService.getUserByEmail(user.email);
    return await this.agreeOfTermRepository.update(
      { id: existedUser.agreeOfTerm.id },
      updateAgreeOfTermDto,
    );
  }
}
