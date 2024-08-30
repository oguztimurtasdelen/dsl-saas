import { Module } from '@nestjs/common';
import { UserprofileService } from './userprofile.service';
import { UserprofileController } from './userprofile.controller';
import { UserProfile, UserProfileSchema } from './userprofile.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{name: UserProfile.name, schema: UserProfileSchema}])],
  controllers: [UserprofileController],
  providers: [UserprofileService],
  exports: [UserprofileService]
})
export class UserprofileModule {}
