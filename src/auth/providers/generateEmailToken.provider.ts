import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';
import Redis from 'ioredis';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class GenerateEmailToken {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,

    @Inject('REDIS_CLIENT')
    private readonly redisClient: Redis,
  ) {}

  public async generate(user: UserEntity): Promise<string> {
    const jti = randomUUID();

    const token = await this.jwtService.signAsync(
      {
        id: user.id,
        purpose: 'email-verification',
        jti,
      },
      {
        secret: this.configService.getOrThrow('JWT_EMAIL_VERIFICATION_TOKEN'),
        expiresIn: '15m',
      },
    );

    await this.redisClient.set(`email-verification:${jti}`, user.id, 'EX', 900);

    return token;
  }
}
