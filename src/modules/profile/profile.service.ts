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

  async createProfile(userProfileType: ProfileType): Promise<Profile> {    
    const _userProfile = await this.profileModel.create(<Profile>{
      userId: userProfileType.userId,
      name: userProfileType.name,
      surname: userProfileType.surname,
      userRole: userProfileType.userRole
    });

    return _userProfile;
  }

  async findAll(): Promise<Profile[]> {
    return await this.profileModel.find().exec();
  }

  async findOne(userId: string): Promise<Profile> {
    return await this.profileModel.findOne({userId: new Types.ObjectId(userId)}).exec();
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    return `This action updates a #${id} profile`;
  }

  remove(id: string) {
    return `This action removes a #${id} profile`;
  }
}
