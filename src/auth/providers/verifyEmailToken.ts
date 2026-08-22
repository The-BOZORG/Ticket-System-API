import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VerifyEmailProvider {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    @Inject('REDIS_CLIENT')
    private readonly redisClient: Redis,
  ) {}

  public async verify(token: string): Promise<void> {
    let payload: {
      id: string;
      purpose: string;
      jti: string;
    };

    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow('JWT_EMAIL_VERIFICATION_TOKEN'),
      });
    } catch {
      throw new UnauthorizedException('invalid or expired verification token');
    }

    if (payload.purpose !== 'email-verification')
      throw new UnauthorizedException('invalid verification token');

    const userId = await this.redisClient.get(
      `email-verification:${payload.jti}`,
    );

    if (!userId)
      throw new UnauthorizedException('invalid or expired verification token');

    if (userId !== payload.id)
      throw new UnauthorizedException('invalid verification token');

    const user = await this.userRepository.findOne({
      where: {
        id: payload.id,
      },
    });

    if (!user) throw new UnauthorizedException('user not found');

    if (user.isVerified) {
      await this.redisClient.del(`email-verification:${payload.jti}`);

      return;
    }

    user.isVerified = true;

    await this.userRepository.save(user);

    await this.redisClient.del(`email-verification:${payload.jti}`);
  }
}
