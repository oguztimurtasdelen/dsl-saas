import { ErrorLogService } from './error-log.service';

describe('ErrorLogService', () => {
  it('should persist an error entry with normalized metadata', async () => {
    const create = jest.fn().mockResolvedValue({ _id: 'error-1' });
    const service = new ErrorLogService({ create } as any);

    await service.createFromException({
      exception: new Error('boom'),
      request: {
        method: 'GET',
        originalUrl: '/health',
        ip: '127.0.0.1',
        headers: {
          'user-agent': 'jest',
        },
      } as any,
      statusCode: 500,
      response: {
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      },
    });

    expect(create).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'boom',
        method: 'GET',
        path: '/health',
        statusCode: 500,
        code: 'INTERNAL_SERVER_ERROR',
      }),
    );
  });
});
