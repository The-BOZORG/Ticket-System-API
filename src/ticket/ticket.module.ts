import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketEntity } from './entities/ticket.entity';
import { UsersModule } from 'src/users/users.module';
import { CreateTicketProvider } from './providers/createTicket.provider';
import { DeleteTicketProvider } from './providers/deleteTicket';
import { GetAllTicketsPagination } from './providers/getAllTickets.provider';
import { GetTicketProvider } from './providers/getTicketById';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([TicketEntity])],
  controllers: [TicketController],
  providers: [
    TicketService,
    CreateTicketProvider,
    DeleteTicketProvider,
    GetAllTicketsPagination,
    GetTicketProvider,
  ],
})
export class TicketModule {}
