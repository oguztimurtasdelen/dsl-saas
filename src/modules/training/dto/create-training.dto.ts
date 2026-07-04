import { IsDefined, IsEnum, IsNotEmpty, IsOptional, ValidateIf } from "class-validator";
import { Types } from "mongoose";
import { TrainingTypeEnum } from "src/modules/training/enums/trainingType.enum";
import { TrainingStatusEnum } from "src/modules/training/enums/trainingStatus.enum";

export class CreateTrainingDto {
    @IsNotEmpty({message: "profileId cannot be empty"})
    profile: Types.ObjectId;

    @IsNotEmpty({message: "deviceId cannot be empty"})
    device: Types.ObjectId;

    @IsNotEmpty({message: "trainingType cannot be empty!"})
    @IsEnum(TrainingTypeEnum, {message: 'trainingType is not valid!'})
    trainingType: TrainingTypeEnum;

    @IsNotEmpty({message: "trainingStatus cannot be empty!"})
    @IsEnum(TrainingStatusEnum, {message: 'trainingStatus is not valid'})
    trainingStatus: TrainingStatusEnum;

    @IsNotEmpty({message: "trainingProgram cannot be empty!"})
    trainingProgram: any;

    @ValidateIf((dto) => dto.trainingStatus === TrainingStatusEnum.COMPLETED) // Only validate trainingResult if trainingStatus is COMPLETED
    @IsDefined()
    trainingResult: any;

}
