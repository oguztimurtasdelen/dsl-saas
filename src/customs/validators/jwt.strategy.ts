import { Injectable } from "@nestjs/common";
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    // This strategy is used to validate the access token for access token not refresh token.
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Token'ı HTTP header'dan al
          secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRET_KEY  // JWT'yi doğrulamak için kullanılan secret key,
        });
    }
    // After the token is validated, this function is called to return the payload.
    async validate(payload: any) {
        return payload;
    }
}