import { ApiProperty } from '@nestjs/swagger';

export class CreateNoticeDto {
  @ApiProperty({ example: '공지사항' })
  title: string;

  @ApiProperty({ example: '공지사항입니다.' })
  description: string;

  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
    },
    description: 'hashtags',
    example: ['공지사항', '원데이'],
  })
  tags: string[];
}
