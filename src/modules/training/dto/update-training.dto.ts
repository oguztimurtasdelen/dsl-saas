import { PartialType } from '@nestjs/swagger';
import { CreateTrainingDto } from './create-training.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateTrainingDto extends PartialType(CreateTrainingDto) {
    @IsNotEmpty({message: "id cannot be empty!"})
    _id: string;
}
