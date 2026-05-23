import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// It returns the pay load by catching the request.user from the jwt-auth.guard.
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);