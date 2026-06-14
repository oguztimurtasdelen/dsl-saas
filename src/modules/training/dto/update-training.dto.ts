import { PartialType } from '@nestjs/swagger';
import { CreateTrainingDto } from './create-training.dto';
import { IsNotEmpty, ValidateIf, ValidateNested } from 'class-validator';
import { ReflexTrainingResultDto } from '../training-types/reflex/dto/reflex.result.dto';
import { Type } from "class-transformer";
import { TrainingStatusEnum } from 'src/modules/training/enums/trainingStatus.enum';
import { Types } from 'mongoose';

export class UpdateTrainingDto extends PartialType(CreateTrainingDto) {
    @IsNotEmpty({message: "id cannot be empty!"})
    _id: Types.ObjectId;

    trainingResult: any;
}
