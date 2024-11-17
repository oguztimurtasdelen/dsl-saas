import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsOptional } from "class-validator";

export class ReflexTrainingDto {
    @IsNotEmpty({message: 'sensorNo cannot be empty!'})
    sensorNo: number;

    @IsNotEmpty({message: 'duration cannot be empty!'})
    duration: number;
    
    @IsBoolean({message: 'isSuccess is not valid!'})
    @IsOptional()
    isSuccess: boolean;

}