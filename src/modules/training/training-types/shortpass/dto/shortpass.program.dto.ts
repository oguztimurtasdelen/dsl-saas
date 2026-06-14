import { IsBoolean, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class ShortPassTrainingDto {
    @IsNotEmpty({message: 'sensorNo cannot be empty!'})
    @IsNumber({}, {message: 'sensorNo must be a number!'})
    sensorNo: number;

    @IsNotEmpty({message: 'duration cannot be empty!'})
    @IsNumber({}, {message: 'duration must be a number!'})
    duration: number;
}