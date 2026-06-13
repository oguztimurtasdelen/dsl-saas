import { IsNotEmpty } from "class-validator";

export class GetTrainingLevelsQueryDto {
    @IsNotEmpty({message: "trainingType cannot be empty"})
    trainingType: string;
}