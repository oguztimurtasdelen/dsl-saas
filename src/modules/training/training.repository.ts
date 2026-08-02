import { Injectable } from "node_modules/@nestjs/common";
import { InjectModel } from "node_modules/@nestjs/mongoose/dist";
import { Training } from "./training.schema";
import { FilterQuery, Model, Types } from "mongoose";
import { TrainingType } from "./training.type";
import { GetTrainingsQueryDto } from "./dto/get-trainings-query.dto";
import { TrainingStatusEnum } from "./enums/trainingStatus.enum";

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

    async findAllForTrainingLevel(profile: string, trainingType: string): Promise<any[]> {
        const groupedTrainings = await this.trainingModel.aggregate([
            {
                $match: {
                    profile: new Types.ObjectId(profile),
                    trainingType: trainingType,
                    trainingStatus: { $nin: [TrainingStatusEnum.CANCELLED, TrainingStatusEnum.ERROR] }, //Find all but cancelled and error ones
                },
            },
            {
                $sort: {
                    trainingLevel: 1,
                    createdAt: 1,
                },
            },
            {
                $group: {
                    _id: "$trainingLevel",

                    trainings: {
                        $push: {
                            _id: "$_id",
                            trainingStatus: "$trainingStatus",
                            trainingMetrics: "$trainingMetrics",
                            createdAt: "$createdAt",
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    trainingLevel: "$_id",
                    trainings: 1,
                },
            },
            
        ]);

        return groupedTrainings;
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