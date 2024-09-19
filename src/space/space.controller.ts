import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { SpaceService } from './space.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../auth/guardies/role.guard';
import { Role } from '../user/entities/role.enum';

@Controller('space')
@ApiTags('space')
@UseGuards(RoleGuard(Role.ADMIN))
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Post('/create')
  async createSpace(@Body() createSpaceDto: CreateSpaceDto) {
    return await this.spaceService.createSpace(createSpaceDto);
  }

  @Get()
  async getSpaces() {
    return await this.spaceService.getSpaces();
  }

  @Get('/:id')
  async getSpaceById(@Param('id') id: string) {
    return await this.spaceService.getSpaceById(id);
  }
}
