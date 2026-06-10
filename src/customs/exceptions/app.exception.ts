import { HttpException, HttpStatus } from '@nestjs/common';

export abstract class AppException extends HttpException {
    constructor(
        public readonly code: string,
        public readonly message: string,
        status: HttpStatus,
    ) {
        super({code, message}, status);
    }
}