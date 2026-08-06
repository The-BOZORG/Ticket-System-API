import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export async function jwtAccessConfig(
  configService: ConfigService,
): Promise<JwtModuleOptions> {
  return {
    secret: configService.getOrThrow('JWT_ACCESS_TOKEN'),
    signOptions: {
      expiresIn: '30m',
      algorithm: 'HS256',
    },
  };
}

export async function jwtRefreshConfig(
  configService: ConfigService,
): Promise<JwtModuleOptions> {
  return {
    secret: configService.getOrThrow('JWT_REFRESH_TOKEN'),
    signOptions: {
      expiresIn: '7d',
      algorithm: 'HS256',
    },
  };
}
