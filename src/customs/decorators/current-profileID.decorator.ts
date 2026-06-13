import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IAccessTokenPayload } from '../interfaces/accessTokenPayload.interface';

// It returns the pay load by catching the request.user from the jwt-auth.guard.
export const CurrentProfileID = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<{ user: IAccessTokenPayload }>();
    // The jwt-auth.guard adds the user(means that payload in the token as value of sub key) to the request object, so we can access it here.
    return request.user.sub;
  },
);
