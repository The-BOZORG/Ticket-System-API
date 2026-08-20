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
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  row: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  number: number;

  @ManyToOne(() => HallEntity, (hall) => hall.seats, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  hall: HallEntity;

  @OneToMany(() => ReserveSeatEntity, (reserveSeat) => reserveSeat.seat)
  reserveSeats: ReserveSeatEntity[];
}
