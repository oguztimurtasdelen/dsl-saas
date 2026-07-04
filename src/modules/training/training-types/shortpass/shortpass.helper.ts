import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { TrainingHandler } from "../../training.contracts";
import { ShortPassTrainingDto } from "./dto/shortpass.program.dto";
import { ShortPassTrainingResultDto } from "./dto/shortpass.result.dto";
import { BadRequestException } from "@nestjs/common";
import { TrainingProgramInvalidException } from "../../exceptions/training-program-invalid.exception";
import { TrainingResultInvalidException } from "../../exceptions/training-result-invalid.exception";


export class ShortPassTrainingHandler implements TrainingHandler {

    getHandlerName(): string {
        return 'ShortPassTrainingHandler';
    }

    validateTrainingProgram(trainingProgram: ShortPassTrainingDto[]): void {
        const _trainingProgram = trainingProgram.map(item => plainToInstance(ShortPassTrainingDto, item));
        const errors = _trainingProgram.flatMap(item => validateSync(item, { 
            whitelist: true, 
            forbidNonWhitelisted: true,
            skipMissingProperties: false
        }));

        if (errors.length > 0) {
            throw new TrainingProgramInvalidException();
        }
    }

    validateTrainingResult(trainingResult: ShortPassTrainingResultDto[]): void {
        if (!trainingResult) return;
        
        const _trainingResult = trainingResult.map(item => plainToInstance(ShortPassTrainingResultDto, item));
        const errors = _trainingResult.flatMap(item => validateSync(item, { 
            whitelist: true, 
            forbidNonWhitelisted: true,
            skipMissingProperties: false
        }));

        if (errors.length > 0) {
            throw new TrainingResultInvalidException();
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