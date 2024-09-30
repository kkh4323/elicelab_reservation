import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { BufferedFile } from '../minio-client/file.model';
import { MinioClientService } from '../minio-client/minio-client.service';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    private readonly minioClientService: MinioClientService,
  ) {}

  // [관리자, 사용자] 대관 문의하는 로직
  async createQuestion(
    user: User,
    document?: BufferedFile,
    createQuestionDto?: CreateQuestionDto,
  ) {
    const newDocument = await this.minioClientService.uploadDocument(
      user,
      document,
      'document',
    );
    const newQuestion = await this.questionRepository.create({
      ...createQuestionDto,
      documentAddress: newDocument,
      user,
    });
    await this.questionRepository.save(newQuestion);
    return newQuestion;
  }
}
