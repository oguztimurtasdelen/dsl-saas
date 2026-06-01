import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { ProfileModule } from '../profile/profile.module';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/customs/validators/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/user.schema';
import { ProfileSchema } from '../profile/profile.schema';

@Module({
  imports: [
    UserModule,
    ProfileModule,
    MongooseModule.forFeature([
      {name: 'User.name', schema: UserSchema},
      {name: 'Profile.name', schema: ProfileSchema}
    ]),
    // These are the default settings for the JwtModule, we aren't using them here because we have two different secret keys for access and refresh tokens
    JwtModule.register({}),
    
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtStrategy
  ],
})
export class AuthenticationModule {}
