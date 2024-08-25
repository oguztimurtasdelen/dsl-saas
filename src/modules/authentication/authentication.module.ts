import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserprofileModule } from '../userprofile/userprofile.module';



@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserprofileModule
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService
  ],
})
export class AuthenticationModule {}
