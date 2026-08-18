import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketEntity } from '../entities/ticket.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '../dto/pagination.dto';

@Injectable()
export class GetAllTicketsProvider {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  public async getAllTickets(
    userId: string,
    dto: PaginationDto,
  ): Promise<{
    data: TicketEntity[];
    count: number;
  }> {
    const { limit = 10, offset = 0 } = dto;

    const [tickets, total] = await this.ticketRepository.findAndCount({
      where: {
        user: {
          id: userId,
        },
      },
      take: limit,
      skip: offset,
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      data: tickets,
      count: total,
    };
  }
}
