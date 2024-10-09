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
import { NoticeService } from './notice.service';
import { RoleGuard } from '../auth/guardies/role.guard';
import { Role } from '../user/entities/role.enum';
import { RequestWithUserInterface } from '../auth/interfaces/requestWithUser.interface';
import { CreateNoticeDto } from './dto/create-notice.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notice')
@Controller('notice')
export class NoticeController {
  constructor(private readonly noticeService: NoticeService) {}

  @Post('/create')
  @UseGuards(RoleGuard(Role.ADMIN))
  async createNotice(
    @Req() req: RequestWithUserInterface,
    @Body() createNoticeDto: CreateNoticeDto,
  ) {
    return await this.noticeService.createNotice(req.user, createNoticeDto);
  }

  @Get()
  async getNotices() {
    return await this.noticeService.getNotices();
  }

  @Get('/:id')
  async getNoticeById(@Param('id') id: string) {
    return await this.noticeService.getNoticeByID(id);
  }

  @Put('/:id')
  async updateNoticeById(
    @Param('id') id: string,
    @Body() updateNoticeDto: CreateNoticeDto,
  ) {
    return await this.noticeService.updateNoticeById(id, updateNoticeDto);
  }

  @Delete('/:id')
  @UseGuards(RoleGuard(Role.ADMIN))
  async deleteNoticeById(@Param('id') id: string) {
    return await this.noticeService.deleteNoticeById(id);
  }
}
