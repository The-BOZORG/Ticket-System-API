import { Module } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { ReserveController } from './reserve.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReserveEntity } from './entities/reserve.entity';
import { ReserveSeatEntity } from './entities/reserveSeat.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { SeatEntity } from 'src/cinema/entities/seat.entity';
import { CreateReserveProvider } from './providers/createReserve.provider';
import { FindReserveByIdProvider } from './providers/findReserveById.provider';
import { DeleteReserveProvider } from './providers/deleteReserver.provider';
import { ShowtimeEntity } from 'src/showtime/entities/showtime.entity';
import { SeatLockProvider } from './providers/seatLock.provider';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReserveEntity,
      ReserveSeatEntity,
      UserEntity,
      SeatEntity,
      ShowtimeEntity,
    ]),
  ],
  controllers: [ReserveController],
  providers: [
    ReserveService,
    CreateReserveProvider,
    FindReserveByIdProvider,
    DeleteReserveProvider,
    SeatLockProvider,
  ],
})
export class ReserveModule {}
