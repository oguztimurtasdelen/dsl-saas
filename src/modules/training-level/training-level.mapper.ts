import { TrainingTypeEnum } from "src/customs/utils/trainingType.enum";
import { CreateTrainingLevelDto } from "./dto/create-training-level.dto";
import { UpdateTrainingLevelDto } from "./dto/update-training-level.dto";
import { TrainingLevelType } from "./training-level.type";

export class TrainingLevelMapper {
    static convertTrainingLevelDtoToType(dto: CreateTrainingLevelDto | UpdateTrainingLevelDto): TrainingLevelType {
        return <TrainingLevelType>{
            trainingType: TrainingTypeEnum[dto.trainingType],
            trainingLevel: dto.trainingLevel,
            trainingProgram: dto.trainingProgram
        }
    }
}