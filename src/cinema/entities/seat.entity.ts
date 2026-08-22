import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { HallEntity } from './hall.entity';
import { ReserveSeatEntity } from '../../reserve/entities/reserveSeat.entity';

@Entity({ name: 'seats' })
@Unique(['hall', 'row', 'number'])
export class SeatEntity {
  @ApiProperty({ example: 1, description: 'Seat ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'A', description: 'Seat row letter' })
  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  row: string;

  @ApiProperty({ example: 5, description: 'Seat number within the row' })
  @Column({
    type: 'int',
    nullable: false,
  })
  number: number;

  @ApiProperty({ type: () => HallEntity, description: 'Parent hall' })
  @ManyToOne(() => HallEntity, (hall) => hall.seats, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  hall: HallEntity;

  @ApiProperty({
    type: () => [ReserveSeatEntity],
    description: 'Reservations for this seat',
  })
  @OneToMany(() => ReserveSeatEntity, (reserveSeat) => reserveSeat.seat)
  reserveSeats: ReserveSeatEntity[];
}
