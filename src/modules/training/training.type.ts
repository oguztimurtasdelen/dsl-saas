import { Types } from "mongoose"
import { ReflexTrainingDto } from "./reflex/dto/reflex-training.dto";
import { TrainingTypeEnum } from "src/customs/utils/trainingType.enum";
import { TrainingStatusEnum } from "src/customs/utils/trainingStatus.enum";
import { ReflexTrainingResultDto } from "./reflex/dto/reflex-training-result.dto";


export type TrainingType = {
    profile: Types.ObjectId;
    device: Types.ObjectId;
    trainingType: TrainingTypeEnum
    trainingStatus: TrainingStatusEnum;
    trainingProgram: ReflexTrainingDto[];
    trainingResult: ReflexTrainingResultDto[];
}