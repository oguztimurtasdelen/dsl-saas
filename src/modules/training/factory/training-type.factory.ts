import { TrainingTypeNotExistException } from "../exceptions/training-type-not-exist.exception";
import { ReflexTrainingHandler } from "../reflex/reflex.helper";

export class TrainingTypeFactory {
    static getHandler(trainingType: string) {
        switch (trainingType) {
            case 'REFLEX':
                return new ReflexTrainingHandler();
            
            case 'PASS':
                break;
            
            default:
                throw new TrainingTypeNotExistException();
        }
    }
}