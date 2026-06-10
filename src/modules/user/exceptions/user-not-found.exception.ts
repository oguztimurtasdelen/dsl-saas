import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/customs/exceptions/app.exception';
import { UserErrors } from '../constants/user-error';

export class UserNotFoundException extends AppException {
    constructor() {
        super(
            UserErrors.NOT_FOUND.code,
            UserErrors.NOT_FOUND.message,
            HttpStatus.NOT_FOUND
        );
    }
}