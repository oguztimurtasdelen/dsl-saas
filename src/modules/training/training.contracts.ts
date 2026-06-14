import { TrainingTypeEnum } from "./enums/trainingType.enum";

export interface TrainingProgramBase {
    type: TrainingTypeEnum;
}

export interface TrainingResultBase {
    type: TrainingTypeEnum;
}