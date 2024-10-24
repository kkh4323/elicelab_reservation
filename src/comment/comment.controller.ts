import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guardies/jwt-auth.guard';
import { RequestWithUserInterface } from '../auth/interfaces/requestWithUser.interface';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { Notice } from '../notice/entities/notice.entity';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async createComment(
    @Req() req: RequestWithUserInterface,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    return await this.commentService.createComment(req.user, createCommentDto);
  }

  @Get('/:noticeId')
  async getCommentsByNoticeId(@Param('noticeId') noticeId: string) {
    return await this.commentService.getCommentsByNoticeId(noticeId);
  }

  @Put('/:commentId')
  @UseGuards(JwtAuthGuard)
  async updateCommentById(
    @Req() req: RequestWithUserInterface,
    @Param('commentId') commentId: string,
  ) {
    return;
  }

  @Delete('/:commentId')
  @UseGuards(JwtAuthGuard)
  async deleteCommentById(
    @Req() req: RequestWithUserInterface,
    @Param('commentId') commentId: string,
  ) {
    return;
  }
}
