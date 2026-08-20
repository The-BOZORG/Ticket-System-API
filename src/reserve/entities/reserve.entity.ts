import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UserEntity } from '../../users/entities/user.entity';
import { ShowtimeEntity } from '../../showtime/entities/showtime.entity';
import { ReserveSeatEntity } from './reserveSeat.entity';
import { ReserveStatus } from '../enum/reserve.enum';

@Entity('reserves')
export class ReserveEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.reserves, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ManyToOne(() => ShowtimeEntity, (showtime) => showtime.reserves, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'showtime_id' })
  showtime: ShowtimeEntity;

  @OneToMany(() => ReserveSeatEntity, (reserveSeat) => reserveSeat.reserve, {
    cascade: true,
  })
  reserveSeats: ReserveSeatEntity[];

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  totalPrice: number;

  @Column({
    type: 'enum',
    enum: ReserveStatus,
    default: ReserveStatus.PENDING,
  })
  status: ReserveStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
