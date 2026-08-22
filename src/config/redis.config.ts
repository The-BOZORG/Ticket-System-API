import { createClient } from 'redis';

export const redisConfig = {
  provide: 'REDIS_CLIENT',

  useFactory: async () => {
    const host = process.env.REDIS_HOST;
    const port = process.env.REDIS_PORT;
    const password = process.env.REDIS_PASSWORD;

    const client = createClient({
      socket: {
        host,
        port: Number(port),
      },
      password: password || undefined,
    });

    client.on('error', (error) => {
      console.error('redis Error:', error);
    });

    await client.connect();

    console.log('redis connected successfully');

    return client;
  },
};
