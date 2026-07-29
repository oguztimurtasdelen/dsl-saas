import { Injectable } from "node_modules/@nestjs/common";
import { InjectModel } from "node_modules/@nestjs/mongoose/dist";
import { TrainingLevel } from "./training-level.schema";
import { FilterQuery, Model } from "mongoose";
import { GetTrainingLevelsQueryDto } from "./dto/get-training-levels-query.dto";
import { TrainingLevelType } from "./training-level.type";

@Injectable()
export class TrainingLevelRepository {
    constructor(
        @InjectModel(TrainingLevel.name)
        private readonly trainingLevelModel: Model<TrainingLevel>,
    ) {}

    async findAll(query: GetTrainingLevelsQueryDto, filter: FilterQuery<TrainingLevel>): Promise<[TrainingLevel[], number]> {
        const [trainingLevelList, totalTrainingLevelCount]: [TrainingLevel[], number] = await Promise.all([
            this.trainingLevelModel
            .find(filter)
            .select("trainingType trainingLevel -_id")
            .sort({ trainingLevel: 1 })
            .exec(),

            this.trainingLevelModel.countDocuments(filter).exec()
        ]);
        
        return [trainingLevelList, totalTrainingLevelCount];
    }

    async findOne(id: string): Promise<TrainingLevel> {
        return this.trainingLevelModel.findById(id).exec();
    }

    async findByTrainingTypeAndLevel(trainingType: string, trainingLevel: number): Promise<TrainingLevel> {
        return this.trainingLevelModel.findOne({trainingType: trainingType, trainingLevel: trainingLevel }).exec();
    }

    async create(trainingLevelType: TrainingLevelType): Promise<TrainingLevel> {
        return await this.trainingLevelModel.create(trainingLevelType);
    }

    async update(id: string, trainingLevelType: TrainingLevelType): Promise<TrainingLevel> {
        return this.trainingLevelModel.findByIdAndUpdate(
            id,
            trainingLevelType,
            {
                new: true,
                runValidators: true
            }
        );
    }

    async remove(id: string): Promise<TrainingLevel> {
        return this.trainingLevelModel.findByIdAndDelete(id);
    }
}