import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/customs/exceptions/app.exception';
import { ProfileErrors } from '../constants/profile-error';

export class ProfileNotFoundException extends AppException {
    constructor() {
        super(
            ProfileErrors.NOT_FOUND.code,
            ProfileErrors.NOT_FOUND.message,
            HttpStatus.NOT_FOUND
        );
    }
}