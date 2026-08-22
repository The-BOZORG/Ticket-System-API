import Redis from 'ioredis';

export const redisConfig = {
  provide: 'REDIS_CLIENT',

  useFactory: () => {
    const redis = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
    });

    redis.on('connect', () => {
      console.log('redis connected successfully');
    });

    redis.on('error', (error) => {
      console.error('redis Error:', error);
    });

    return redis;
  },
};
