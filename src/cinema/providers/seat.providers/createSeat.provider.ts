import {
  HttpException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeatEntity } from 'src/cinema/entities/seat.entity';
import { Repository } from 'typeorm';
import { FindHallByIdProvider } from '../hall.providers/findHallById';
import { CreateSeatDto } from 'src/cinema/dto/createSeat.dto';

@Injectable()
export class CreateSeatsProvider {
  constructor(
    @InjectRepository(SeatEntity)
    private readonly seatRepository: Repository<SeatEntity>,

    private readonly findHallById: FindHallByIdProvider,
  ) {}

  public async create(dto: CreateSeatDto, hallId: number): Promise<SeatEntity> {
    const { row, number } = dto;

    try {
      const hall = await this.findHallById.findById(hallId);

      const seat = this.seatRepository.create({
        row,
        number,
        hall,
      });

      return await this.seatRepository.save(seat);
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to create seat');
    }
  }
}
