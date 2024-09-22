import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileType } from './profile.type';
import { Profile } from './profile.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';


@Injectable()
export class ProfileService {

  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<Profile>
  ) {}

  async createProfile(profileType: ProfileType): Promise<Profile> {    
    const _userProfile = await this.profileModel.create(<Profile>{
      user: profileType.user,
      userRole: profileType.userRole,
      name: profileType.name,
      surname: profileType.surname,
      birthDate: profileType.birthDate,
      avatar: profileType.avatar,
      isActive: profileType.isActive
    });

    return _userProfile;
  }

  async findAll(): Promise<Profile[]> {
    return await this.profileModel.find().populate('user').exec();
  }

  async findOne(profileId: string): Promise<Profile> {
    return await this.profileModel.findById(profileId).populate('user').exec();
  }

  async update(id: string, profileType: ProfileType) {
    return await this.profileModel.findByIdAndUpdate(
      id,
      profileType,
      {
        new: true,
        runValidators: true
      }
    );
  }

  async remove(id: string) {
    return await this.profileModel.findByIdAndDelete(id);
  }
}
