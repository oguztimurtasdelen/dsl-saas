import { Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsNumber, ValidateNested } from "class-validator";
import { TrainingTypeEnum } from "src/customs/utils/trainingType.enum";
import { ReflexTrainingDto } from "src/modules/training/reflex/dto/reflex-training.dto";

export class CreateTrainingLevelDto {
    @IsNotEmpty({message: "trainingType cannot be empty!"})
    @IsEnum(TrainingTypeEnum, {message: "trainingType is not valid!"})
    trainingType: TrainingTypeEnum;

    @IsNumber()
    trainingLevel: number;

    @ValidateNested()
    @Type(() => ReflexTrainingDto)
    trainingProgram: ReflexTrainingDto[]
}