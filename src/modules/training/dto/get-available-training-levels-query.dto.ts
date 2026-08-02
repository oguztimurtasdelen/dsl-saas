import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { TrainingTypeEnum } from "../enums/trainingType.enum";

export class GetAvailableTrainingLevelsQueryDto {
    @IsNotEmpty({message: 'Profile is required'})
    profile: string;

    @IsNotEmpty({message: 'Training type is required'})
    @IsEnum(TrainingTypeEnum, {message: 'Training type is not valid'})
    trainingType: TrainingTypeEnum;
}