import {
  HttpException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeatEntity } from 'src/cinema/entities/seat.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindSeatByIdProvider {
  constructor(
    @InjectRepository(SeatEntity)
    private readonly seatRepository: Repository<SeatEntity>,
  ) {}

  public async findById(id: number): Promise<SeatEntity> {
    try {
      const seat = await this.seatRepository.findOne({
        where: {
          id,
        },
        relations: {
          hall: true,
        },
      });

      if (!seat) throw new NotFoundException('seat not found');

      return seat;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to find seat');
    }
  }
}
