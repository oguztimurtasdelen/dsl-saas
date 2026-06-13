import { Injectable } from "node_modules/@nestjs/common";
import { InjectModel } from "node_modules/@nestjs/mongoose/dist";
import { TrainingLevel } from "./training-level.schema";
import { Model } from "mongoose";
import { TrainingLevelNotFoundException } from "./exceptions/training-level-not-found.exception";
import { CreateTrainingLevelDto } from "./dto/create-training-level.dto";
import { TrainingLevelType } from "./training-level.type";
import { TrainingLevelMapper } from "./training-level.mapper";
import { UpdateTrainingLevelDto } from "./dto/update-training-level.dto";
import { GetTrainingLevelsQueryDto } from "./dto/get-training-levels-query.dto";

@Injectable()
export class TrainingLevelService {
    constructor(
        @InjectModel(TrainingLevel.name)
        private readonly trainingLevelModel: Model<TrainingLevel>
    ){}

    async findAll(query: GetTrainingLevelsQueryDto): Promise<TrainingLevel[]> {
        const trainingLevels: TrainingLevel[] = await this.trainingLevelModel.find({trainingType: query.trainingType}).select("-trainingProgram").exec();
        return trainingLevels;
    }

    async findOne(id: string): Promise<TrainingLevel> {
        const trainingLevel: TrainingLevel | null = await this.trainingLevelModel.findById(id).exec();
        if (!trainingLevel) {
            throw new TrainingLevelNotFoundException();
        }
        return trainingLevel;
    }

    async create(createTrainingLevelDto: CreateTrainingLevelDto): Promise<TrainingLevel> {
        const trainingLevelType: TrainingLevelType = TrainingLevelMapper.convertTrainingLevelDtoToType(createTrainingLevelDto);
        const trainingLevel: TrainingLevel = await this.trainingLevelModel.create(trainingLevelType);

        return trainingLevel;
    }

    async update(id: string, updateTrainingLevelDto: UpdateTrainingLevelDto): Promise<TrainingLevel> {
        const trainingLevelType: TrainingLevelType = TrainingLevelMapper.convertTrainingLevelDtoToType(updateTrainingLevelDto);
        const trainingLevel: TrainingLevel = await this.trainingLevelModel.findByIdAndUpdate(
            id,
            trainingLevelType,
            {
                new: true,
                runValidators: true
            }
        );

        if (!trainingLevel) {
            throw new TrainingLevelNotFoundException();
        }
        return trainingLevel;
    }

    async remove(id: string): Promise<TrainingLevel> {
        const trainingLevel: TrainingLevel = await this.trainingLevelModel.findByIdAndDelete(id);
        if (!trainingLevel) {
            throw new TrainingLevelNotFoundException();
        }
        return trainingLevel;
    }
}