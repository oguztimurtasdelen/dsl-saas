import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorLog } from './error-log.schema';

@Injectable()
export class ErrorLogService {
  constructor(
    @InjectModel(ErrorLog.name)
    private readonly errorLogModel: Model<ErrorLog>,
  ) {}

  async createFromException(payload: {
    exception: any;
    request?: any;
    statusCode?: number;
    response?: any;
    user?: any;
  }): Promise<ErrorLog> {
    const message = this.extractMessage(payload.exception, payload.response);
    const stack = payload.exception?.stack ?? null;

    const errorEntry = await this.errorLogModel.create({
      message,
      stack,
      statusCode: payload.statusCode ?? 500,
      code: payload.response?.code ?? 'INTERNAL_SERVER_ERROR',
      method: payload.request?.method ?? null,
      path: payload.request?.originalUrl ?? payload.request?.url ?? null,
      userId: payload.user?.id ?? payload.user?._id ?? payload.request?.user?.id ?? null,
      profileId: payload.request?.user?.profileId ?? null,
      ipAddress: payload.request?.ip ?? null,
      userAgent: payload.request?.headers?.['user-agent'] ?? null,
      severity: 'error',
      metadata: {
        body: payload.request?.body ?? null,
        query: payload.request?.query ?? null,
      },
    });

    return errorEntry;
  }

  private extractMessage(exception: any, response: any): string {
    if (exception?.message) {
      return exception.message;
    }

    if (response?.message) {
      return typeof response.message === 'string' ? response.message : JSON.stringify(response.message);
    }

    return 'Unhandled error';
  }
}
