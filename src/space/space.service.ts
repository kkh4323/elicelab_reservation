import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Space } from './entities/space.entity';
import { Repository } from 'typeorm';
import { CreateSpaceDto } from './dto/create-space.dto';

@Injectable()
export class SpaceService {
  constructor(
    @InjectRepository(Space)
    private spaceRepository: Repository<Space>,
  ) {}

  // [관리자] 공간 생성하는 로직
  async createSpace(createSpaceDto: CreateSpaceDto) {
    const newSpace = await this.spaceRepository.create(createSpaceDto);
    await this.spaceRepository.save(newSpace);
    return newSpace;
  }

  // [관리자] 공간 전체 가져오는 로직
  async getSpaces() {
    return await this.spaceRepository.find({});
  }

  async getSpaceById(id: string) {
    const space = await this.spaceRepository.findOneBy({ id });
    if (!space) throw new NotFoundException();
    return space;
  }
}
