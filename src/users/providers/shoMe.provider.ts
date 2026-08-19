import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { FindUserById } from './findUserById.provider';

@Injectable()
export class ShowMeProvider {
  constructor(private readonly findById: FindUserById) {}

  public async showMe(userId: string): Promise<UserEntity> {
    if (!userId) throw new BadRequestException('User ID is required');

    return this.findById.findById(userId);
  }
}
