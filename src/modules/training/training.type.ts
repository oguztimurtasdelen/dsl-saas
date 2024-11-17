import { Types } from "mongoose"
import { ReflexTrainingDto } from "./dto/reflex-training.dto";


export type TrainingType = {
    profile: Types.ObjectId;
    device: Types.ObjectId;
    trainingProgram: ReflexTrainingDto[];
    trainingResult: ReflexTrainingDto[];
    status: string;
}