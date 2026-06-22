import { TrainingTypeEnum } from "./enums/trainingType.enum";

export interface TrainingProgramBase {
    type: TrainingTypeEnum;
}

export interface TrainingResultBase {
    type: TrainingTypeEnum;
}

export interface TrainingHandler {
    getHandlerName(): string;
    validateTrainingProgram(trainingProgram: any): void;
    validateTrainingResult(trainingResult: any): void;
    calculateResult(trainingResult: any): any;
}