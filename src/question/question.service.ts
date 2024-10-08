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
import * as fs from 'fs';
import * as handlebars from 'handlebars';

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
    // 이메일 템플릿 파일 경로
    const templateFilePath = `${process.cwd()}/src/common/templates/question.html`;

    // 템플릿 파일 읽기
    const templateSource = fs.readFileSync(templateFilePath, 'utf8');

    // 템플릿 엔진 컴파일
    const template = handlebars.compile(templateSource);

    // 템플릿에 데이터 삽입
    const htmlToSend = template({
      group: createQuestionDto.group,
      eventName: createQuestionDto.eventName,
      eventDate: createQuestionDto.eventDate,
      participants: createQuestionDto.participants,
      location: createQuestionDto.location,
      zone: createQuestionDto.zone.join(', '),
      documentAddress: newDocument,
      personalInfo: createQuestionDto.personalInfo ? '동의함' : '동의하지 않음',
    });
    await this.emailService.sendMail({
      // from: 'kdp@elice.io',
      to: user.email,
      subject: `[외부 대관] 엘리스랩 ${createQuestionDto.group} ${createQuestionDto.eventName} 대관 신청`,
      html: htmlToSend,
    });
    return newQuestion;
  }
}
