import { IsEnum, IsInt, IsNotEmpty, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { TrainingStatusEnum } from 'src/modules/training/enums/trainingStatus.enum';
import { TrainingTypeEnum } from 'src/modules/training/enums/trainingType.enum';

export class GetTrainingsQueryDto {
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

    @IsOptional()
    profile: string;

    @IsOptional()
    @IsEnum(TrainingTypeEnum, {message: 'trainingType is not valid'})
    trainingType?: string;

    @IsOptional()
    @IsEnum(TrainingStatusEnum, {message: 'trainingStatus is not valid'})
    trainingStatus?: TrainingStatusEnum;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(99)
    trainingLevel?: number;

    @IsOptional()
    createdAt?: string;
}