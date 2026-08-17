import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { jwtAccessConfig } from 'src/config/jwt.config';
import { UsersModule } from 'src/users/users.module';
import { CookieProvider } from './providers/cookie.provider';
import { GenerateTokenProvider } from './providers/generateToken.provider';
import { HashProvider } from './providers/hash.provider';
import { LoginProvider } from './providers/login.provider';
import { RefreshTokenProvider } from './providers/refreshToken.provider';
import { RegisterProvider } from './providers/register.provider';
import { ValidateJwtProvider } from './providers/validateJwt.provider';
import { ValidateLocalProvider } from './providers/validateLocal.privider';
import { ValidateRefreshJwtProvider } from './providers/validateRefreshJwt.provider';
import { WhiteListProvider } from './providers/whiteList.provider';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwtRefresh.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: jwtAccessConfig,
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    CookieProvider,
    GenerateTokenProvider,
    HashProvider,
    LoginProvider,
    RefreshTokenProvider,
    RegisterProvider,
    ValidateJwtProvider,
    ValidateLocalProvider,
    ValidateRefreshJwtProvider,
    WhiteListProvider,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}
