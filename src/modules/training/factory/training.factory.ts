import { TrainingTypeEnum } from "../enums/trainingType.enum";
import { TrainingTypeNotExistException } from "../exceptions/training-type-not-exist.exception";
import { ReflexTrainingHandler } from "../training-types/reflex/reflex.helper";

export class TrainingFactory {
    
    private static handlers = new Map();

    static register(type: TrainingTypeEnum, handler: any) {
        this.handlers.set(type, handler);
    }

    static get(type: TrainingTypeEnum) {
        const handler = this.handlers.get(type);

        if (!handler) {
            throw new TrainingTypeNotExistException();
        }

        return handler;
    }
}