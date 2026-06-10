import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/customs/exceptions/app.exception';
import { TrainingErrors } from '../constants/training-error';

export class TrainingNotFoundException extends AppException {
    constructor() {
        super(
            TrainingErrors.NOT_FOUND.code,
            TrainingErrors.NOT_FOUND.message,
            HttpStatus.NOT_FOUND
        );
    }
}