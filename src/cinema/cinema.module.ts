import { Module } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CinemaController } from './cinema.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CinemaEntity } from './entities/cinema.entity';
import { HallEntity } from './entities/hall.entity';
import { SeatEntity } from './entities/seat.entity';
import { CreateCinemaProvider } from './providers/cinema.providers/createCinema.providers';
import { GetAllCinemasProvider } from './providers/cinema.providers/getAllCinema.provider';
import { FindCinemaByIdProvider } from './providers/cinema.providers/findCinemaById.provider';
import { UpdateCinemaProvider } from './providers/cinema.providers/updateCinema.provider';
import { DeleteCinemaProvider } from './providers/cinema.providers/deleteCinama.provider';
import { HallService } from './hall.service';
import { HallController } from './hall.controller';
import { CreateHallProvider } from './providers/hall.providers/createHall.provider';
import { GetAllHallsProvider } from './providers/hall.providers/getAllHalls.provider';
import { FindHallByIdProvider } from './providers/hall.providers/findHallById';
import { UpdateHallProvider } from './providers/hall.providers/updateHull.provider';
import { DeleteHallProvider } from './providers/hall.providers/deleteHall.provider';
import { SeatService } from './seat.service';
import { CreateSeatsProvider } from './providers/seat.providers/createSeat.provider';
import { FindSeatByIdProvider } from './providers/seat.providers/findSeatByid.provider';
import { GetSeatsByHallProvider } from './providers/seat.providers/getSeatByHull.provider';
import { SeatController } from './seat.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CinemaEntity, HallEntity, SeatEntity])],
  controllers: [CinemaController, HallController, SeatController],
  providers: [
    CinemaService,
    HallService,
    SeatService,
    CreateCinemaProvider,
    GetAllCinemasProvider,
    FindCinemaByIdProvider,
    UpdateCinemaProvider,
    DeleteCinemaProvider,
    CreateHallProvider,
    GetAllHallsProvider,
    FindHallByIdProvider,
    UpdateHallProvider,
    DeleteHallProvider,
    CreateSeatsProvider,
    FindSeatByIdProvider,
    GetSeatsByHallProvider,
  ],
})
export class CinemaModule {}
