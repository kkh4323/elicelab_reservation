import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SpaceService } from './space.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from '../auth/guardies/role.guard';
import { Role } from '../user/entities/role.enum';
import { Space } from './entities/space.entity';
import { SpacePageOptionsDto } from '../common/dtos/space-page-options.dto';

@Controller('space')
@ApiTags('space')
@UseGuards(RoleGuard(Role.ADMIN))
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Post('/create')
  async createSpace(@Body() createSpaceDto: CreateSpaceDto): Promise<Space> {
    return await this.spaceService.createSpace(createSpaceDto);
  }

  @Get()
  async getSpaces(@Query() pageOptionsDto: SpacePageOptionsDto) {
    return await this.spaceService.getSpaces(pageOptionsDto);
  }

  @Get('/:id')
  async getSpaceById(@Param('id') id: string): Promise<Space> {
    return await this.spaceService.getSpaceById(id);
  }

  @Put('/:id')
  async updateSpaceById(
    @Param('id') id: string,
    @Body() updateSpaceDto: CreateSpaceDto,
  ) {
    return await this.spaceService.updateSpaceById(id, updateSpaceDto);
  }

  @Delete('/:id')
  async deleteSpaceById(@Param('id') id: string) {
    return await this.spaceService.deleteSpaceById(id);
  }
}
