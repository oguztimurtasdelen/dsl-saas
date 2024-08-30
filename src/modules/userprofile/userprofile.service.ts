import { Injectable } from '@nestjs/common';
import { UpdateUserProfileDto } from './dto/update-userprofile.dto';
import { UserProfileType } from './userprofile.type';
import { UserProfile } from './userprofile.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


@Injectable()
export class UserprofileService {

  constructor(
    @InjectModel(UserProfile.name)
    private readonly userProfileModel: Model<UserProfile>
  ) {}

  async createUserProfile(userProfileType: UserProfileType): Promise<UserProfile> {
    const _userProfile = new this.userProfileModel(userProfileType);
    return _userProfile.save();
    /*
    const _userProfile = this.userProfileRepository.create(<Userprofile>{
      userId: userProfileType.userId,
      name: userProfileType.name,
      surname: userProfileType.surname
    });
    
    
    return await this.userProfileRepository.save(_userProfile);
    */
  }

  findAll() {
    return `This action returns all userprofile`;
  }

  findOne(id: string) {
    return `This action returns a #${id} userprofile`;
  }

  update(id: string, updateUserprofileDto: UpdateUserProfileDto) {
    return `This action updates a #${id} userprofile`;
  }

  remove(id: string) {
    return `This action removes a #${id} userprofile`;
  }
}
