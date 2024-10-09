import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from './entities/notice.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private noticeRepository: Repository<Notice>,
  ) {}

  // [관리자] 공지사항 생성하는 로직
  async createNotice(user: User, createNoticeDto: CreateNoticeDto) {
    const newNotice = await this.noticeRepository.create({
      ...createNoticeDto,
      user,
    });
    await this.noticeRepository.save(newNotice);
    return newNotice;
  }

  // [사용자] 공지사항 데이터 전체 가져오는 로직
  async getNotices() {
    return await this.noticeRepository.find({});
  }

  // [사용자] 상세 공지사항 데이터 가져오는 로직
  async getNoticeByID(id: string) {
    const notice = await this.noticeRepository.findOneBy({ id });
    if (!notice)
      throw new HttpException(
        'there is not exist notice.',
        HttpStatus.NOT_FOUND,
      );
    return notice;
  }

  // [관리자] 공지사항 데이터 수정하는 로직
  async updateNoticeById(id: string, updateNoticeDto: CreateNoticeDto) {
    const notice = await this.noticeRepository.update(id, updateNoticeDto);
    if (notice.affected) return 'updated';
  }

  // [관리자] 공지사항 데이터 삭제하는 로직
  async deleteNoticeById(id: string) {
    const result = await this.noticeRepository.delete({ id });
    if (result.affected) return `${id} is deleted successfully`;
  }
}
