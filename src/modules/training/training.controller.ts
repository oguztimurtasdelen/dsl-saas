import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, Query, HttpException } from '@nestjs/common';
import { TrainingService } from './training.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { JwtAuthGuard } from '../../customs/validators/jwt-auth.guard';
import { CurrentProfileID } from '../../customs/decorators/current-profileID.decorator';
import { Training } from './training.schema';
import { GetTrainingsQueryReturnDto } from './dto/get-trainings-query-return.dto';
import { GetTrainingsQueryDto } from './dto/get-trainings-query.dto';



@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@CurrentProfileID() user: any, @Query() query: GetTrainingsQueryDto): Promise<GetTrainingsQueryReturnDto | HttpException> {
    return this.trainingService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Training> {
    return this.trainingService.findOne(id);
  }

  @Post()
  async create(@Body() createTrainingDto: CreateTrainingDto): Promise<Training> {
    return await this.trainingService.create(createTrainingDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTrainingDto: UpdateTrainingDto): Promise<Training> {
    return this.trainingService.update(id, updateTrainingDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Training> {
    return this.trainingService.remove(id);
  }
}
