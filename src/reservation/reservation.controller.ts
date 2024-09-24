import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guardies/jwt-auth.guard';
import { RequestWithUserInterface } from '../auth/interfaces/requestWithUser.interface';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { SpacePageOptionsDto } from '../common/dtos/space-page-options.dto';
import { RoleGuard } from '../auth/guardies/role.guard';
import { Role } from '../user/entities/role.enum';

@Controller('reservation')
@ApiBearerAuth()
@ApiTags('reservation')
@UseGuards(JwtAuthGuard)
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // 공간 예약 api
  @Post()
  @UseGuards(RoleGuard(Role.STUDENT))
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
  async getReservations(@Query() pageOptionsDto: SpacePageOptionsDto) {
    return null;
  }

  // 공간 예약 상세 정보 가져오는 api
  @Get('/:id')
  async getReservationById(@Param('id') id: string) {
    return await this.reservationService.getReservationById(id);
  }

  // 공간 예약 변경하는 api
  @Put('/:id')
  async updateReservationById(
    @Param('id') id: string,
    @Body() updateReservationDto: CreateReservationDto,
  ) {
    return await this.reservationService.updateReservationById(
      id,
      updateReservationDto,
    );
  }

  // 공간 예약 삭제하는 api
  @Delete('/:id')
  async deleteReservationById(@Param('id') id: string) {
    return await this.reservationService.deleteReservationById(id);
  }
}
