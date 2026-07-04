import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';
import { ErrorLogService } from '../../modules/error-log/error-log.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly errorLogService: ErrorLogService) {}

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const response = exception instanceof HttpException ? exception.getResponse() : null;

    try {
      await this.errorLogService.createFromException({
        exception,
        request: req,
        statusCode: status,
        response: response as any,
      });
    } catch (error) {
      console.error('Failed to persist application error:', error);
    }

    res.status(status).json({
      success: false,
      statusCode: status,
      message: (response as any)?.message || 'Internal server error',
      code: (response as any)?.code || 'INTERNAL_SERVER_ERROR',
      errors: (response as any)?.errors || null,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}