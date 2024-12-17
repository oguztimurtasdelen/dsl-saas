import { Injectable } from "@nestjs/common";
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Token'ı HTTP header'dan al
          secretOrKey: 'your-secret-key',  // JWT'yi doğrulamak için kullanılan secret key
        });
    }
    async validate(payload: any) {
        // Token doğrulandıktan sonra payload'dan kullanıcı bilgilerini al
        return { userId: payload.userId, profileId: payload.profileId, useremail: payload.useremail };
      }
}