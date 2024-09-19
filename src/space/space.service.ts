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

  // [관리자] id로 공간 데이터 하나 불러오는 로직
  async getSpaceById(id: string) {
    const space = await this.spaceRepository.findOneBy({ id });
    if (!space) throw new NotFoundException();
    return space;
  }

  // [관리자] 공간 데이터 수정하는 로직
  async updateSpaceById(id: string, updateSpaceDto: CreateSpaceDto) {
    const space = await this.spaceRepository.update(id, updateSpaceDto);
    if (space.affected) return 'updated';
  }

  // [관리자] 공간 데이터 삭제하는 로직
  async deleteSpaceById(id: string) {
    const result = await this.spaceRepository.delete({ id });
    if (result.affected) return `${id} is deleted successfully`;
  }
}
