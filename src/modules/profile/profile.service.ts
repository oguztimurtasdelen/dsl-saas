import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileType } from './profile.type';
import { Profile } from './profile.schema';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ProfileMapper } from './profile.mapper';
import { GetProfilesQueryDto } from './dto/get-profiles-query.dto';
import { GetProfilesQueryReturnDto } from './dto/get-profiles-query-return.dto';
import { MongoServerError } from 'mongodb';
import { ProfileNotFoundException } from './exceptions/profile-not-found.exception';
import { ProfileNicknameTakenException } from './exceptions/profile-nickname-taken.exception';
import { ProfileRepository } from './profile.repository';


@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepository: ProfileRepository,
  ) {}

  async findAll(query: GetProfilesQueryDto): Promise<GetProfilesQueryReturnDto> {
    const filter: FilterQuery<Profile> = ProfileMapper.getProfileFilterQuery(query);
    const [profileList, totalProfileCount]: [Profile[], number] = await this.profileRepository.findAll(query, filter);

    return <GetProfilesQueryReturnDto>{
      profiles: profileList,
      pagination: query,
      total: totalProfileCount,
      totalPages: Math.ceil(totalProfileCount / query.limit),
    };
  }


  async findOne(id: string): Promise<Profile> {
    const _profile: Profile = await this.profileRepository.findOne(id);

    if (!_profile) {
      throw new ProfileNotFoundException();
    }

    return _profile;
  }

  
  async findOneByUserId(userId: Types.ObjectId | string): Promise<Profile> {
    const _profile: Profile = await this.profileRepository.findOneByUserId(userId);

    if (!_profile) {
      throw new ProfileNotFoundException();
    }

    return _profile;

  }

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    try {
      const profileType: ProfileType = ProfileMapper.convertProfileDtoToType(createProfileDto);
      const _profile: Profile = await this.profileRepository.create(profileType);
      return _profile;
    } catch (error) {
      if (error instanceof MongoServerError && error.code === 11000) {
        throw new ProfileNicknameTakenException();
      }
      throw error;
    }
    
  }


  async update(id: string, updateProfileUpdateDto: UpdateProfileDto): Promise<Profile> {
    try {
      const profileType: ProfileType = ProfileMapper.convertProfileDtoToType(updateProfileUpdateDto);
      const _profile: Profile = await this.profileRepository.update(id, profileType);

      if (!_profile) {
        throw new ProfileNotFoundException();
      }

      return _profile;
    } catch (error) {
      if (error instanceof MongoServerError && error.code === 11000) {
        throw new ProfileNicknameTakenException();
      }

      throw error;
    }
  }

  async remove(id: string): Promise<Profile> {
    const _profile: Profile = await this.profileRepository.remove(id);

    if (!_profile) {
      throw new ProfileNotFoundException();
    }

    return _profile;
  }

  async removeByUserId(userId: string): Promise<Profile> {
    const _profile: Profile = await this.profileRepository.removeByUserId(userId);
    
    if (!_profile) {
      throw new ProfileNotFoundException();
    }

    return _profile;
  }
}
