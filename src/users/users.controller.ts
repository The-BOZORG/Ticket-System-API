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
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users') // http://localhost:3000/user/users?limit=2&offset=1
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  public getUsers(@Query() dto: PaginationDto) {
    return this.usersService.getUser(dto);
  }

  @Get('pagination')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  public pagination(@Paginate() query: PaginateQuery) {
    return this.usersService.pagination(query);
  }

  @Patch('update') // http://localhost:3000/user/update
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  public update(@Body() dto: UpdateDto, @CurrentUser() user: UserEntity) {
    const result = this.usersService.update(dto, user.id);

    return {
      message: 'user updated successfully',
      data: result,
    };
  }

  @Patch('updatePass')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
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
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  public delete(@CurrentUser() user: UserEntity) {
    this.usersService.delete(user.id);

    return {
      message: 'User deleted successfully',
    };
  }
}
