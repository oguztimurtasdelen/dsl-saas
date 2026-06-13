import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/customs/exceptions/app.exception';
import { ProfileErrors } from '../constants/profile-error';

export class ProfileNotCreatedYetException extends AppException {
    constructor() {
        super(
            ProfileErrors.NOT_CREATE_YET.code,
            ProfileErrors.NOT_CREATE_YET.message,
            HttpStatus.NOT_FOUND
        );
    }
}