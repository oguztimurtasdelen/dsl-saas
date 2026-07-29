import { IsEnum, IsInt, IsNumber, IsOptional, Min } from "class-validator";
import { Type } from 'class-transformer';
import { TrainingTypeEnum } from "src/modules/training/enums/trainingType.enum";

export class GetTrainingLevelsQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number;

    @IsEnum(TrainingTypeEnum, {message: 'Training type is not valid'})
    trainingType: TrainingTypeEnum;

    @IsOptional()
    @IsNumber()
    trainingLevel: number;
}