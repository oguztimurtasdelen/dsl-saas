import { TrainingTypeEnum } from "src/modules/training/enums/trainingType.enum"
import { ReflexTrainingDto } from "../training/training-types/reflex/dto/reflex.program.dto";

export type TrainingLevelType = {
    trainingType: TrainingTypeEnum;
    trainingLevel: number;
    trainingProgram: ReflexTrainingDto[]
}