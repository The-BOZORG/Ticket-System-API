import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import envValidation from './config/env.validate';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrm.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import { TicketModule } from './ticket/ticket.module';
import { CinemaModule } from './cinema/cinema.module';
import { HealthModule } from './health/health.module';
import { MovieModule } from './movie/movie.module';
import { ShowtimeModule } from './showtime/showtime.module';
import { ReserveModule } from './reserve/reserve.module';
import { RedisModule } from './redis/redis.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import { RateLimiterModule } from './rate-limiter/rate-limiter.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),
    ThrottlerModule.forRootAsync({
      imports: [RedisModule],
      inject: ['REDIS_CLIENT'],
      useFactory: (redisClient) => ({
        throttlers: [
          {
            name: 'default',
            ttl: 60000,
            limit: 100,
          },
        ],
        storage: new ThrottlerStorageRedisService(redisClient),
      }),
    }),
    AuthModule,
    UsersModule,
    MailModule,
    TicketModule,
    CinemaModule,
    HealthModule,
    MovieModule,
    ShowtimeModule,
    ReserveModule,
    RedisModule,
    RateLimiterModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [],
})
export class AppModule {}
