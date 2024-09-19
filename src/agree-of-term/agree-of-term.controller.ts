import { Body, Controller, Put, Req, UseGuards } from '@nestjs/common';
import { AgreeOfTermService } from './agree-of-term.service';
import { JwtAuthGuard } from '../auth/guardies/jwt-auth.guard';
import { RequestWithUserInterface } from '../auth/interfaces/requestWithUser.interface';
import { UpdateAgreeOfTermDto } from './dto/update-agree-of-term.dto';
import { CreateAgreeOfTermDto } from './dto/create-agree-of-term.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('agree-of-term')
@ApiTags('agree-of-term')
export class AgreeOfTermController {
  constructor(private readonly agreeOfTermService: AgreeOfTermService) {}

  @Put()
  @UseGuards(JwtAuthGuard)
  async updateAgreeOfTerm(
    @Req() req: RequestWithUserInterface,
    @Body() updateAgreeOfTermDto: CreateAgreeOfTermDto,
  ) {
    return await this.agreeOfTermService.updateAgreeOfTerm(
      req.user,
      updateAgreeOfTermDto,
    );
  }
}
