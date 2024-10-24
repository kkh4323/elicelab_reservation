import { User } from '../../user/entities/user.entity';
import { Notice } from '../../notice/entities/notice.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: '좋습니다.' })
  description: string;
  @ApiProperty({ example: 'f897c1f8-d063-4da8-b539-3b36a8bc9d72' })
  notice: Notice;
}
