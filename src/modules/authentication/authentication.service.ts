import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/user.schema';
import { UserType } from '../user/user.type';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthenticationService {

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async registerUser(userType: UserType): Promise<User> {

    const _user = new this.userModel(userType);
    return _user.save();
  
    /*
    const _user = this.userRepository.create(<User>{
      email: userType.email,
      password: userType.password,
      userRole: userType.userRole,
      isEmailVerified: userType.isEmailVerified,
      isActive: userType.isActive
    });
    
    return await this.userRepository.save(_user);
    */
    
  }

  loginUser(loginDto: LoginDto) {
    return `This action works for login authentication`;
  }

  async findAll() {
    return `This action returns all authentication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authentication`;
  }

  remove(id: number) {
    return `This action removes a #${id} authentication`;
  }
}
