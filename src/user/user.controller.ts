import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RoleGuard } from '../auth/guardies/role.guard';
import { Role } from './entities/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SpacePageOptionsDto } from '../common/dtos/space-page-options.dto';
import { UserPageOptionsDto } from '../common/dtos/user-page-options.dto';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(RoleGuard(Role.ADMIN))
  async getUsers(@Query() pageOptionsDto: UserPageOptionsDto) {
    return await this.userService.getUsers(pageOptionsDto);
  }
}
