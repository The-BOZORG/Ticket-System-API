import { Paginated, PaginateQuery, paginate } from 'nestjs-paginate';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TicketEntity } from '../entities/ticket.entity';

@Injectable()
export class GetAllTicketsPagination {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  public async getAllTicketsPagination(
    query: PaginateQuery,
  ): Promise<Paginated<TicketEntity>> {
    return paginate(query, this.ticketRepository, {
      select: ['id', 'ticketNumber', 'title', 'createdAt'],
      sortableColumns: ['id', 'createdAt'],
      searchableColumns: ['ticketNumber', 'title', 'description'],
      defaultSortBy: [['createdAt', 'DESC']],
    });
  }
}
