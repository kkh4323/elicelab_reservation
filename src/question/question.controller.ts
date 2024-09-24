import {
  Controller,
  Get,
  Post,
  Delete,
  UseGuards,
  Req,
  Body,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guardies/jwt-auth.guard';
import { RequestWithUserInterface } from '../auth/interfaces/requestWithUser.interface';
import { CreateReservationDto } from '../reservation/dto/create-reservation.dto';
import { CreateQuestionDto } from './dto/create-question.dto';

@Controller('question')
@ApiBearerAuth()
@ApiTags('question')
@UseGuards(JwtAuthGuard)
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  // 대관 문의 신청 api
  @Post()
  async createQuestion(
    @Req() req: RequestWithUserInterface,
    @Body() createQuestionDto: CreateQuestionDto,
  ) {
    return await this.questionService.createQuestion(
      req.user,
      createQuestionDto,
    );
  }

  //
}
