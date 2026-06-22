import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { TrainingHandler } from "../../training.contracts";
import { ReflexTrainingDto } from "./dto/reflex.program.dto";
import { ReflexTrainingResultDto } from "./dto/reflex.result.dto";
import { BadRequestException } from "@nestjs/common";

export class ReflexTrainingHandler implements TrainingHandler {

    getHandlerName(): string {
        return 'ReflexTrainingHandler';
    }

    validateTrainingProgram(trainingProgram: ReflexTrainingDto[]): void {
        const program = trainingProgram.map(item => plainToInstance(ReflexTrainingDto, item));
        const errors = program.flatMap(item => validateSync(item, { 
            whitelist: true, 
            forbidNonWhitelisted: true,
            skipMissingProperties: false
        }));

        if (errors.length > 0) {
            throw new BadRequestException({code: 'VALIDATION_ERROR', message: 'Validation failed for ReflexTrainingDto', errors});
        }
    }

    validateTrainingResult(trainingResult: ReflexTrainingResultDto[]): void {
        const program = trainingResult.map(item => plainToInstance(ReflexTrainingResultDto, item));
        const errors = program.flatMap(item => validateSync(item, { 
            whitelist: true, 
            forbidNonWhitelisted: true,
            skipMissingProperties: false
        }));

        if (errors.length > 0) {
            throw new BadRequestException({code: 'VALIDATION_ERROR', message: 'Validation failed for ReflexReflexTrainingResultDtoTrainingDto', errors});
        }
    }

    calculateResult(trainingResult: ReflexTrainingResultDto[]) {
        const success = trainingResult.filter(r => r.isSuccess).length;

        return {
            total: trainingResult.length,
            success: success,
            fail: trainingResult.length - success,
            averageReactionTime: trainingResult.reduce((a, b) => a + b.actionTime, 0) / trainingResult.length
        }
    }
}