import { ShortPassTrainingDto } from "./dto/shortpass.program.dto";
import { ShortPassTrainingResultDto } from "./dto/shortpass.result.dto";


export class ShortPassTrainingHandler {

    buildProgram(trainingProgram: any): ShortPassTrainingDto[] {
        console.log(trainingProgram);
        console.log(typeof trainingProgram);
        console.log(Array.isArray(trainingProgram));

        return trainingProgram.map(item => ({
            sensorNo: item.sensorNo,
            duration: item.duration
        }));
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

    getHandlerName(): string {
        return 'ShortPassTrainingHandler';
    }
}