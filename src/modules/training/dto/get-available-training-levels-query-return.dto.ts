import { TrainingStatusEnum } from "../enums/trainingStatus.enum";
import { TrainingTypeEnum } from "../enums/trainingType.enum";

export class GetAvailableTrainingLevelsQueryReturnDto {
    trainingType: TrainingTypeEnum;
    trainingLevel: number;
    isCompleted: boolean;
    isLocked: boolean;
}