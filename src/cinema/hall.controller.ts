import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';
import { HallService } from './hall.service';
import { CreateHallDto } from './dto/createHall.dto';
import { HallEntity } from './entities/hall.entity';
import { UpdateHallDto } from './dto/updateHall.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Hall')
@ApiBearerAuth('access-token')
@Controller('hall')
@UseGuards(JwtAuthGuard)
@Throttle({
  default: {
    limit: 30,
    ttl: 60000,
  },
})
export class HallController {
  constructor(private readonly hallService: HallService) {}

  @Post('create/:cinemaId')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a hall within a cinema' })
  @ApiParam({ name: 'cinemaId', description: 'Parent cinema ID', example: 1 })
  public async create(
    @Param('cinemaId') cinemaId: number,
    @Body() dto: CreateHallDto,
  ): Promise<HallEntity> {
    return this.hallService.create(dto, cinemaId);
  }

  @Get('cinema/:cinemaId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all halls of a cinema' })
  @ApiParam({ name: 'cinemaId', description: 'Cinema ID', example: 1 })
  public async getAll(
    @Param('cinemaId') cinemaId: number,
  ): Promise<HallEntity[]> {
    return this.hallService.getAll(cinemaId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get hall by ID' })
  @ApiParam({ name: 'id', description: 'Hall ID', example: 1 })
  public async findById(@Param('id') id: number): Promise<HallEntity> {
    return this.hallService.findById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update a hall' })
  @ApiParam({ name: 'id', description: 'Hall ID', example: 1 })
  public async update(
    @Param('id') id: number,
    @Body() dto: UpdateHallDto,
  ): Promise<HallEntity> {
    return this.hallService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a hall' })
  @ApiParam({ name: 'id', description: 'Hall ID', example: 1 })
  public async delete(@Param('id') id: number): Promise<void> {
    return this.hallService.delete(id);
  }
}
