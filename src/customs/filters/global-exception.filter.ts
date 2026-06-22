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
    console.log("Global Exception Filter catched: " + exception);
    console.log(exception);
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    
    // The log will be work if the cathced exception not belongs to HttpException, otherwise we can't see the whats going on the backgorund.
    exception instanceof HttpException ? null : console.log('This log created by GlobalExceptionFilter because of the system faced exception different than HttpException. Here is your exception which is handled by generic handler. Exception: ', exception) ;
    
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const response = exception instanceof HttpException ? exception.getResponse() : null;
    
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