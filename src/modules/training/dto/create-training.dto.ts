import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, ValidateNested } from "class-validator";
import { Types } from "mongoose";
import { ReflexTrainingDto } from "./reflex-training.dto";
import { Type } from "class-transformer";
import { TrainingTypeEnum } from "src/customs/utils/trainingType.enum";
import { TrainingStatusEnum } from "src/customs/utils/trainingStatus.enum";

export class CreateTrainingDto {
    @IsNotEmpty({message: "profileId cannot be empty"})
    profile: Types.ObjectId;

    @IsNotEmpty({message: "deviceId cannot be empty"})
    device: Types.ObjectId;

    @IsNotEmpty({message: "trainingType cannot be empty!"})
    @IsEnum(TrainingTypeEnum, {message: 'trainingType    is not valid!'})
    trainingType: TrainingTypeEnum;

    @ValidateNested()
    @Type(() => ReflexTrainingDto)
    trainingProgram: ReflexTrainingDto[];

    @IsNotEmpty({message: "trainingStatus cannot be empty!"})
    @IsEnum(TrainingStatusEnum, {message: 'trainingStatus is not valid'})
    trainingStatus: TrainingStatusEnum

}
