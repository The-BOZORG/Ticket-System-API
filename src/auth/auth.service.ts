import { Injectable } from '@nestjs/common';
import { RegisterProvider } from './providers/register.provider';
import { LoginProvider } from './providers/login.provider';
import { RefreshTokenProvider } from './providers/refreshToken.provider';
import { RegisterDto } from './dto/register.dto';
import { UserEntity } from 'src/users/entities/user.entity';
import { Response } from 'express';
import { CookieProvider } from './providers/cookie.provider';
import { ValidateJwtProvider } from './providers/validateJwt.provider';
import { ValidateLocalProvider } from './providers/validateLocal.privider';
import { VerifyEmailProvider } from './providers/verifyEmailToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly registerProvider: RegisterProvider,
    private readonly loginProvider: LoginProvider,
    private readonly refreshTokenProvider: RefreshTokenProvider,
    private readonly cookieProvider: CookieProvider,
    private readonly validateLocalProvider: ValidateLocalProvider,
    private readonly validateJwtProvider: ValidateJwtProvider,
    private readonly verifyEmailProvider: VerifyEmailProvider,
  ) {}

  public async register(dto: RegisterDto) {
    return await this.registerProvider.register(dto);
  }

  public async verifyEmail(token: string): Promise<void> {
    return await this.verifyEmailProvider.verify(token);
  }

  public async login(user: UserEntity, response: Response) {
    return await this.loginProvider.login(user, response);
  }

  public async refreshToken(user: UserEntity, response: Response) {
    return this.refreshTokenProvider.refreshToken(user, response);
  }

  public async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity> {
    return await this.validateLocalProvider.validate({ email, password });
  }

  public async validate(id: string): Promise<UserEntity> {
    return await this.validateJwtProvider.validate({ id });
  }

  public logout(response: Response) {
    this.cookieProvider.clearRefreshTokenCookie(response);
  }
}
