import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RoleGuard } from '../auth/guardies/role.guard';
import { Role } from './entities/role.enum';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(RoleGuard(Role.ADMIN))
  async getUsers() {
    return await this.userService.getUsers();
  }
}
