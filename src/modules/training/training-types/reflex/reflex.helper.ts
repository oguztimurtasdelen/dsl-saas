import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { TrainingHandler } from "../../training.contracts";
import { ReflexTrainingDto } from "./dto/reflex.program.dto";
import { ReflexTrainingResultDto } from "./dto/reflex.result.dto";
import { BadRequestException } from "@nestjs/common";
import { TrainingProgramInvalidException } from "../../exceptions/training-program-invalid.exception";
import { TrainingResultInvalidException } from "../../exceptions/training-result-invalid.exception";
import { ReflexTrainingMetricsDto } from "./dto/reflex.metrics.dto";

export class ReflexTrainingHandler implements TrainingHandler {

    getHandlerName(): string {
        return 'ReflexTrainingHandler';
    }

    validateTrainingProgram(trainingProgram: ReflexTrainingDto[]): void {
        const _trainingProgram = trainingProgram.map(item => plainToInstance(ReflexTrainingDto, item));
        const errors = _trainingProgram.flatMap(item => validateSync(item, { 
            whitelist: true, 
            forbidNonWhitelisted: true,
            skipMissingProperties: false
        }));

        if (errors.length > 0) {
            throw new TrainingProgramInvalidException();
        }
    }

    validateTrainingResult(trainingResult: ReflexTrainingResultDto[]): void {
        if (!trainingResult) return;

        const _trainingResult = trainingResult.map(item => plainToInstance(ReflexTrainingResultDto, item));
        const errors = _trainingResult.flatMap(item => validateSync(item, { 
            whitelist: true, 
            forbidNonWhitelisted: true,
            skipMissingProperties: false
        }));

        if (errors.length > 0) {
            throw new TrainingResultInvalidException();
        }
    }

    calculateResult(trainingResult: ReflexTrainingResultDto[]): ReflexTrainingMetricsDto {
        if (!trainingResult) return null;

        const success = trainingResult.filter(r => r.isSuccess).length;
        const total = trainingResult.length;

        return<ReflexTrainingMetricsDto>{
            total:total,
            success: success,
            fail: total - success,
            averageReactionTime: total === 0 ? 0 : trainingResult.reduce((a, b) => a + b.actionTime, 0) / total
        };
    }
}