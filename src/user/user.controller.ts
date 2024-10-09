import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RoleGuard } from '../auth/guardies/role.guard';
import { Role } from './entities/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserPageOptionsDto } from '../common/dtos/user-page-options.dto';
import { RequestWithUserInterface } from '../auth/interfaces/requestWithUser.interface';
import { JwtAuthGuard } from '../auth/guardies/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateAgreeOfTermDto } from '../agree-of-term/dto/create-agree-of-term.dto';

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

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateUserById(
    @Req() req: RequestWithUserInterface,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userService.updateUserById(req.user, updateUserDto);
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(RoleGuard(Role.ADMIN))
  async deleteUserById(@Param('id') id: string) {
    return await this.userService.deleteUserById(id);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteMyId(@Req() req: RequestWithUserInterface) {
    return await this.userService.deleteMyId(req.user);
  }

  // @Get('/:id')
  // @UseGuards(RoleGuard(Role.ADMIN))
  // async getUserById(@Param())
}
