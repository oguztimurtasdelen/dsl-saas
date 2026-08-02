import { TrainingLevel } from "../training-level/training-level.schema";
import { GetAvailableTrainingLevelsQueryReturnDto } from "./dto/get-available-training-levels-query-return.dto";
import { Training } from "./training.schema";

export function getHelperName(): string {
    return 'training.helper';
}

export function getAvailableTrainingLevelsByTrainingType(
    trainingLevels: TrainingLevel[], 
    completedTrainings: Training[]
): GetAvailableTrainingLevelsQueryReturnDto[] {
    const completedLevels = new Set<number>(
        completedTrainings
            .map(training => training.trainingLevel)
            .filter((level): level is number => level !== null),
    );

    const availableLevels: GetAvailableTrainingLevelsQueryReturnDto[] = trainingLevels.map(level => {
        const isCompleted = completedLevels.has(level.trainingLevel);
        const isFirstLevel = level.trainingLevel === 1;
        const isPreviousLevelCompleted = isFirstLevel || completedLevels.has(level.trainingLevel -1);

        // A level is considered locked if:
        // - It is not completed
        // - The previous level is not completed (unless it's the first level)
        const isLocked = !isCompleted && !isPreviousLevelCompleted;

        return <GetAvailableTrainingLevelsQueryReturnDto>{
            trainingType: level.trainingType,
            trainingLevel: level.trainingLevel,
            isCompleted: isCompleted,
            isLocked: isLocked,
        };
    });
    
    return availableLevels;
};