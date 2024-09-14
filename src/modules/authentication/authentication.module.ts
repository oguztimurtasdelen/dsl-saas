import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { ProfileModule } from '../profile/profile.module';
import { UserModule } from '../user/user.module';



@Module({
  imports: [
    ProfileModule,
    UserModule
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService
  ],
})
export class AuthenticationModule {}
