import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/customs/exceptions/app.exception';
import { TrainingErrors } from '../constants/training-error';

export class TrainingTypeNotExistException extends AppException {
    constructor() {
        super(
            TrainingErrors.TYPE_NOT_EXIST.code,
            TrainingErrors.TYPE_NOT_EXIST.message,
            HttpStatus.CONFLICT
        );
    }
}