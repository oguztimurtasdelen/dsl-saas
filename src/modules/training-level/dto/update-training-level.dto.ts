import { PartialType } from "@nestjs/swagger";
import { CreateTrainingLevelDto } from "./create-training-level.dto";
import { IsNotEmpty } from "class-validator";

export class UpdateTrainingLevelDto extends PartialType(CreateTrainingLevelDto) {
    @IsNotEmpty({message: "id cannot be empty!"})
    _id: string;
}