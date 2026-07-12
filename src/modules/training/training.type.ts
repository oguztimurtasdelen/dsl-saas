import { Types } from "mongoose"
import { TrainingTypeEnum } from "src/modules/training/enums/trainingType.enum";
import { TrainingStatusEnum } from "src/modules/training/enums/trainingStatus.enum";


export type TrainingType = {
    profile: Types.ObjectId;
    device: Types.ObjectId;
    trainingType: TrainingTypeEnum
    trainingStatus: TrainingStatusEnum;
    trainingLevel: number;
    trainingProgram: any;
    trainingResult: any;
    trainingMetrics: any;
}