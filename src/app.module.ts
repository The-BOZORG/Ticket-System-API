import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import envValidation from './config/env.validate';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeOrm.config';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
