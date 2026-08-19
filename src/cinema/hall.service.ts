import { Injectable } from '@nestjs/common';
import { CreateHallProvider } from './providers/hall.providers/createHall.provider';
import { GetAllHallsProvider } from './providers/hall.providers/getAllHalls.provider';
import { FindHallByIdProvider } from './providers/hall.providers/findHallById';
import { UpdateHallProvider } from './providers/hall.providers/updateHull.provider';
import { DeleteHallProvider } from './providers/hall.providers/deleteHall.provider';
import { CreateHallDto } from './dto/createHall.dto';
import { HallEntity } from './entities/hall.entity';
import { UpdateHallDto } from './dto/updateHall.dto';

@Injectable()
export class HallService {
  constructor(
    private readonly createHallProvider: CreateHallProvider,
    private readonly getAllHallsProvider: GetAllHallsProvider,
    private readonly findHallByIdProvider: FindHallByIdProvider,
    private readonly updateHallProvider: UpdateHallProvider,
    private readonly deleteHallProvider: DeleteHallProvider,
  ) {}

  public async create(
    dto: CreateHallDto,
    cinemaId: number,
  ): Promise<HallEntity> {
    return this.createHallProvider.create(dto, cinemaId);
  }

  public async getAll(cinemaId: number): Promise<HallEntity[]> {
    return this.getAllHallsProvider.getAll(cinemaId);
  }

  public async findById(id: number): Promise<HallEntity> {
    return this.findHallByIdProvider.findById(id);
  }

  public async update(id: number, dto: UpdateHallDto): Promise<HallEntity> {
    return this.updateHallProvider.update(id, dto);
  }

  public async delete(id: number): Promise<void> {
    return this.deleteHallProvider.delete(id);
  }
}
