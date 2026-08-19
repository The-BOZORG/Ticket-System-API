import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateDto } from './dto/create.dto';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { UserEntity, UserRole } from 'src/users/entities/user.entity';
import { Paginate } from 'nestjs-paginate';
import type { PaginateQuery } from 'nestjs-paginate';
import { Roles } from 'src/common/decorators/role.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  public createTicket(@Body() dto: CreateDto, @CurrentUser() user: UserEntity) {
    return this.ticketService.create(dto, user.id);
  }

  @Get('all')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  public getAllTickets(@Paginate() query: PaginateQuery) {
    return this.ticketService.getAll(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async myTicket(
    @Param('id') ticketId: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.ticketService.getMyTicket(ticketId, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  public async deleteTicket(
    @Param('id') ticketId: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.ticketService.delete(ticketId, user.id);
  }
}
