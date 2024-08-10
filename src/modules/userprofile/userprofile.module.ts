import { Module } from '@nestjs/common';
import { UserprofileService } from './userprofile.service';
import { UserprofileController } from './userprofile.controller';

@Module({
  controllers: [UserprofileController],
  providers: [UserprofileService],
})
export class UserprofileModule {}
