import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import envValidation from './config/env.validate';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrm.config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';
import { TicketModule } from './ticket/ticket.module';
import { CommentModule } from './comment/comment.module';
import { CinemaModule } from './cinema/cinema.module';

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
    CommentModule,
    CinemaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
