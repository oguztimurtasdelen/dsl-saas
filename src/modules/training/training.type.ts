import { Types } from "mongoose"
import { ReflexTrainingDto } from "./training-types/reflex/dto/reflex.program.dto";
import { TrainingTypeEnum } from "src/modules/training/enums/trainingType.enum";
import { TrainingStatusEnum } from "src/modules/training/enums/trainingStatus.enum";
import { ReflexTrainingResultDto } from "./training-types/reflex/dto/reflex.result.dto";


export type TrainingType = {
    profile: Types.ObjectId;
    device: Types.ObjectId;
    trainingType: TrainingTypeEnum
    trainingStatus: TrainingStatusEnum;
    trainingProgram: any;
    trainingResult: any;
}