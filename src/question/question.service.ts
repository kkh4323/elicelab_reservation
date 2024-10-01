import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateQuestionDto } from './dto/create-question.dto';
import { BufferedFile } from '../minio-client/file.model';
import { MinioClientService } from '../minio-client/minio-client.service';
import { EmailService } from '../email/email.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    private readonly minioClientService: MinioClientService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
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
    // 일반 유저에게 보내는 메일
    await this.emailService.sendMail({
      // from: 'kdp@elice.io',
      to: user.email,
      subject: `[외부 대관] 엘리스랩 ${createQuestionDto.group} ${createQuestionDto.eventName} 대관 신청`,
      html: `<h1>${createQuestionDto.group} ${createQuestionDto.eventName} 대관 신청</h1>`,
    });
    return newQuestion;
  }
}
