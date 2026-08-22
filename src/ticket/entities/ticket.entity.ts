import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../../users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tickets' })
export class TicketEntity {
  @ApiProperty({ example: 1, description: 'Ticket ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'TKT-20260601-001',
    description: 'Unique ticket number',
  })
  @Column({
    unique: true,
    nullable: false,
  })
  ticketNumber: string;

  @ApiProperty({ example: 'Support request', description: 'Ticket title' })
  @Column()
  title: string;

  @ApiProperty({
    example: 'Need help with my reservation',
    description: 'Ticket description',
    required: false,
  })
  @Column({ type: 'text', nullable: true })
  description?: string;

  @ApiProperty({ type: () => UserEntity, description: 'Ticket owner' })
  @ManyToOne(() => UserEntity, (user) => user.tickets, {
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  @CreateDateColumn()
  createdAt: Date;
}
