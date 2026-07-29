import { TrainingTypeEnum } from "src/modules/training/enums/trainingType.enum";
import { CreateTrainingLevelDto } from "./dto/create-training-level.dto";
import { UpdateTrainingLevelDto } from "./dto/update-training-level.dto";
import { TrainingLevelType } from "./training-level.type";
import { GetTrainingLevelsQueryDto } from "./dto/get-training-levels-query.dto";
import { FilterQuery } from "mongoose";
import { TrainingLevel } from "./training-level.schema";

export class TrainingLevelMapper {
    static convertTrainingLevelDtoToType(dto: CreateTrainingLevelDto | UpdateTrainingLevelDto): TrainingLevelType {
        return <TrainingLevelType>{
            trainingType: TrainingTypeEnum[dto.trainingType],
            trainingLevel: dto.trainingLevel,
            trainingProgram: dto.trainingProgram
        }
    }

    static getTrainingLevelFilterQuery(query: GetTrainingLevelsQueryDto): FilterQuery<TrainingLevel> {
        const _filter: FilterQuery<TrainingLevel> = {
            ...(query.trainingType && { trainingType: query.trainingType }),
            ...(query.trainingLevel && { trainingLevel: query.trainingLevel }),
        }

        return _filter;
    }
}