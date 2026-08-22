import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CinemaEntity } from './cinema.entity';
import { SeatEntity } from './seat.entity';
import { ShowtimeEntity } from '../../showtime/entities/showtime.entity';

@Entity({ name: 'halls' })
export class HallEntity {
  @ApiProperty({ example: 1, description: 'Hall ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Hall A', description: 'Hall name' })
  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @ApiProperty({ type: () => CinemaEntity, description: 'Parent cinema' })
  @ManyToOne(() => CinemaEntity, (cinema) => cinema.halls, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  cinema: CinemaEntity;

  @ApiProperty({ type: () => [SeatEntity], description: 'Seats in this hall' })
  @OneToMany(() => SeatEntity, (seat) => seat.hall)
  seats: SeatEntity[];

  @ApiProperty({
    type: () => [ShowtimeEntity],
    description: 'Showtimes in this hall',
  })
  @OneToMany(() => ShowtimeEntity, (showtime) => showtime.hall)
  showtimes: ShowtimeEntity[];
}
