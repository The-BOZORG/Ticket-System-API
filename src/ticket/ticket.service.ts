import { Injectable } from '@nestjs/common';
import { CreateTicketProvider } from './providers/createTicket.provider';
import { GetAllTicketsPagination } from './providers/getAllTickets.provider';
import { GetTicketProvider } from './providers/getTicketById';
import { DeleteTicketProvider } from './providers/deleteTicket';
import { CreateDto } from './dto/create.dto';
import { TicketEntity } from './entities/ticket.entity';
import { Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class TicketService {
  constructor(
    private readonly createTicket: CreateTicketProvider,
    private readonly getAllTicket: GetAllTicketsPagination,
    private readonly getTicket: GetTicketProvider,
    private readonly deleteTicket: DeleteTicketProvider,
  ) {}

  public create(dto: CreateDto, userId: string): Promise<TicketEntity> {
    return this.createTicket.create(dto, userId);
  }

  public getAll(query: PaginateQuery): Promise<Paginated<TicketEntity>> {
    return this.getAllTicket.getAllTicketsPagination(query);
  }

  public getMyTicket(ticketId: number, userId: string): Promise<TicketEntity> {
    return this.getTicket.getTicket(ticketId, userId);
  }

  public delete(ticketId: number, userId: string): Promise<void> {
    return this.deleteTicket.deleteTicket(ticketId, userId);
  }
}
