import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtCreateProfileGuard extends AuthGuard('jwt-create-profile') {
    canActivate(context: ExecutionContext) {
          const req = context.switchToHttp().getRequest();
          const token = req.headers.authorization?.replace('Bearer ', '');
          if (!token) {
            throw new UnauthorizedException({
              statusCode: 401,
              code: 'NO_TOKEN',
            }); 
          }
          return super.canActivate(context);
      }
    
      handleRequest(err, user, info) {

        if (err || !user) {
          let code = 'UNAUTHORIZED';          
          if (info?.name === 'TokenExpiredError') {
            code = 'TOKEN_EXPIRED';
          }
          
          if (info?.name === 'JsonWebTokenError') {
            code = 'INVALID_TOKEN';
          }
        
          throw new UnauthorizedException({
            statusCode: 401,
            code,
          });
        }
        return user;
      }
}