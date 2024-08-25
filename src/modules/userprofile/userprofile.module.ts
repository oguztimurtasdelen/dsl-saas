import { Module } from '@nestjs/common';
import { UserprofileService } from './userprofile.service';
import { UserprofileController } from './userprofile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Userprofile } from './entities/userprofile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Userprofile])],
  controllers: [UserprofileController],
  providers: [UserprofileService],
  exports: [UserprofileService]
})
export class UserprofileModule {}
