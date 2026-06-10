import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/customs/exceptions/app.exception';
import { TrainingErrors } from '../constants/training-error';

export class TrainingCancelledException extends AppException {
    constructor() {
        super(
            TrainingErrors.CANCELLED.code,
            TrainingErrors.CANCELLED.message,
            HttpStatus.CONFLICT
        );
    }
}