import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/customs/exceptions/app.exception';
import { TrainingErrors } from '../constants/training-error';

export class TrainingAlreadyStartedException extends AppException {
    constructor() {
        super(
            TrainingErrors.ALREADY_STARTED.code,
            TrainingErrors.ALREADY_STARTED.message,
            HttpStatus.CONFLICT
        );
    }
}