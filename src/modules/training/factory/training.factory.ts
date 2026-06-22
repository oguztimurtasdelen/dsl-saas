import { TrainingTypeEnum } from "../enums/trainingType.enum";
import { TrainingTypeNotExistException } from "../exceptions/training-type-not-exist.exception";
import { TrainingHandler } from "../training.contracts";

export class TrainingFactory {
    
    private static handlers = new Map<TrainingTypeEnum, TrainingHandler>();

    static register(type: TrainingTypeEnum, handler: TrainingHandler) {
        this.handlers.set(type, handler);
    }

    static get(type: TrainingTypeEnum): TrainingHandler {
        const handler = this.handlers.get(type);

        if (!handler) {
            throw new TrainingTypeNotExistException();
        }

        return handler;
    }
}