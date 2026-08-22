import { ConflictException, Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class SeatLockProvider {
  constructor(
    @Inject('REDIS_CLIENT')
    private readonly redisClient: Redis,
  ) {}

  public async lock(showtimeId: number, seatId: number): Promise<void> {
    const key = `seat-lock:${showtimeId}:${seatId}`;

    const result = await this.redisClient.set(key, 'locked', 'EX', 300, 'NX');

    if (result !== 'OK') throw new ConflictException('seat is already locked');
  }
}
