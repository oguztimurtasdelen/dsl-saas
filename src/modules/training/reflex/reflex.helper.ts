import { ReflexTrainingDto } from "./dto/reflex-training.dto";

export class ReflexTrainingHandler {

    buildProgram(trainingProgram: ReflexTrainingDto[]): ReflexTrainingDto[] {
        return trainingProgram.map(item => ({
            sensorNo: item.sensorNo,
            duration: item.duration
        }));
    }
}