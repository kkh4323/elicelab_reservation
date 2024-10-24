import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Notice } from '../notice/entities/notice.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async createComment(
    user: User,
    createCommentDto: CreateCommentDto,
  ): Promise<Comment> {
    const newComment = await this.commentRepository.create({
      ...createCommentDto,
      user,
    });
    await this.commentRepository.save(newComment);
    return newComment;
  }

  async getCommentsByNoticeId(noticeId: string) {
    return await this.commentRepository.find({
      where: { notice: { id: noticeId } },
      relations: ['notice'],
    });
  }
}
