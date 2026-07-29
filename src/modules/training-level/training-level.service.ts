import { Injectable } from "node_modules/@nestjs/common";
import { TrainingLevel } from "./training-level.schema";
import { TrainingLevelNotFoundException } from "./exceptions/training-level-not-found.exception";
import { CreateTrainingLevelDto } from "./dto/create-training-level.dto";
import { TrainingLevelType } from "./training-level.type";
import { TrainingLevelMapper } from "./training-level.mapper";
import { UpdateTrainingLevelDto } from "./dto/update-training-level.dto";
import { GetTrainingLevelsQueryDto } from "./dto/get-training-levels-query.dto";
import { TrainingLevelRepository } from "./training-level.repository";
import { GetTrainingLevelsQueryReturnDto } from "./dto/get-training-levels-query-return.dto";
import { FilterQuery } from "mongoose";


@Injectable()
export class TrainingLevelService {
    constructor(
        private readonly trainingLevelRepository: TrainingLevelRepository,
    ){}

    async findAll(query: GetTrainingLevelsQueryDto): Promise<GetTrainingLevelsQueryReturnDto> {
        const filter: FilterQuery<TrainingLevel> = TrainingLevelMapper.getTrainingLevelFilterQuery(query);
        const [trainingLevelList, totalTrainingLevelCount]: [TrainingLevel[], number] = await this.trainingLevelRepository.findAll(query, filter);
        
        return <GetTrainingLevelsQueryReturnDto>{
            trainingLevels: trainingLevelList,
            pagination: query,
            total: totalTrainingLevelCount,
            totalPages: Math.ceil(totalTrainingLevelCount / query.limit),
        }
    }

    async findOne(id: string): Promise<TrainingLevel> {
        const _trainingLevel: TrainingLevel = await this.trainingLevelRepository.findOne(id);

        if (!_trainingLevel) {
            throw new TrainingLevelNotFoundException();
        }

        return _trainingLevel;
    }

    async findByTrainingTypeAndLevel(trainingType: string, trainingLevel: number): Promise<TrainingLevel> {
        const _trainingLevel: TrainingLevel = await this.trainingLevelRepository.findByTrainingTypeAndLevel(trainingType, trainingLevel);
        
        return _trainingLevel;
    }

    async create(createTrainingLevelDto: CreateTrainingLevelDto): Promise<TrainingLevel> {
        const trainingLevelType: TrainingLevelType = TrainingLevelMapper.convertTrainingLevelDtoToType(createTrainingLevelDto);
        const _trainingLevel: TrainingLevel = await this.trainingLevelRepository.create(trainingLevelType);

        return _trainingLevel;
    }

    async update(id: string, updateTrainingLevelDto: UpdateTrainingLevelDto): Promise<TrainingLevel> {
        const trainingLevelType: TrainingLevelType = TrainingLevelMapper.convertTrainingLevelDtoToType(updateTrainingLevelDto);
        const _trainingLevel: TrainingLevel = await this.trainingLevelRepository.update(id, trainingLevelType);

        if (!_trainingLevel) {
            throw new TrainingLevelNotFoundException();
        }

        return _trainingLevel;
    }

    async remove(id: string): Promise<TrainingLevel> {
        const _trainingLevel: TrainingLevel = await this.trainingLevelRepository.remove(id);

        return _trainingLevel;
    }
}