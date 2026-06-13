import { PartialType } from '@nestjs/swagger';
import { CreateTrainingDto } from './create-training.dto';
import { IsNotEmpty, ValidateIf, ValidateNested } from 'class-validator';
import { ReflexTrainingResultDto } from '../reflex/dto/reflex-training-result.dto';
import { Type } from "class-transformer";
import { TrainingStatusEnum } from 'src/customs/utils/trainingStatus.enum';
import { Types } from 'mongoose';

export class UpdateTrainingDto extends PartialType(CreateTrainingDto) {
    @IsNotEmpty({message: "id cannot be empty!"})
    _id: Types.ObjectId;

    @ValidateNested()
    @Type(() => ReflexTrainingResultDto)
    trainingResult: ReflexTrainingResultDto[];
}
