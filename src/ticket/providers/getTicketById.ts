import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketEntity } from '../entities/ticket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GetTicketByIdProvider {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,
  ) {}

  public async findById(id: number): Promise<TicketEntity> {
    try {
      const ticket = await this.ticketRepository.findOne({
        where: { id },
        relations: {
          user: true,
        },
      });

      if (!ticket) {
        throw new NotFoundException('ticket not found');
      }

      return ticket;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to find ticket');
    }
  }
}
