import { TrainingTypeEnum } from "src/customs/utils/trainingType.enum"
import { ReflexTrainingDto } from "../training/reflex/dto/reflex-training.dto";

export type TrainingLevelType = {
    trainingType: TrainingTypeEnum;
    trainingLevel: number;
    trainingProgram: ReflexTrainingDto[]
}