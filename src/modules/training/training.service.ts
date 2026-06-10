import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { TrainingType } from './training.type';
import { InjectModel } from '@nestjs/mongoose';
import { Training } from './training.schema';
import { Model } from 'mongoose';
import { TrainingMapper } from './training.mapper';
import { GetTrainingsQueryDto } from './dto/get-trainings-query.dto';
import { GetTrainingsQueryReturnDto } from './dto/get-trainings-query-return.dto';
import { TrainingNotFoundException } from './exceptions/training-not-found.exception';

@Injectable()
export class TrainingService {

  constructor(
    @InjectModel(Training.name)
    private readonly trainingModel: Model<Training> 
  ){}

  async findAll(query: GetTrainingsQueryDto): Promise<GetTrainingsQueryReturnDto> {
    const skip = (query.page - 1) * query.limit;
    const filter: any = {
      trainingType: query.trainingType, 
      trainingStatus: query.trainingStatus
    };
    
    const [trainings, total]: [Training[], number] = await Promise.all([
      this.trainingModel
        .find(filter)
        .sort({ createdAt: -1 }) // Sort by creation date (newest first)
        .skip(skip)
        .limit(query.limit)
        .exec(),

        this.trainingModel.countDocuments(filter).exec()
    ]);

    return<GetTrainingsQueryReturnDto>{
      trainings: trainings,
      pagination: {
        page: query.page,
        limit: query.limit,
        total: total,
        totalPages: Math.ceil(total / query.limit),
        trainingType: query.trainingType,
        trainingStatus: query.trainingStatus
      }
    };
  }

  async findOne(id: string): Promise<Training> {
    const training: Training = await this.trainingModel.findById(id);
    if (!training) {
      throw new TrainingNotFoundException();
    }
    return training;
  }

  async create(createTrainingDto: CreateTrainingDto): Promise<Training> {
    const trainingType: TrainingType = TrainingMapper.convertTrainingDtoToType(createTrainingDto);
    const _training: Training = await this.trainingModel.create(trainingType);

    return _training;
  }

  async update(id: string, updateTrainingDto: UpdateTrainingDto): Promise<Training> {
    const trainingType: TrainingType = TrainingMapper.convertTrainingDtoToType(updateTrainingDto);
    const training: Training = await this.trainingModel.findByIdAndUpdate(
      id,
      trainingType,
      {
        new: true,
        runValidators: true
      }
    );
    if (!training) {
      throw new NotFoundException(`Training with ID ${id} not found`);
    }
    return training;
  }

  async remove(id: string): Promise<Training> {
    const training: Training = await this.trainingModel.findByIdAndDelete(id);
    if (!training) {
      throw new NotFoundException(`Training with ID ${id} not found`);
    }
    return training;
  }
}
