import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
  ) {}

  // 예약 등록하는 로직
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
}
