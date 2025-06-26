import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, ValidateNested } from "class-validator";
import { Types } from "mongoose";
import { ReflexTrainingDto } from "./reflex-training.dto";
import { Type } from "class-transformer";
import { TrainingStatusEnum } from "src/customs/utils/trainingStatus.enum";

export class CreateTrainingDto {
    @IsNotEmpty({message: "profileId cannot be empty"})
    profile: Types.ObjectId;

    @IsNotEmpty({message: "deviceId cannot be empty"})
    device: Types.ObjectId;

    @ValidateNested()
    @Type(() => ReflexTrainingDto)
    trainingProgram: ReflexTrainingDto[];

    @IsNotEmpty({message: "status cannot be empty!"})
    @IsEnum(TrainingStatusEnum, {message: 'status is not valid'})
    status: TrainingStatusEnum

}
