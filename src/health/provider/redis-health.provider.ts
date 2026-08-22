import { Inject, Injectable } from '@nestjs/common';
import { HealthIndicatorService } from '@nestjs/terminus';
import Redis from 'ioredis';

@Injectable()
export class RedisHealthIndicator {
  constructor(
    private readonly healthIndicatorService: HealthIndicatorService,

    @Inject('REDIS_CLIENT')
    private readonly redisClient: Redis,
  ) {}

  public async isHealthy(key: string) {
    const indicator = this.healthIndicatorService.check(key);

    try {
      const result = await this.redisClient.ping();

      if (result !== 'PONG') return indicator.down();

      return indicator.up();
    } catch {
      return indicator.down();
    }
  }
}
