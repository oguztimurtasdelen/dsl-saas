import { Module } from '@nestjs/common';
import { UserprofileService } from './userprofile.service';
import { UserprofileController } from './userprofile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserProfile, userProfileSchema } from './userprofile.schema';

@Module({
  imports: [MongooseModule.forFeature([{
    name: UserProfile.name,
    schema: userProfileSchema
  }])],
  controllers: [UserprofileController],
  providers: [UserprofileService],
  exports:[UserprofileService]
})
export class UserprofileModule {}
