import {
  HttpException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { ReserveEntity } from '../entities/reserve.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { ShowtimeEntity } from 'src/showtime/entities/showtime.entity';
import { SeatEntity } from 'src/cinema/entities/seat.entity';
import { CreateReserveDto } from '../dto/createReserve.dto';
import { ReserveSeatEntity } from '../entities/reserveSeat.entity';

@Injectable()
export class CreateReserveProvider {
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(ReserveEntity)
    private readonly reserveRepository: Repository<ReserveEntity>,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @InjectRepository(ShowtimeEntity)
    private readonly showtimeRepository: Repository<ShowtimeEntity>,

    @InjectRepository(SeatEntity)
    private readonly seatRepository: Repository<SeatEntity>,
  ) {}

  public async create(
    dto: CreateReserveDto,
    userId: string,
  ): Promise<ReserveEntity> {
    const { showtimeId, seatIds } = dto;

    try {
      const user = await this.userRepository.findOneBy({
        id: userId,
      });

      if (!user) throw new NotFoundException('user not found');

      const showtime = await this.showtimeRepository.findOne({
        where: {
          id: showtimeId,
        },
        relations: {
          hall: true,
          movie: true,
        },
      });

      if (!showtime) throw new NotFoundException('showtime not found');

      const seats = await this.seatRepository.find({
        where: seatIds.map((id) => ({ id })),
      });

      if (seats.length !== seatIds.length)
        throw new NotFoundException('one or more seats not found');

      const invalidSeat = seats.find(
        (seat) => seat.hall.id !== showtime.hall.id,
      );

      if (invalidSeat)
        throw new HttpException('seat does not belong to this hall', 400);

      return await this.dataSource.transaction(async (manager) => {
        const reserve = manager.create(ReserveEntity, {
          user,
          showtime,
          totalPrice: 0,
        });

        const savedReserve = await manager.save(reserve);

        const reserveSeats = seats.map((seat) =>
          manager.create(ReserveSeatEntity, {
            reserve: savedReserve,
            seat,
          }),
        );

        await manager.save(ReserveSeatEntity, reserveSeats);

        return await manager.findOneOrFail(ReserveEntity, {
          where: {
            id: savedReserve.id,
          },
          relations: {
            user: true,
            showtime: {
              movie: true,
              hall: true,
            },
            reserveSeats: {
              seat: true,
            },
          },
        });
      });
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new RequestTimeoutException('failed to create reserve');
    }
  }
}
