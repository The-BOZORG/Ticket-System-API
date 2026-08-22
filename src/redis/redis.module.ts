import { Global, Module } from '@nestjs/common';

import { redisConfig } from 'src/config/redis.config';

@Global()
@Module({
  providers: [redisConfig],
  exports: [redisConfig],
})
export class RedisModule {}
