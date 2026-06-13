import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class ReflexTrainingResultDto {
    @IsNotEmpty({message: 'sensorNo cannot be empty!'})
    @IsNumber({}, {message: 'sensorNo must be a number!'})
    sensorNo: number;
    
    @IsNotEmpty({message: 'actionTime cannot be empty!'})
    @IsNumber({}, {message: 'actionTime must be a number!'})
    actionTime: number;
    
    @IsNotEmpty({message: 'isSuccess cannot be empty!'})
    @IsBoolean({message: 'isSuccess is not valid!'})
    isSuccess: boolean;
}