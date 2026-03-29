import { Injectable } from "@nestjs/common";
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Token'ı HTTP header'dan al
          secretOrKey: process.env.JWT_SECRET_KEY || 'dsl_jwt_secret_key',  // JWT'yi doğrulamak için kullanılan secret key
        });
    }
}