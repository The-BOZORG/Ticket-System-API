import { Injectable } from '@nestjs/common';
import { CreateShowtimeProvider } from './providers/createShowtime.provider';
import { FindShowtimeByIdProvider } from './providers/findShowtimeById.provider';
import { UpdateShowtimeProvider } from './providers/updateShowtime.provider';
import { DeleteShowtimeProvider } from './providers/deleteShowTime.provider';
import { CreateShowtimeDto } from './dto/createShowtime.dto';
import { ShowtimeEntity } from './entities/showtime.entity';
import { UpdateShowtimeDto } from './dto/update-showtime.dto';

@Injectable()
export class ShowtimeService {
  constructor(
    private readonly createShowtimeProvider: CreateShowtimeProvider,
    private readonly findShowtimeByIdProvider: FindShowtimeByIdProvider,
    private readonly updateShowtimeProvider: UpdateShowtimeProvider,
    private readonly deleteShowtimeProvider: DeleteShowtimeProvider,
  ) {}

  public async create(dto: CreateShowtimeDto): Promise<ShowtimeEntity> {
    return this.createShowtimeProvider.create(dto);
  }

  public async findById(id: number): Promise<ShowtimeEntity> {
    return this.findShowtimeByIdProvider.findById(id);
  }

  public async update(
    id: number,
    dto: UpdateShowtimeDto,
  ): Promise<ShowtimeEntity> {
    return this.updateShowtimeProvider.update(id, dto);
  }

  public async delete(id: number): Promise<void> {
    return this.deleteShowtimeProvider.delete(id);
  }
}
