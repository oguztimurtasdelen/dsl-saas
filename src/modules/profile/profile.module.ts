import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Profile, ProfileSchema } from './profile.schema';
import { ProfileRepository } from './profile.repository';


@Module({
  imports: [
    MongooseModule.forFeature([{name: Profile.name, schema: ProfileSchema}])
  ],
  controllers: [
    ProfileController
  ],
  providers: [
    ProfileService,
    ProfileRepository
  ],
  exports: [
    ProfileService
  ]
})
export class ProfileModule {}