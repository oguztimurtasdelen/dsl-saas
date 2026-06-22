import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/customs/exceptions/app.exception';
import { TrainingErrors } from '../constants/training-error';

export class TrainingResultInvalidException extends AppException {
    constructor() {
        super(
            TrainingErrors.TRAINING_RESULT_INVALID.code,
            TrainingErrors.TRAINING_RESULT_INVALID.message,
            HttpStatus.BAD_REQUEST
        );
    }
}