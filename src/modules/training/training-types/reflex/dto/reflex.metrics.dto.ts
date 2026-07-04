import { IsNotEmpty, IsNumber } from "class-validator";

export class ReflexTrainingMetricsDto {
    @IsNotEmpty({ message: 'total cannot be empty!' })
    @IsNumber({}, { message: 'total must be a number!' })
    total: number;

    @IsNotEmpty({ message: 'success cannot be empty!' })
    @IsNumber({}, { message: 'success must be a number!' })
    success: number;

    @IsNotEmpty({ message: 'fail cannot be empty!' })
    @IsNumber({}, { message: 'fail must be a number!' })
    fail: number;

    @IsNotEmpty({ message: 'averageReactionTime cannot be empty!' })
    @IsNumber({}, { message: 'averageReactionTime must be a number!' })
    averageReactionTime: number;
}