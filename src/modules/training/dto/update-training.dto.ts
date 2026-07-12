import { PartialType } from '@nestjs/swagger';
import { CreateTrainingDto } from './create-training.dto';
import { IsDefined, IsEnum, IsInt, IsNotEmpty, IsOptional, Max, Min, ValidateIf } from 'class-validator';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';
import { TrainingStatusEnum } from '../enums/trainingStatus.enum';
import { TrainingTypeEnum } from '../enums/trainingType.enum';

export class UpdateTrainingDto extends PartialType(CreateTrainingDto) {
    @IsNotEmpty({message: "id cannot be empty!"})
    _id: Types.ObjectId;

    @IsNotEmpty({message: "profileId cannot be empty"})
    profile: Types.ObjectId;

    @ValidateIf((dto) => dto.trainingStatus in [TrainingStatusEnum.READY, TrainingStatusEnum.STARTED]) // Only validate device if training status in [READY, STARTED]
    @IsNotEmpty({ message: 'device cannot be empty when trainingStatus is READY' })
    device: Types.ObjectId;

    @IsNotEmpty({message: "trainingType cannot be empty!"})
    @IsEnum(TrainingTypeEnum, {message: 'trainingType is not valid!'})
    trainingType: TrainingTypeEnum;

    @IsNotEmpty({message: "trainingStatus cannot be empty!"})
    @IsEnum(TrainingStatusEnum, {message: 'trainingStatus is not valid'})
    trainingStatus: TrainingStatusEnum;

    @ValidateIf((dto) => dto.trainingProgram === null) // Only validate trainingLevel if trainingProgram is null
    @IsDefined()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(99)
    trainingLevel: number;

    @ValidateIf((dto) => dto.trainingStatus === TrainingStatusEnum.READY) // Only validate training program if trainingStatus is READY
    @IsNotEmpty({message: "trainingProgram cannot be empty when trainingStatus is READY!"})
    trainingProgram: any;

    @ValidateIf((dto) => dto.trainingStatus === TrainingStatusEnum.COMPLETED) // Only validate training result if trainingStatus is COMPLETED
    @IsNotEmpty({message: "trainingResult cannot be empty when trainingStatus is COMPLETED!"})
    trainingResult: any;

    @IsOptional()
    trainingMetrics: any;
}
