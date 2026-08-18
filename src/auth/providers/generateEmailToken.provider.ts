import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class GenerateEmailToken {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async generate(user: UserEntity): Promise<string> {
    return await this.jwtService.signAsync(
      {
        id: user.id,
        purpose: 'email-verification',
      },
      {
        secret: this.configService.getOrThrow('JWT_EMAIL_VERIFICATION_TOKEN'),
        expiresIn: '15m',
      },
    );
  }
}
