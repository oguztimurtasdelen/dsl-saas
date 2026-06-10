import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/customs/exceptions/app.exception';
import { DeviceErrors } from '../constants/device-error';

export class DeviceNotFoundException extends AppException {
    constructor() {
        super(
            DeviceErrors.NOT_FOUND.code,
            DeviceErrors.NOT_FOUND.message,
            HttpStatus.NOT_FOUND
        );
    }
}