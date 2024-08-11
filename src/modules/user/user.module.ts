import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './user.schema';
import { UserprofileModule } from '../userprofile/userprofile.module';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: userSchema
    }]),
    UserprofileModule
  ],
  controllers: [UserController],
  providers: [UserService,UserprofileModule],
})
export class UserModule {}
