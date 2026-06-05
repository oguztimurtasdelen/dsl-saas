import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from './user.schema';
import { UserType } from './user.type';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersQueryReturnDto } from './dto/get-users-query-return.dto';
import { UserMapper } from './user.mapper';
import { GetUsersQueryDto } from './dto/get-users-query.dto';


@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async findAll(query: GetUsersQueryDto): Promise<GetUsersQueryReturnDto | HttpException> {
    try {
      const skip = (query.page - 1) * query.limit;
      const [users, total] = await Promise.all([
        this.userModel
          .find() // Filter active users
          .select('-password') // Exclude password field
          .sort({ createdAt: -1 }) // Sort by creation date (newest first)
          .skip(skip)
          .limit(query.limit)
          .populate('profile')
          .exec(),
          
          this.userModel.countDocuments().exec()
      ]);

      return<GetUsersQueryReturnDto>{
        users: users,
        pagination: {
          page: query.page,
          limit: query.limit,
          total: total,
          totalPages: Math.ceil(total / query.limit)
        }
      };

    } catch (error) {
      throw new HttpException(
        { success: false, message: 'Failed to retrieve users' },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    //return await this.userModel.find().populate('profile').exec(); // Virtual Populate

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

  async findOne(userId: string): Promise<User | null> {
    return await this.userModel.findById(userId).populate('profile').exec();
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }

  async create(userType: UserType): Promise<User> {
    const createdUser = new this.userModel(userType);
    return await createdUser.save();
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
