import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter
{
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const response = exception instanceof HttpException ? exception.getResponse() : null;

    res.status(status).json({
      success: false,
      statusCode: status,
      message: (response as any)?.message || 'Internal server error',
      code: (response as any)?.code || 'INTERNAL_SERVER_ERROR',
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}