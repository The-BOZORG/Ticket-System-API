import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CinemaEntity } from './cinema.entity';
import { SeatEntity } from './seat.entity';

@Entity({ name: 'halls' })
export class HallEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @ManyToOne(() => CinemaEntity, (cinema) => cinema.halls, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  cinema: CinemaEntity;

  @OneToMany(() => SeatEntity, (seat) => seat.hall)
  seats: SeatEntity[];
}
