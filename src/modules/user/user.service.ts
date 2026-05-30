import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './user.schema';
import { UserType } from './user.type';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('profile').exec(); // Virtual Populate

    // Aggregate Populate
    /*
    return this.userModel.aggregate([
      {
        $lookup: {
          from: 'profiles',
          localField: '_id',
          foreignField: 'user',
          as: 'profiles'
        }
      }
    ]);
    */

  }

  async findOne(userId: string): Promise<User | String> {
    return this.userModel.findById(userId).populate('profile').exec();
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const userType: UserType = UserMapper.convertUserDtoToType(updateUserDto);
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
