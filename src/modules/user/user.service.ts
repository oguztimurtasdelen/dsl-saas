import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './user.schema';
import { UserType } from './user.type';
import { ProfileService } from '../profile/profile.service';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('profile').exec();
  }

  async findOne(userId: string): Promise<User | String> {
    //return new Types.ObjectId(id).toString(); 
    return this.userModel.findById(userId).populate('profile').exec();
  }

  async update(userId: string, userType: UserType): Promise<User> {
    return await this.userModel.findByIdAndUpdate(
      userId,
      userType,
      {
        new: true,
        runValidators: true
      }
    );
  }

  async remove(userId: string) {
    return await this.userModel.findByIdAndDelete(userId);
  }
}
