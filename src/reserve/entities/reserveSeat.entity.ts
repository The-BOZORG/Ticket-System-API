import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SeatEntity } from '../../cinema/entities/seat.entity';
import { ReserveEntity } from './reserve.entity';

@Entity('reserve_seats')
export class ReserveSeatEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ReserveEntity, (reserve) => reserve.reserveSeats, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'reserve_id' })
  reserve: ReserveEntity;

  @ManyToOne(() => SeatEntity, (seat) => seat.reserveSeats, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'seat_id' })
  seat: SeatEntity;
}
