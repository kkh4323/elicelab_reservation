import {
  Controller,
  Get,
  Post,
  Delete,
  UseGuards,
  Req,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guardies/jwt-auth.guard';
import { RequestWithUserInterface } from '../auth/interfaces/requestWithUser.interface';
import { CreateQuestionDto } from './dto/create-question.dto';
import { BufferedFile } from '../minio-client/file.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { Location } from '../space/entities/location.enum';
import { Zone } from '../space/entities/zone.enum';

@Controller('question')
@ApiBearerAuth()
@ApiTags('question')
@UseGuards(JwtAuthGuard)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  // 대관 문의 신청 api
  @Post()
  @UseInterceptors(FileInterceptor('documentAddress'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateQuestionDto })
  @ApiBody({
    description: 'pdf',
    schema: {
      type: 'object',
      properties: {
        documentAddress: {
          type: 'string',
          format: 'binary',
          description: 'Question document file',
        },
        group: {
          type: 'string',
          description: 'group',
        },
        eventName: {
          type: 'string',
          description: 'eventName',
        },
        eventDate: {
          type: 'Date',
          description: 'eventDate',
        },
        participants: {
          type: 'number',
          description: 'participants',
        },
        location: {
          type: 'string',
          description: 'location',
        },
        zone: {
          type: 'string',
          description: 'zone',
        },
        personalInfo: {
          type: 'boolean',
          default: false,
        },
      },
    },
  })
  async createQuestion(
    @Req() req: RequestWithUserInterface,
    @UploadedFile() document?: BufferedFile,
    @Body() createQuestionDto?: CreateQuestionDto,
  ) {
    return await this.questionService.createQuestion(
      req.user,
      document,
      createQuestionDto,
    );
  }

  //
}
