import { Types } from "mongoose";
import { CreateTrainingDto } from "./dto/create-training.dto";
import { UpdateTrainingDto } from "./dto/update-training.dto";
import { TrainingType } from "./training.type";
import { TrainingTypeEnum } from "src/modules/training/enums/trainingType.enum";
import { TrainingStatusEnum } from "src/modules/training/enums/trainingStatus.enum";

export class TrainingMapper {
    static convertTrainingDtoToType(dto: CreateTrainingDto | UpdateTrainingDto): TrainingType {
        return <TrainingType>{
            profile: dto.profile ? new Types.ObjectId(dto.profile) : dto.profile,
            device: dto.device ? new Types.ObjectId(dto.device) : dto.device,
            trainingType: TrainingTypeEnum[dto.trainingType],
            trainingStatus: TrainingStatusEnum[dto.trainingStatus],
            trainingProgram: dto.trainingProgram,
            trainingResult: dto.trainingResult //(dto as UpdateTrainingDto).trainingResult
        };
    }
}