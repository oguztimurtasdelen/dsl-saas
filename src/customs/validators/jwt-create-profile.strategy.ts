import { Injectable } from "@nestjs/common";
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { ICreateProfileTokenPayload } from "../interfaces/createProfileTokenPayload.interface";


@Injectable()
export class JwtCreateProfileStrategy extends PassportStrategy(Strategy, 'jwt-create-profile'){
    // This strategy is used to validate the access token for access token not refresh token.
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Token'ı HTTP header'dan al
          secretOrKey: process.env.JWT_CREATEPROFILE_TOKEN_SECRET_KEY, // JWT'yi doğrulamak için kullanılan secret key 
          audience: 'dsl-ionic-app-user'
        });
    }
    // After the token is validated, this function is called to return the payload.
    async validate(payload: ICreateProfileTokenPayload) {
        return payload;
    }
}