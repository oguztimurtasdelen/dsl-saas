import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
   canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();

    const token = req.headers.authorization?.replace('Bearer ', '');

    console.log('token:', req.headers);

    return super.canActivate(context);
    }
}