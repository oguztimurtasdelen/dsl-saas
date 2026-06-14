import { TrainingTypeEnum } from "../enums/trainingType.enum";
import { TrainingFactory } from "../factory/training.factory";
import { ReflexTrainingHandler } from "../training-types/reflex/reflex.helper";
import { ShortPassTrainingHandler } from "../training-types/shortpass/shortpass.helper";

export class TrainingRegistry {
    static registerAll() {
        TrainingFactory.register(
            TrainingTypeEnum.REFLEX,
            new ReflexTrainingHandler()
        );

        TrainingFactory.register(
            TrainingTypeEnum.SHORTPASS,
            new ShortPassTrainingHandler()
        );
    }
}