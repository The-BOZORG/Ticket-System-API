import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VerifyEmailProvider {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,

    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async verify(token: string): Promise<void> {
    let payload: {
      id: string;
      purpose: string;
    };

    try {
      payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.getOrThrow('JWT_EMAIL_VERIFICATION_TOKEN'),
      });
    } catch {
      throw new UnauthorizedException('invalid or expired verification token');
    }

    if (payload.purpose !== 'email-verification') {
      throw new UnauthorizedException('invalid verification token');
    }

    const user = await this.userRepository.findOne({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      throw new UnauthorizedException('user not found');
    }

    if (user.isVerified) {
      return;
    }

    user.isVerified = true;

    await this.userRepository.save(user);
  }
}
