import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class ReflexTrainingDto {
    @IsNotEmpty({message: 'sensorNo cannot be empty!'})
    @IsNumber({}, {message: 'sensorNo must be a number!'})
    sensorNo: number;

    @IsNotEmpty({message: 'duration cannot be empty!'})
    @IsNumber({}, {message: 'duration must be a number!'})
    duration: number;
    
    @IsOptional()
    @IsNumber({}, {message: 'actionTime must be a number!'})
    actionTime: number;
    
    @IsOptional()
    @IsBoolean({message: 'isSuccess is not valid!'})
    isSuccess: boolean;
}