import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guardies/jwt-auth.guard';
import { RequestWithUserInterface } from '../auth/interfaces/requestWithUser.interface';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { PageOptionsDto } from '../common/dtos/page-options.dto';

@Controller('reservation')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // 공간 예약 api
  @Post()
  async createReservation(
    @Req() req: RequestWithUserInterface,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    return await this.reservationService.createReservation(
      req.user,
      createReservationDto,
    );
  }

  // 전체 공간 예약 정보 가져오는 api
  @Get()
  async getReservations(@Query() pageOptionsDto: PageOptionsDto) {
    return null;
  }

  // 공간 예약 상세 정보 가져오는 api
  @Get('/:id')
  async getReservationById(@Param('id') id: string) {
    return null;
  }
}
