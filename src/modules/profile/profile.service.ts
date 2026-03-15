import { Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileType } from './profile.type';
import { Profile } from './profile.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileMapper } from './profile.mapper';


@Injectable()
export class ProfileService {

  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<Profile>
  ) {}

  async createProfile(profileDto: CreateProfileDto): Promise<Profile> {
    // Convert dto to type
    const profileType: ProfileType = ProfileMapper.convertProfileDtoToType(profileDto);
    const _userProfile = await this.profileModel.create(profileType);

    return _userProfile;
  }

  async findAll(): Promise<Profile[]> {
    return await this.profileModel.find().populate('user').exec();
  }

  async findOne(profileId: string): Promise<Profile> {
    return await this.profileModel.findById( profileId ).populate('user').exec();
  }

  async update(profileId: string, profileUpdateDto: UpdateProfileDto) {
    const profileType: ProfileType = ProfileMapper.convertProfileDtoToType(profileUpdateDto);
    return await this.profileModel.findByIdAndUpdate(
      profileId,
      profileType,
      {
        new: true,
        runValidators: true
      }
    );
  }

  async remove(profileId: string) {
    return await this.profileModel.findByIdAndDelete(profileId);
  }
}
