import { IsBoolean, IsDateString, IsDefined, IsEnum, IsNotEmpty, ValidateNested } from "class-validator";
import { Types } from "mongoose";
import { ReflexTrainingDto } from "../training-types/reflex/dto/reflex.program.dto";
import { Type } from "class-transformer";
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

    @IsDefined()
    trainingProgram: any;

}
