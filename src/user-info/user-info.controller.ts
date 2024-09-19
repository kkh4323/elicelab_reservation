import { Controller } from '@nestjs/common';
import { UserInfoService } from './user-info.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('user-info')
@ApiTags('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}
}
