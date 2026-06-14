import { ReflexTrainingDto } from "./dto/reflex.program.dto";
import { ReflexTrainingResultDto } from "./dto/reflex.result.dto";

export class ReflexTrainingHandler {

    buildProgram(trainingProgram: any): ReflexTrainingDto[] {
        console.log(trainingProgram);
        console.log(typeof trainingProgram);
        console.log(Array.isArray(trainingProgram));

        return trainingProgram.map(item => ({
            sensorNo: item.sensorNo,
            duration: item.duration
        }));
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

    getHandlerName(): string {
        return 'ReflexTrainingHandler';
    }
}