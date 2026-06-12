import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileType } from './profile.type';
import { Profile } from './profile.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileMapper } from './profile.mapper';
import { GetProfilesQueryDto } from './dto/get-profiles-query.dto';
import { GetProfilesQueryReturnDto } from './dto/get-profiles-query-return.dto';
import { MongoServerError } from 'mongodb';
import { ProfileNotFoundException } from './exceptions/profile-not-found.exception';
import { ProfileNicknameTakenException } from './exceptions/profile-nickname-taken.exception';


@Injectable()
export class ProfileService {

  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<Profile>
  ) {}

  async findAll(query: GetProfilesQueryDto, profileId: string): Promise<GetProfilesQueryReturnDto> {
    const _profile: Profile = await this.findOne(profileId);
    const skip = (query.page - 1) * query.limit;
    const [profiles, total]: [Profile[], number] = await Promise.all([
      this.profileModel
        .find({ user: _profile.user })
        .sort({ createdAt: -1 }) // Sort by creation date (newest first)
        .skip(skip)
        .limit(query.limit)
        .exec(),

      this.profileModel.countDocuments().exec()
    ]);

    return<GetProfilesQueryReturnDto>{
      profiles: profiles,
      pagination: {
        page: query.page,
        limit: query.limit,
        total: total,
        totalPages: Math.ceil(total / query.limit)
      }
    };
  }


  async findOne(profileId: string): Promise<Profile> {
    const profile: Profile = await this.profileModel.findById(profileId).exec();

    if (!profile) {
      throw new ProfileNotFoundException();
    }

    return profile;
  }

  
  async findOneByUserId(userId: Types.ObjectId): Promise<Profile> {
    const profile: Profile = await this.profileModel.findOne({ user: userId }).exec();

    if (!profile) {
      throw new ProfileNotFoundException();
    }

    return profile;

  }

  async createProfile(profileDto: CreateProfileDto): Promise<Profile> {
    try {
      // Convert dto to type
      const profileType: ProfileType = ProfileMapper.convertProfileDtoToType(profileDto);
      const _profile: Profile = await this.profileModel.create(profileType);
      return _profile;
    } catch (error) {
      if (error instanceof MongoServerError && error.code === 11000) {
        throw new ProfileNicknameTakenException();
      }

      throw error;
    }
    
  }


  async update(profileId: string, profileUpdateDto: UpdateProfileDto): Promise<Profile> {
    try {
      const profileType: ProfileType = ProfileMapper.convertProfileDtoToType(profileUpdateDto);
      const profile: Profile = await this.profileModel.findByIdAndUpdate(
        profileId,
        profileType,
        {
          new: true,
          runValidators: true
        }
      );

      if (!profile) {
        throw new ProfileNotFoundException();
      }

      return profile;
    } catch (error) {
      if (error instanceof MongoServerError && error.code === 11000) {
        throw new ProfileNicknameTakenException();
      }

      throw error;
    }
  }

  async remove(profileId: string): Promise<Profile> {
    const profile: Profile = await this.profileModel.findByIdAndDelete(profileId);

    if (!profile) {
      throw new ProfileNotFoundException();
    }

    return profile;
  }

  async removeByUserId(userId: string): Promise<Profile> {
    const profile: Profile = await this.profileModel.findOneAndDelete({ user: new Types.ObjectId(userId) });
    
    if (!profile) {
      throw new ProfileNotFoundException();
    }

    return profile;
  }
}
