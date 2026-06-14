import { IsEnum, IsInt, IsOptional, Min } from 'class-validator';
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
    @IsEnum(TrainingTypeEnum, {message: 'trainingType is not valid'})
    trainingType?: string;

    @IsOptional()
    @IsEnum(TrainingStatusEnum, {message: 'trainingStatus is not valid'})
    trainingStatus?: string;
}