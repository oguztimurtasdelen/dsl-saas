import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { UserType } from './user.type';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('profile').exec();
  }

  async findOne(id: string): Promise<User> {
    return this.userModel.findById(id).populate('profile').exec();
  }

  async update(id: string, userType: UserType): Promise<User> {
    return await this.userModel.findByIdAndUpdate(
      id,
      userType,
      {
        new: true,
        runValidators: true
      }
    );
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
