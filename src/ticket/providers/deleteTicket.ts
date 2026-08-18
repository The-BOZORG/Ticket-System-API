import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TicketEntity } from '../entities/ticket.entity';

@Injectable()
export class DeleteTicketProvider {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  public async deleteTicket(ticketId: number, userId: string): Promise<void> {
    try {
      const ticket = await this.ticketRepository.findOne({
        where: {
          id: ticketId,
          user: {
            id: userId,
          },
        },
      });

      if (!ticket) {
        throw new NotFoundException('ticket not found');
      }

      await this.ticketRepository.remove(ticket);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new RequestTimeoutException('database request failed');
    }
  }
}
