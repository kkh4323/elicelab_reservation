import { Body, Controller, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AgreeOfTermService } from './agree-of-term.service';
import { JwtAuthGuard } from '../auth/guardies/jwt-auth.guard';
import { RequestWithUserInterface } from '../auth/interfaces/requestWithUser.interface';
import { CreateAgreeOfTermDto } from './dto/create-agree-of-term.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('agree-of-term')
@ApiTags('agree-of-term')
export class AgreeOfTermController {
  constructor(private readonly agreeOfTermService: AgreeOfTermService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createAgreeOfTerm(
    @Req() req: RequestWithUserInterface,
    @Body() createAgreeOfTermDto: CreateAgreeOfTermDto,
  ) {
    return this.agreeOfTermService.createAgreeOfTerm(
      req.user,
      createAgreeOfTermDto,
    );
  }

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
