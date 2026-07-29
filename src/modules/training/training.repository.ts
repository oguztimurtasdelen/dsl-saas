import { Injectable } from "node_modules/@nestjs/common";
import { InjectModel } from "node_modules/@nestjs/mongoose/dist";
import { Training } from "./training.schema";
import { FilterQuery, Model } from "mongoose";
import { TrainingType } from "./training.type";
import { GetTrainingsQueryDto } from "./dto/get-trainings-query.dto";

@Injectable()
export class TrainingRepository {
    constructor(
        @InjectModel(Training.name)
        private readonly trainingModel: Model<Training>,
    ) {}

    async findAll(query: GetTrainingsQueryDto, filter: FilterQuery<Training>): Promise<[Training[], number]> {
        const [trainingList, totalTrainingCount]: [Training[], number] = await Promise.all([
            this.trainingModel
            .find(filter)
            .sort({ createdAt: -1 }) // Sort by creation date (newest first)
            .skip( (query.page - 1) * query.limit)
            .limit(query.limit)
            .exec(),

            this.trainingModel.countDocuments(filter).exec()
        ]);

        return [trainingList, totalTrainingCount];
    }

    async findOne(id: string): Promise<Training> {
        return await this.trainingModel.findById(id).exec();
    }

    async create(training: TrainingType): Promise<Training> {
        return await this.trainingModel.create(training);
    }

    async update(id: string, training: TrainingType): Promise<Training> {
        return await this.trainingModel.findByIdAndUpdate(
            id,
            training,
            {
                new: true,
                runValidators: true
            }
        );
    }

    async remove(id: string): Promise<Training> {
        return await this.trainingModel.findByIdAndDelete(id);
    }
}