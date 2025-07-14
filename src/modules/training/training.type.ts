import { Types } from "mongoose"
import { ReflexTrainingDto } from "./dto/reflex-training.dto";
import { TrainingTypeEnum } from "src/customs/utils/trainingType.enum";
import { TrainingStatusEnum } from "src/customs/utils/trainingStatus.enum";


export type TrainingType = {
    profile: Types.ObjectId;
    device: Types.ObjectId;
    trainingType: TrainingTypeEnum
    trainingProgram: ReflexTrainingDto[];
    trainingStatus: TrainingStatusEnum;
}