import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileType } from './profile.type';
import { Profile } from './profile.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileMapper } from './profile.mapper';
import { GetProfilesQueryDto } from './dto/get-profiles-query.dto';
import { GetProfilesQueryReturnDto } from './dto/get-profiles-query-return.dto';


@Injectable()
export class ProfileService {

  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<Profile>
  ) {}

  async createProfile(profileDto: CreateProfileDto): Promise<Profile | HttpException> {
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
    const _profile: Profile = await this.profileModel.create(profileType);
    return _profile;
  }

  async findAll(query: GetProfilesQueryDto): Promise<GetProfilesQueryReturnDto | HttpException> {
    try {
      const skip = (query.page - 1) * query.limit;
      const [profiles, total] = await Promise.all([
        this.profileModel
          .find()
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

    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Failed to retrieve profiles' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(profileId: string): Promise<Profile | null | HttpException> {
    //return await this.profileModel.findById( profileId );
    const profile = await this.profileModel.findById(profileId).exec();
    if (!profile) {
      throw new HttpException(
        { success: false, message: 'Profile not found!' },
        HttpStatus.NOT_FOUND,
      );
    }
    return profile;
  }

  findOneByUserId(userId: Types.ObjectId): Promise<Profile> {
    const profile = this.profileModel.findOne({ user: userId }).exec();
    return profile;

  }

  async update(profileId: string, profileUpdateDto: UpdateProfileDto): Promise<Profile | null> {
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

  async remove(profileId: string): Promise<Profile | null> {
    return await this.profileModel.findByIdAndDelete(profileId);
  }

  async removeByUserId(userId: string): Promise<Profile | null> {
    return await this.profileModel.findOneAndDelete({ user: new Types.ObjectId(userId) });
  }
}
