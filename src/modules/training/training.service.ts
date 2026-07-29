import { Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { TrainingType } from './training.type';
import { Training } from './training.schema';
import { FilterQuery } from 'mongoose';
import { TrainingMapper } from './training.mapper';
import { GetTrainingsQueryDto } from './dto/get-trainings-query.dto';
import { GetTrainingsQueryReturnDto } from './dto/get-trainings-query-return.dto';
import { TrainingNotFoundException } from './exceptions/training-not-found.exception';
import { TrainingFactory } from './factory/training.factory';
import { TrainingLevelService } from '../training-level/training-level.service';
import { TrainingRepository } from './training.repository';


@Injectable()
export class TrainingService {

  constructor(
    private readonly trainingRepository: TrainingRepository,
    private readonly trainingLevelService: TrainingLevelService,
  ){}

  async findAll(query: GetTrainingsQueryDto): Promise<GetTrainingsQueryReturnDto> {
    const filter: FilterQuery<Training> = TrainingMapper.getTrainingFilterQuery(query);
    const [trainingList, totalTrainingCount]: [Training[], number] = await this.trainingRepository.findAll(query, filter);
    
    return <GetTrainingsQueryReturnDto>{
      trainings: trainingList,
      pagination: query,
      total: totalTrainingCount,
      totalPages: Math.ceil(totalTrainingCount / query.limit),
    };
  }

  async findOne(id: string): Promise<Training> {
    const _training: Training = await this.trainingRepository.findOne(id);

    if (!_training) {
      throw new TrainingNotFoundException();
    }

    return _training;
  }

  async create(createTrainingDto: CreateTrainingDto): Promise<Training> {
    // Check if the training program is provided. If not, resolve it from the training type and training level via training-level service.
    if (createTrainingDto.trainingProgram === null || createTrainingDto.trainingProgram === undefined) {
      const trainingLevel = await this.trainingLevelService.findByTrainingTypeAndLevel(createTrainingDto.trainingType, createTrainingDto.trainingLevel);
      createTrainingDto.trainingProgram = trainingLevel?.trainingProgram;
    }

    // Get the appropriate handler based on the training type.
    const handler = TrainingFactory.get(createTrainingDto.trainingType);
    // Validate the training program using the handler only if it exists.
    handler.validateTrainingProgram(createTrainingDto.trainingProgram);
    // Convert the DTO to the TrainingType.
    const trainingType: TrainingType = TrainingMapper.convertTrainingDtoToType(createTrainingDto);
    const _training: Training = await this.trainingRepository.create(trainingType);

    return _training;
  }

  async update(id: string, updateTrainingDto: UpdateTrainingDto): Promise<Training> {
    // Get the appropriate handler based on the training type.
    const handler = TrainingFactory.get(updateTrainingDto.trainingType);
    // Validate the training result using the handler only if it exists.
    if (updateTrainingDto.trainingResult) {
      handler.validateTrainingResult(updateTrainingDto.trainingResult);
      updateTrainingDto.trainingMetrics = handler.calculateResult(updateTrainingDto.trainingResult);
    }
    
    // Convert the DTO to the TrainingType.
    const trainingType: TrainingType = TrainingMapper.convertTrainingDtoToType(updateTrainingDto);
    const _training: Training = await this.trainingRepository.update(id, trainingType);

    if (!_training) {
      throw new TrainingNotFoundException();
    }

    return _training;
  }

  async remove(id: string): Promise<Training> {
    const _training: Training = await this.trainingRepository.remove(id);

    if (!_training) {
      throw new TrainingNotFoundException();
    }
    return _training;
  }
}
