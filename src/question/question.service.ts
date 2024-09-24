import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  // [관리자, 사용자] 대관 문의하는 로직
  async createQuestion(user: User, createQuestionDto: CreateQuestionDto) {
    const newQuestion = await this.questionRepository.create({
      ...createQuestionDto,
      user,
    });
    await this.questionRepository.save(newQuestion);
    return newQuestion;
  }
}
