import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/customs/exceptions/app.exception';
import { ProfileErrors } from '../constants/profile-error';

export class ProfileNicknameTakenException extends AppException {
    constructor() {
        super(
            ProfileErrors.NICKNAME_TAKEN.code,
            ProfileErrors.NICKNAME_TAKEN.message,
            HttpStatus.CONFLICT
        );
    }
}