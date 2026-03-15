import { Types } from "mongoose";
import { CreateTrainingDto } from "./dto/create-training.dto";
import { UpdateTrainingDto } from "./dto/update-training.dto";
import { TrainingType } from "./training.type";
import { TrainingTypeEnum } from "src/customs/utils/trainingType.enum";

export class TrainingMapper {
    static convertTrainingDtoToType(dto: CreateTrainingDto | UpdateTrainingDto): TrainingType {
        return <TrainingType>{
            profile: new Types.ObjectId(dto.profile),
            device: new Types.ObjectId(dto.device),
            trainingType: TrainingTypeEnum[dto.trainingType],
            trainingProgram: dto.trainingProgram,
            trainingStatus: dto.trainingStatus
        };
    }
}