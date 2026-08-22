import { ApiProperty } from '@nestjs/swagger';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SeatEntity } from '../../cinema/entities/seat.entity';
import { ReserveEntity } from './reserve.entity';

@Entity('reserve_seats')
export class ReserveSeatEntity {
  @ApiProperty({ example: 1, description: 'ReserveSeat ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ type: () => ReserveEntity, description: 'Parent reservation' })
  @ManyToOne(() => ReserveEntity, (reserve) => reserve.reserveSeats, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'reserve_id' })
  reserve: ReserveEntity;

  @ApiProperty({ type: () => SeatEntity, description: 'Reserved seat' })
  @ManyToOne(() => SeatEntity, (seat) => seat.reserveSeats, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'seat_id' })
  seat: SeatEntity;
}
