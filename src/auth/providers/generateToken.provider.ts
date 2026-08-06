import { Injectable } from '@nestjs/common';
import { JwtPayload } from '../interface/jwt.interface';
import { GeneratedTokens } from '../interface/token.interface';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GenerateTokenProvider {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async generateTokens(user: JwtPayload): Promise<GeneratedTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: user.id,
          type: 'access',
        },
        {
          secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN'),
          expiresIn: this.configService.getOrThrow('JWT_ACCESS_TOKEN_TTL'),
        },
      ),

      this.jwtService.signAsync(
        {
          id: user.id,
          type: 'refresh',
        },
        {
          secret: this.configService.getOrThrow('JWT_REFRESH_TOKEN'),
          expiresIn: this.configService.getOrThrow('JWT_REFRESH_TOKEN_TTL'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
