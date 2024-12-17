import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { ProfileModule } from '../profile/profile.module';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/customs/validators/jwt.strategy';

@Module({
  imports: [
    ProfileModule,
    UserModule,
    JwtModule.register({
      secret: 'your-secret-key',
      signOptions: {expiresIn: '1h'},
    }),
    
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    JwtStrategy
  ],
})
export class AuthenticationModule {}
