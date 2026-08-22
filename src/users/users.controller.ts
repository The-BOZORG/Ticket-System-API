import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { UserEntity, UserRole } from './entities/user.entity';
import { UpdateDto } from './dto/update.dto';
import { ChangePasswordDto } from './dto/updatePassword.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Paginate } from 'nestjs-paginate';
import type { PaginateQuery } from 'nestjs-paginate';
import { Roles } from '../common/decorators/role.decorator';
import { RolesGuard } from '../common/guards/role.guard';

@ApiTags('Users')
@ApiBearerAuth('access-token')
@Controller('user')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get current user profile' })
  public showMe(@CurrentUser() user: UserEntity) {
    return this.usersService.me(user.id);
  }

  @Get('users')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get all users (Admin only)',
    description: 'Returns paginated list of users. Admin role required.',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Results per page',
  })
  public getUsers(@Query() dto: PaginationDto) {
    return this.usersService.getUser(dto);
  }

  @Get('pagination')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get users with nestjs-paginate',
    description: 'Returns paginated users using nestjs-paginate query params.',
  })
  public pagination(@Paginate() query: PaginateQuery) {
    return this.usersService.pagination(query);
  }

  @Patch('update')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update current user profile' })
  public update(@Body() dto: UpdateDto, @CurrentUser() user: UserEntity) {
    this.usersService.update(dto, user.id);

    return {
      message: 'user updated successfully',
    };
  }

  @Patch('updatePass')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Change password' })
  public updatePass(
    @Body() dto: ChangePasswordDto,
    @CurrentUser() user: UserEntity,
  ) {
    this.usersService.updatePass(dto, user.id);

    return {
      message: 'password changed successfully',
    };
  }

  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete current user account' })
  public delete(@CurrentUser() user: UserEntity) {
    this.usersService.delete(user.id);

    return {
      message: 'User deleted successfully',
    };
  }
}
