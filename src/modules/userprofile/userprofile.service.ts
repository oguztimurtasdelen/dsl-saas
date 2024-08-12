import { Injectable } from '@nestjs/common';
import { CreateUserprofileDto } from './dto/create-userprofile.dto';
import { UpdateUserprofileDto } from './dto/update-userprofile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UserProfile } from './userprofile.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserprofileService {
  constructor(@InjectModel(UserProfile.name) private userProfileModel: Model<UserProfile>){}

  createUserProfile(createUserprofileDto: CreateUserprofileDto, userId: string) {
   ///const newProfile = new this.userProfileModel(createUserprofileDto);
   //console.log("In userProfileService userId is " , userId, " createUserProfileDto  is" );
   //console.log(createUserprofileDto)
   return null;
  }

  findAll() {
    return `This action returns all userprofile`;
  }

  findOne(id: string) {
    return `This action returns a #${id} userprofile`;
  }

  update(id: string, updateUserprofileDto: UpdateUserprofileDto) {
    return `This action updates a #${id} userprofile`;
  }

  remove(id: string) {
    return `This action removes a #${id} userprofile`;
  }
}
