import { Types } from "mongoose";
import { CreateTrainingDto } from "./dto/create-training.dto";
import { UpdateTrainingDto } from "./dto/update-training.dto";
import { TrainingType } from "./training.type";
import { TrainingTypeEnum } from "src/customs/utils/trainingType.enum";
import { TrainingStatusEnum } from "src/customs/utils/trainingStatus.enum";

export class TrainingMapper {
    static convertTrainingDtoToType(dto: CreateTrainingDto | UpdateTrainingDto): TrainingType {
        return <TrainingType>{
            profile: new Types.ObjectId(dto.profile),
            device: new Types.ObjectId(dto.device),
            trainingType: TrainingTypeEnum[dto.trainingType],
            trainingStatus: TrainingStatusEnum[dto.trainingStatus],
            trainingProgram: dto.trainingProgram
        };
    }
}