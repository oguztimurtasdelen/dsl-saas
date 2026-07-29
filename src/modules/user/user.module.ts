import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { ProfileModule } from '../profile/profile.module';
import { UserRepository } from './user.repository';


@Module({
  imports: [
    ProfileModule,
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserService,
    UserRepository
  ],
  exports: [
    UserService
  ]
})
export class UserModule {}
