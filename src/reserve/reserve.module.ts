import { Module } from '@nestjs/common';
import { ReserveService } from './reserve.service';
import { ReserveController } from './reserve.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReserveEntity } from './entities/reserve.entity';
import { ReserveSeatEntity } from './entities/reserveSeat.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { SeatEntity } from 'src/cinema/entities/seat.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReserveEntity,
      ReserveSeatEntity,
      UserEntity,
      SeatEntity,
    ]),
  ],
  controllers: [ReserveController],
  providers: [ReserveService],
})
export class ReserveModule {}
