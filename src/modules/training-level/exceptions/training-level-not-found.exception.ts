import { AppException } from "src/customs/exceptions/app.exception";
import { TrainingLevelErrors } from "../constants/training-level-error";
import { HttpStatus } from "node_modules/@nestjs/common";

export class TrainingLevelNotFoundException extends AppException {
    constructor() {
        super(
            TrainingLevelErrors.NOT_FOUND.code,
            TrainingLevelErrors.NOT_FOUND.message,
            HttpStatus.NOT_FOUND
        );
    }
}