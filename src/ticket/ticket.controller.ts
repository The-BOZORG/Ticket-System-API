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
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { TicketService } from './ticket.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateDto } from './dto/create.dto';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { UserEntity, UserRole } from 'src/users/entities/user.entity';
import { Paginate } from 'nestjs-paginate';
import type { PaginateQuery } from 'nestjs-paginate';
import { Roles } from 'src/common/decorators/role.decorator';
import { RolesGuard } from 'src/common/guards/role.guard';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Tickets')
@ApiBearerAuth('access-token')
@Controller('ticket')
@UseGuards(JwtAuthGuard)
@Throttle({
  default: {
    limit: 30,
    ttl: 60000,
  },
})
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a support ticket' })
  public createTicket(@Body() dto: CreateDto, @CurrentUser() user: UserEntity) {
    return this.ticketService.create(dto, user.id);
  }

  @Get('all')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all tickets (Admin only)',
    description: 'Returns paginated tickets. Admin role required.',
  })
  public getAllTickets(@Paginate() query: PaginateQuery) {
    return this.ticketService.getAll(query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get own ticket by ID' })
  @ApiParam({ name: 'id', description: 'Ticket ID', example: 1 })
  public async myTicket(
    @Param('id') ticketId: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.ticketService.getMyTicket(ticketId, user.id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete own ticket' })
  @ApiParam({ name: 'id', description: 'Ticket ID', example: 1 })
  public async deleteTicket(
    @Param('id') ticketId: number,
    @CurrentUser() user: UserEntity,
  ) {
    return this.ticketService.delete(ticketId, user.id);
  }
}
