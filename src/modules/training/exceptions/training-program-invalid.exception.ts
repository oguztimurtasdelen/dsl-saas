import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/customs/exceptions/app.exception';
import { TrainingErrors } from '../constants/training-error';

export class TrainingProgramInvalidException extends AppException {
    constructor() {
        super(
            TrainingErrors.TRAINING_PROGRAM_INVALID.code,
            TrainingErrors.TRAINING_PROGRAM_INVALID.message,
            HttpStatus.BAD_REQUEST
        );
    }
}