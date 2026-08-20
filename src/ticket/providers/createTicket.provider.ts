import {
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TicketEntity } from '../entities/ticket.entity';
import { Repository } from 'typeorm';
import { CreateDto } from '../dto/create.dto';
import { FindUserById } from 'src/users/providers/findUserById.provider';
import { nanoid } from 'nanoid';

@Injectable()
export class CreateTicketProvider {
  constructor(
    @InjectRepository(TicketEntity)
    private readonly ticketRepository: Repository<TicketEntity>,

    private readonly findById: FindUserById,
  ) {}

  public async create(dto: CreateDto, userId: string): Promise<TicketEntity> {
    const { title, description } = dto;

    try {
      const user = await this.findById.findById(userId);

      const ticket = this.ticketRepository.create({
        ticketNumber: `TCK-${nanoid(8)}`,
        title,
        description,
        user,
      });

      return await this.ticketRepository.save(ticket);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new RequestTimeoutException('database request failed');
    }
  }
}
