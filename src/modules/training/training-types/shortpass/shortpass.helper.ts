import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { TrainingHandler } from "../../training.contracts";
import { ShortPassTrainingDto } from "./dto/shortpass.program.dto";
import { ShortPassTrainingResultDto } from "./dto/shortpass.result.dto";
import { BadRequestException } from "@nestjs/common";


export class ShortPassTrainingHandler implements TrainingHandler {

    getHandlerName(): string {
        return 'ShortPassTrainingHandler';
    }

    validateTrainingProgram(trainingProgram: ShortPassTrainingDto[]): void {
        const program = trainingProgram.map(item => plainToInstance(ShortPassTrainingDto, item));
        const errors = program.flatMap(item => validateSync(item, { 
            whitelist: true, 
            forbidNonWhitelisted: true,
            skipMissingProperties: false
        }));

        if (errors.length > 0) {
            throw new BadRequestException({code: 'VALIDATION_ERROR', message: 'Validation failed for ShortPassTrainingDto', errors});
        }
    }

    validateTrainingResult(trainingResult: ShortPassTrainingResultDto[]): void {
        const program = trainingResult.map(item => plainToInstance(ShortPassTrainingResultDto, item));
        const errors = program.flatMap(item => validateSync(item, { 
            whitelist: true, 
            forbidNonWhitelisted: true,
            skipMissingProperties: false
        }));

        if (errors.length > 0) {
            throw new BadRequestException({code: 'VALIDATION_ERROR', message: 'Validation failed for ShortPassTrainingResultDto', errors});
        }
    }

    calculateResult(trainingResult: ShortPassTrainingResultDto[]) {
        const success = trainingResult.filter(r => r.isSuccess).length;

        return {
            total: trainingResult.length,
            success: success,
            fail: trainingResult.length - success,
            averageReactionTime: trainingResult.reduce((a, b) => a + b.actionTime, 0) / trainingResult.length
        }
    }
}