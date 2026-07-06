import { Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { TrainingType } from './training.type';
import { InjectModel } from '@nestjs/mongoose';
import { Training } from './training.schema';
import { FilterQuery, Model, Types } from 'mongoose';
import { TrainingMapper } from './training.mapper';
import { GetTrainingsQueryDto } from './dto/get-trainings-query.dto';
import { GetTrainingsQueryReturnDto } from './dto/get-trainings-query-return.dto';
import { TrainingNotFoundException } from './exceptions/training-not-found.exception';
import { TrainingFactory } from './factory/training.factory';

@Injectable()
export class TrainingService {

  constructor(
    @InjectModel(Training.name)
    private readonly trainingModel: Model<Training> 
  ){}

  async findAll(profile_id: string, query: GetTrainingsQueryDto): Promise<GetTrainingsQueryReturnDto> {
    const skip = (query.page - 1) * query.limit;

    const filter: FilterQuery<Training> = {
      profile: new Types.ObjectId(profile_id),
      ...(query.trainingType && { trainingType: query.trainingType }),
      ...(query.trainingStatus && { trainingStatus: query.trainingStatus }),
      ...(query.createdAt && { createdAt: { $gte: new Date(`${query.createdAt}T00:00:00.000Z`), $lt: new Date(`${query.createdAt}T23:59:59.999Z`) } })
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
    const training: Training = await this.trainingModel.findById(id).exec();
    if (!training) {
      throw new TrainingNotFoundException();
    }
    return training;
  }

  async create(createTrainingDto: CreateTrainingDto): Promise<Training> {
    // Get the appropriate handler based on the training type.
    const handler = TrainingFactory.get(createTrainingDto.trainingType);
    // Validate the training program using the handler only if it exists.
    handler.validateTrainingProgram(createTrainingDto.trainingProgram);
    // Convert the DTO to the TrainingType.
    const trainingType: TrainingType = TrainingMapper.convertTrainingDtoToType(createTrainingDto);
    const training: Training = await this.trainingModel.create(trainingType);

    return training;
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

    const training: Training = await this.trainingModel.findByIdAndUpdate(
      id,
      trainingType,
      {
        new: true,
        runValidators: true
      }
    );

    if (!training) {
      throw new TrainingNotFoundException();
    }

    return training;
  }

  async remove(id: string): Promise<Training> {
    const training: Training = await this.trainingModel.findByIdAndDelete(id);
    if (!training) {
      throw new TrainingNotFoundException();
    }
    return training;
  }
}
