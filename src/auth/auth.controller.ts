import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import type { Response } from 'express';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtRefreshGuard } from './guards/refresh.guard';
import { CurrentUser } from '../common/decorators/currentUser.decorator';
import { UserEntity } from 'src/users/entities/user.entity';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Auth')
@Controller('auth')
@Throttle({
  default: {
    limit: 10,
    ttl: 60000,
  },
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Creates a new user account and sends a verification email.',
  })
  public async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Get('verify-email')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Verify email address',
    description: 'Verifies user email using the token sent to their email.',
  })
  @ApiQuery({
    name: 'token',
    description: 'Email verification JWT token',
    example: 'eyJhbGciOiJIUzI1NiIs...',
  })
  public async verifyEmail(@Query('token') token: string) {
    await this.authService.verifyEmail(token);

    return {
      message: 'email verified successfully',
    };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Login',
    description:
      'Authenticates user and returns access token. Refresh token is set as httpOnly cookie.',
  })
  public async login(
    @CurrentUser() user: UserEntity,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(user, response);
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Refresh access token',
    description:
      'Uses the refresh token from cookie to generate a new access token.',
  })
  public async refreshToken(
    @CurrentUser() user: UserEntity,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.refreshToken(user, response);
  }

  @Post('logout')
  @UseGuards(JwtRefreshGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('access-token')
  @ApiOperation({
    summary: 'Logout',
    description: 'Clears the refresh token cookie.',
  })
  @ApiResponse({ status: 200, description: 'Logged out successfully.' })
  public logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }
}
