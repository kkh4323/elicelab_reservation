import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { SpacePageOptionsDto } from '../common/dtos/space-page-options.dto';
import { PageMetaDto } from '../common/dtos/page-meta.dto';
import { PageDto } from '../common/dtos/page.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  // [관리자, 사용자] 예약 등록하는 로직
  async createReservation(
    user: User,
    createReservationDto: CreateReservationDto,
  ) {
    const newReservation = await this.reservationRepository.create({
      ...createReservationDto,
      user,
    });
    await this.reservationRepository.save(newReservation);
    return newReservation;
  }

  // [관리자, 사용자] 예약 조회하는 로직
  async getReservations(pageOptionsDto: SpacePageOptionsDto) {
    const queryBuilder =
      this.reservationRepository.createQueryBuilder('reservation');
    queryBuilder
      .orderBy('reservation.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }

  // [관리자, 사용자] id로 예약 데이터 하나 불러오는 로직
  async getReservationById(id: string) {
    const reservation = await this.reservationRepository.findOneBy({ id });
    if (!reservation) throw new NotFoundException();
    return reservation;
  }

  // [관리자, 사용자] 예약 데이터 수정하는 로직
  async updateReservationById(
    id: string,
    updateReservationDto: CreateReservationDto,
  ) {
    const reservation = await this.reservationRepository.update(
      id,
      updateReservationDto,
    );
    if (reservation.affected) return 'updated';
  }

  // [관리자, 사용자] 예약 데이터 삭제하는 로직
  async deleteReservationById(id: string) {
    const result = await this.reservationRepository.delete({ id });
    if (result.affected) return `${id} is deleted successfully.`;
  }
}
