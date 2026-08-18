import { IsOptional } from 'class-validator';
import { UserEntity } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tickets' })
export class TicketEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: false,
  })
  ticketNumber: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  @IsOptional()
  description?: string;

  @Column({
    default: 'OPEN',
  })
  status: string;

  @Column({
    default: 'MEDIUM',
  })
  priority: string;

  @ManyToOne(() => UserEntity, (user) => user.tickets, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;
}
