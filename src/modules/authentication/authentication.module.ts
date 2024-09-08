import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { User } from '../user/user.schema';
import { ProfileModule } from '../profile/profile.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Authentication, AuthenticationSchema } from './authentication.schema';
import { UserModule } from '../user/user.module';



@Module({
  imports: [
    MongooseModule.forFeature([{name: Authentication.name, schema: AuthenticationSchema }]),
    ProfileModule,
    UserModule
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService
  ],
})
export class AuthenticationModule {}
