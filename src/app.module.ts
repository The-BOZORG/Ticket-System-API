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
import { redisConfig } from './config/redis.config';

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
    AuthModule,
    UsersModule,
    MailModule,
    TicketModule,
    CinemaModule,
    HealthModule,
    MovieModule,
    ShowtimeModule,
    ReserveModule,
  ],
  providers: [redisConfig],
  exports: [redisConfig],
})
export class AppModule {}
