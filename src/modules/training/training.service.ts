import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { TrainingType } from './training.type';
import { InjectModel } from '@nestjs/mongoose';
import { Training } from './training.schema';
import { Model } from 'mongoose';
import { TrainingMapper } from './training.mapper';
import { GetTrainingsQueryDto } from './dto/get-trainings-query.dto';
import { GetTrainingsQueryReturnDto } from './dto/get-trainings-query-return.dto';

@Injectable()
export class TrainingService {

  constructor(
    @InjectModel(Training.name)
    private readonly trainingModel: Model<Training> 
  ){}

  async findAll(query: GetTrainingsQueryDto): Promise<GetTrainingsQueryReturnDto | HttpException> {
    try {
      const skip = (query.page - 1) * query.limit;
      const filter: any = {
        trainingType: query.trainingType, 
        trainingStatus: query.trainingStatus
      };
      
      const [trainings, total] = await Promise.all([
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
        
    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Failed to retrieve trainings' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<Training> {
    return await this.trainingModel.findById(id)
  }

  async create(createTrainingDto: CreateTrainingDto): Promise<Training> {
    const trainingType: TrainingType = TrainingMapper.convertTrainingDtoToType(createTrainingDto);
    const _training = await this.trainingModel.create(trainingType);

    return _training;
  }

  async update(id: string, updateTrainingDto: UpdateTrainingDto): Promise<Training> {
    const trainingType: TrainingType = TrainingMapper.convertTrainingDtoToType(updateTrainingDto);
    return await this.trainingModel.findByIdAndUpdate(
      id,
      trainingType,
      {
        new: true,
        runValidators: true
      }
    )
  }

  async remove(id: string): Promise<Training> {
    return await this.trainingModel.findByIdAndDelete(id);
  }
}
