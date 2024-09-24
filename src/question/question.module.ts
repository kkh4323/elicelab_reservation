import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { MinioClientModule } from '../minio-client/minio-client.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), MinioClientModule],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
