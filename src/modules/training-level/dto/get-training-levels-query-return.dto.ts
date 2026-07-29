import { TrainingLevel } from "../training-level.schema";
import { GetTrainingLevelsQueryDto } from "./get-training-levels-query.dto";

export class GetTrainingLevelsQueryReturnDto {
    trainingLevels: TrainingLevel[];
    pagination: GetTrainingLevelsQueryDto;
    total: number;
    totalPages: number;
}