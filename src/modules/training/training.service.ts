import { Injectable } from '@nestjs/common';
import { CreateTrainingDto } from './dto/create-training.dto';
import { UpdateTrainingDto } from './dto/update-training.dto';
import { TrainingType } from './training.type';
import { InjectModel } from '@nestjs/mongoose';
import { Training } from './training.schema';
import { Model } from 'mongoose';

@Injectable()
export class TrainingService {

  constructor(
    @InjectModel(Training.name)
    private readonly trainingModel: Model<Training> 
  ){}

 

  async findAll(): Promise<Training[]> {
    return await this.trainingModel.find().exec();
  }

  async findOne(id: string): Promise<Training> {
    return await this.trainingModel.findById(id)
  }

  async create(trainingType: TrainingType) {
    const _training = await this.trainingModel.create(trainingType);

    return _training;
  }

  async update(id: string, trainingType: TrainingType): Promise<Training> {
    return await this.trainingModel.findByIdAndUpdate(
      id,
      trainingType,
      {
        new: true,
        runValidators: true
      }
    )
  }

  async remove(id: string) {
    return await this.trainingModel.findByIdAndDelete(id);
  }
}
