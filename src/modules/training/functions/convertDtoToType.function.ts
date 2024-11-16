import { CreateTrainingDto } from "../dto/create-training.dto";
import { UpdateTrainingDto } from "../dto/update-training.dto";
import { TrainingType } from "../training.type";


export function convertTrainingDtoToType(trainingDto: CreateTrainingDto | UpdateTrainingDto): TrainingType {
    return <TrainingType>{
        profile: trainingDto.profile,
        device: trainingDto.device,
        trainingProgram: trainingDto.trainingProgram,
        status: trainingDto.status
    }
}