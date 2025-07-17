import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { TrainingService } from './training.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { TrainingType } from './training.type';
import * as trainingFunction from './functions/training.function';

@Controller('training')
export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  @Post()
  async create(@Body() createTrainingDto: CreateTrainingDto) {
    const trainingType: TrainingType = trainingFunction.convertTrainingDtoToType(createTrainingDto);
    return await this.trainingService.create(trainingType);
  }

  @Get()
  findAll() {
    return this.trainingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.trainingService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTrainingDto: UpdateTrainingDto) {
    const trainingType: TrainingType = trainingFunction.convertTrainingDtoToType(updateTrainingDto);
    return this.trainingService.update(id, trainingType);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.trainingService.remove(id);
  }
}
