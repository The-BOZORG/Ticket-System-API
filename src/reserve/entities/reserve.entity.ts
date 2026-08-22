import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: 1, description: 'Reservation ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    type: () => UserEntity,
    description: 'User who made the reservation',
  })
  @ManyToOne(() => UserEntity, (user) => user.reserves, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ApiProperty({
    type: () => ShowtimeEntity,
    description: 'Showtime for the reservation',
  })
  @ManyToOne(() => ShowtimeEntity, (showtime) => showtime.reserves, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'showtime_id' })
  showtime: ShowtimeEntity;

  @ApiProperty({
    type: () => [ReserveSeatEntity],
    description: 'Reserved seats',
  })
  @OneToMany(() => ReserveSeatEntity, (reserveSeat) => reserveSeat.reserve, {
    cascade: true,
  })
  reserveSeats: ReserveSeatEntity[];

  @ApiProperty({ example: 25.0, description: 'Total price in dollars' })
  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  totalPrice: number;

  @ApiProperty({
    enum: ReserveStatus,
    example: ReserveStatus.PENDING,
    description: 'Reservation status',
  })
  @Column({
    type: 'enum',
    enum: ReserveStatus,
    default: ReserveStatus.PENDING,
  })
  status: ReserveStatus;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  @UpdateDateColumn()
  updatedAt: Date;
}
