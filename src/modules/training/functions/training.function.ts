import { TrainingTypeEnum } from "src/customs/utils/trainingType.enum";
import { CreateTrainingDto } from "../dto/create-training.dto";
import { UpdateTrainingDto } from "../dto/update-training.dto";
import { TrainingType } from "../training.type";
import { Types } from "mongoose";


export function convertTrainingDtoToType(trainingDto: CreateTrainingDto | UpdateTrainingDto): TrainingType {
    return <TrainingType>{
        profile: new Types.ObjectId(trainingDto.profile),
        device: new Types.ObjectId(trainingDto.device),
        trainingType: TrainingTypeEnum[trainingDto.trainingType],
        trainingProgram: trainingDto.trainingProgram,
        trainingStatus: trainingDto.trainingStatus
    }
}