import { Injectable } from '@nestjs/common';
import { CreateSeatDto } from './dto/createSeat.dto';
import { SeatEntity } from './entities/seat.entity';
import { CreateSeatsProvider } from './providers/seat.providers/createSeat.provider';
import { FindSeatByIdProvider } from './providers/seat.providers/findSeatByid.provider';
import { GetSeatsByHallProvider } from './providers/seat.providers/getSeatByHull.provider';

@Injectable()
export class SeatService {
  constructor(
    private readonly createSeat: CreateSeatsProvider,
    private readonly findSeatById: FindSeatByIdProvider,
    private readonly getSeatByHall: GetSeatsByHallProvider,
  ) {}

  public async create(dto: CreateSeatDto, hallId: number): Promise<SeatEntity> {
    return this.createSeat.create(dto, hallId);
  }

  public async getSeat(hallId: number): Promise<SeatEntity[]> {
    return this.getSeatByHall.getByHall(hallId);
  }

  public async findById(id: number): Promise<SeatEntity> {
    return this.findSeatById.findById(id);
  }
}
