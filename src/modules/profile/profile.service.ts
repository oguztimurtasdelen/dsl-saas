import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

    // Check if nickname already exists
    const existingProfile = await this.profileModel.findOne({ nickname: profileType.nickname }).exec();
    if (existingProfile) {
      throw new HttpException(
        { success: false, message: 'Nickname already exists!' },
        HttpStatus.BAD_REQUEST,
      );
    }

    // If nickname does not exist, create a new profile
    const _profile = await this.profileModel.create(profileType);
    return _profile;
  }

  async findAll(): Promise<Profile[]> {
    return await this.profileModel.find();
  }

  async findOne(profileId: string): Promise<Profile | null> {
    return await this.profileModel.findById( profileId );
  }

  findOneByUserId(userId: Types.ObjectId): Promise<Profile | null> {
    return this.profileModel
      .findOne({ user: userId });

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
