import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RateLimiterService } from './rate-limiter.service';
import { CreateRateLimiterDto } from './dto/create-rate-limiter.dto';
import { UpdateRateLimiterDto } from './dto/update-rate-limiter.dto';

@Controller('rate-limiter')
export class RateLimiterController {
  constructor(private readonly rateLimiterService: RateLimiterService) {}

  @Post()
  create(@Body() createRateLimiterDto: CreateRateLimiterDto) {
    return this.rateLimiterService.create(createRateLimiterDto);
  }

  @Get()
  findAll() {
    return this.rateLimiterService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rateLimiterService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRateLimiterDto: UpdateRateLimiterDto) {
    return this.rateLimiterService.update(+id, updateRateLimiterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rateLimiterService.remove(+id);
  }
}
