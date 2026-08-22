import { Injectable } from '@nestjs/common';
import { CreateRateLimiterDto } from './dto/create-rate-limiter.dto';
import { UpdateRateLimiterDto } from './dto/update-rate-limiter.dto';

@Injectable()
export class RateLimiterService {
  create(createRateLimiterDto: CreateRateLimiterDto) {
    return 'This action adds a new rateLimiter';
  }

  findAll() {
    return `This action returns all rateLimiter`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rateLimiter`;
  }

  update(id: number, updateRateLimiterDto: UpdateRateLimiterDto) {
    return `This action updates a #${id} rateLimiter`;
  }

  remove(id: number) {
    return `This action removes a #${id} rateLimiter`;
  }
}
