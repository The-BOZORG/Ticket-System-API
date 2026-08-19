import { Injectable } from '@nestjs/common';
import { UpdateUser } from './providers/updateUser.provider';
import { UpdatePassword } from './providers/updatePasswprd.provider';
import { DeleteUser } from './providers/deleteUser.provider';
import { UpdateDto } from './dto/update.dto';
import { UserEntity } from './entities/user.entity';
import { ChangePasswordDto } from './dto/updatePassword.dto';
import { GetUsers } from './providers/getUsers.provider';
import { PaginationDto } from './dto/pagination.dto';
import { GetAllUsersPagination } from './providers/getUsersPagination.provider';
import { Paginated, PaginateQuery } from 'nestjs-paginate';
import { ShowMeProvider } from './providers/shoMe.provider';

@Injectable()
export class UsersService {
  constructor(
    private readonly updateUser: UpdateUser,
    private readonly updatePassword: UpdatePassword,
    private readonly deleteUser: DeleteUser,
    private readonly getUsers: GetUsers,
    private readonly getAllUsersPagination: GetAllUsersPagination,
    private readonly showMe: ShowMeProvider,
  ) {}

  public me(userId: string) {
    return this.showMe.showMe(userId);
  }

  public getUser(dto: PaginationDto) {
    return this.getUsers.getAllUser(dto);
  }

  public async pagination(
    query: PaginateQuery,
  ): Promise<Paginated<UserEntity>> {
    return this.getAllUsersPagination.getAllUsersPagination(query);
  }

  public update(dto: UpdateDto, userId: string): Promise<UserEntity> {
    return this.updateUser.updateUser(dto, userId);
  }

  public updatePass(dto: ChangePasswordDto, userId: string): Promise<void> {
    return this.updatePassword.updatePassword(userId, dto);
  }

  public delete(userId: string): Promise<void> {
    return this.deleteUser.deleteUser(userId);
  }
}
